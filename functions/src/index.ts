import {onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import * as admin from 'firebase-admin';
import OpenAI from 'openai';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
const db = getFirestore();

const openaiKey = defineSecret('OPENAI_KEY');
  
export const waitlist = onRequest(
  {cors: true},
  async (req, res) => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
      return;
    }
  
    const { name, email } = req.body as { name?: string; email?: string };
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email required' });
      return;
    }
  
    try {
      await db.collection('waitlist').add({
        name,
        email,
        createdAt: FieldValue.serverTimestamp(),
      });
      res.status(200).json({ success: true });
    } catch (e) {
      console.error('Firestore error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export const helloOpenAI= onRequest(
  {cors: true, secrets: [openaiKey]},
  async(_req,res) =>{
    try{
      const apiKey= await openaiKey.value();
      const openai = new OpenAI({ apiKey });

      const completion=await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly assistant' },
          { role: 'user', content: 'Say hello in a funny way, please!' }
        ],
      });
      const reply =completion.choices[0].message.content?.trim() || 'No response';
      res.status(200).json({ reply });
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if(error instanceof Error) errorMessage= error.message;
      console.error('OpenAI error:', error);
      res.status(500).json({ error: errorMessage });
    }
  }
);

export const copywrite=onRequest(
  {cors:true, secrets: [openaiKey]},
  async (req, res) => {
    const {platform, listing, services}= req.body as{
      platform: string;
      listing: string;
      services: Array<'description'|'title'>;
    };
    if(!platform || !listing || !services?.length){
        res.status(400).json({ error: 'Platform, listing, and services are required' });
        return;
    }

    const tplDoc= await db
      .collection('promptTemplates')
      .doc(`${platform}_A`)
      .get();

    if (!tplDoc.exists) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    const tplData= tplDoc.data();
    if(!tplData || typeof tplData.prompt !== 'string'){
      res.status(500).json({ error: 'Invalid template data' });
      return;
    }
    const basePrompt= tplData.prompt;

    const promptText = basePrompt.replace(
      '${listing}',
      listing
    );

    try {
      const apiKey= await openaiKey.value();
      const openai= new OpenAI({apiKey});
      const completion= await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
          { role: 'system', content: promptText }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      const choice= completion.choices[0];
      if (!choice.message?.content) {
        console.error('OpenAI returned no message content', completion);
        res.status(500).json({ error: 'No content from OpenAI' });
        return;
      }
      const raw = completion.choices[0].message.content?.trim() || '';
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        console.error('OpenAI JSON parse error:', raw);
        res.status(500).json({ error: 'Bad response format' });
        return;
      }

      await db.collection('copywrites').add({
        platform,
        listing,
        services,
        ...parsed,
        ts: FieldValue.serverTimestamp(),
      });

      res.json({success: true, ...parsed});
    } catch (error: unknown) {
      const msg= error instanceof Error ? error.message : 'Unknown error';
      console.error('Copywriting error:', msg);
      res.status(500).json({success: false, error: msg});
    }
    return;
  }
);
async function seedTemplates() {
  const templates: Record<string,string> = {
    // Полный Airbnb-шаблон
    airbnb_A: `
You are an expert Airbnb copywriter with years of experience crafting listings that consistently rank on the first page and convert lookers into bookers. 

Given the user’s raw listing input below, produce:
1. A punchy, emotionally engaging Title (max 50 characters) that highlights the property’s single most compelling feature.
2. A vivid Description (120–200 words) structured as:
   • Hook: sensory or emotional appeal
   • Highlights: 3–4 short points describing location and décor
   • Call-to-Action: friendly invitation to book

User Listing Input:
\`\`\`
\${listing}
\`\`\`

Respond in JSON:
\`\`\`json
{
  "title": "...optimized title...",
  "description": "...engaging description..."
}
\`\`\`
`.trim(),

    booking_A: `
You are a top-tier Booking.com copywriter specializing in clear, professional descriptions that rank highly and drive bookings. 

Given the user’s raw listing data below, generate:
1. A crisp, SEO-friendly Headline (max 60 characters) with one keyword (e.g., city name).
2. A structured Description (150–250 words) with:
   • Overview: style & location (1–2 sentences)
   • Room Details: 2–3 bullet points (room types, beds)
   • Nearby Attractions: 2 short sentences
   • Guest Promise: what makes this place special

User Listing Input:
\`\`\`
\${listing}
\`\`\`

Return in JSON:
\`\`\`json
{
  "headline": "...optimized headline...",
  "description": "...full description..."
}
\`\`\`
`.trim(),

    own_A: `
You are an expert real estate copywriter. 

Given the user’s raw listing below, write a JSON with:
1. "title": an SEO-optimized headline (≤60 chars)
2. "description": a 150–200 word engaging description.

User Listing Input:
\`\`\`
\${listing}
\`\`\`

Respond in JSON:
\`\`\`json
{
  "title": "...",
  "description": "..."
}
\`\`\`
`.trim(),
  };

  for (const [id, prompt] of Object.entries(templates)) {
    await db.collection('promptTemplates').doc(id).set({ prompt });
    console.log(`Seeded ${id}`);
  }
}
seedTemplates().catch(console.error);