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
      services: Array<'description'|'title'|'amenities'>;
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

    const tasks: string[]=[];
    if(services.includes('description')) tasks.push('Write a description (≤ 200 words)');
    if(services.includes('title')) tasks.push('Write a title (≤ 8 words)');
    if (services.includes('amenities')) tasks.push('List 5 key amenities');

      const userPrompt=`
${basePrompt}
User Listing Text:
${listing}
Tasks:
${tasks.join('\n')}
      `.trim();
    try {
      const apiKey= await openaiKey.value();
      const openai= new OpenAI({apiKey});
      const completion= await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
          {role: 'system', content: 'You are a real estate copywriting assistant'},
          {role: 'user', content: userPrompt}
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
      const result = choice.message.content.trim();

      await db.collection('copywrites').add({
        platform,
        listing,
        services,
        result,
        ts: FieldValue.serverTimestamp(),
      });

      res.json({success: true, result});
    } catch (error: unknown) {
      const msg= error instanceof Error ? error.message : 'Unknown error';
      console.error('Copywriting error:', msg);
      res.status(500).json({success: false, error: msg});
    }
    return;
  }
);
async function seedTemplates() {
  const templates = {
    airbnb_A: "You are an expert Airbnb copywriter. Rewrite…",
    booking_A:  "You are an expert Booking copywriter. Rewrite…",
    own_A:      "You are an expert real estate copywriter. Rewrite…",
  };
  for (const [id, prompt] of Object.entries(templates)) {
    await db.collection('promptTemplates').doc(id).set({ prompt });
    console.log(`Seeded ${id}`);
  }
}
seedTemplates().catch(console.error);

