import {onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import * as admin from 'firebase-admin';
import OpenAI from 'openai';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import type { Request, Response } from 'express';
import airbnbTemplate from './templates/airbnb_instruction.json';
import genericTemplate from './templates/generic_instruction.json';

admin.initializeApp();
const db = getFirestore();
const openaiKey = defineSecret('OPENAI_KEY');

export interface Step{
  field: string;
  instruction: string;
}

export function buildPrompt(platform: 'airbnb'|'own', listing: string): string {
  const tpl = platform === 'airbnb' ? airbnbTemplate : genericTemplate;
  const base = tpl.basePrompt;
  const steps = tpl.steps as Step[];
  const stepsText = steps
    .map((s, idx) => `${idx + 1}. ${s.field.toUpperCase()}: ${s.instruction}`)
    .join('\n');
  return `
${base}

Structure instructions:
${stepsText}

User Listing:
${listing}

Respond only in JSON with fields ${steps.map(s => `"${s.field}"`).join(', ')}.
`.trim();
}
  
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
  async (req: Request, res: Response) => {
    const {platform, listing}= req.body as{platform: string; listing: string};
    if ((platform !== 'airbnb' && platform !== 'own') || !listing) {
      res.status(400).json({ error: 'Platform must be "airbnb" or "own website" and listing is required' });
      return;
    }

    const systemPrompt = buildPrompt(platform as 'airbnb' | 'own', listing);

    try {
      const apiKey= await openaiKey.value();
      const openai= new OpenAI({apiKey});
      const completion= await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{ role: 'system', content: systemPrompt }],
        temperature: 0.7,
      });

      const raw = completion.choices[0].message?.content?.trim() || '';
      let parsed: { title: string; description: string };
      try {
        parsed = JSON.parse(raw);
      } catch {
        console.error('OpenAI JSON parse error:', raw);
        res.status(500).json({ error: 'Bad response format' });
        return;
      }

      const docRef= await db.collection('copywrites').add({
        platform,
        listing,
        ...parsed,
        status:'pending',
        ts: FieldValue.serverTimestamp(),
      });

      res.status(200).json({
        id: docRef.id,
        title: parsed.title,
        description: parsed.description,
        status: 'pending',
      });
      return;

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Copywriting error:', message);
      res.status(500).json({ error: message });
      return;
    }
  }
);

export const acceptCopy= onRequest(
  {cors: true },
  async (req: Request, res: Response) => {
    const {id}= req.body as {id?:string};
    if(!id){
      res.status(400).json({error: 'Missing copy ID'});
      return;
    }
    try{
      await db.collection('copywrites').doc(id).update({
        status: 'accepted',
        acceptedAt: FieldValue.serverTimestamp(),
      });
      res.status(200).json({pk:true});
    }catch (e: unknown) {
      console.error('Accept error:', e);
      res.status(500).json({error: 'Failed to accept copy'});
    }
  }
);

export const requestReview= onRequest(
  {cors:true},
  async (req: Request, res: Response) => {
    const {id}= req.body as {id?:string};
    if(!id){
      res.status(400).json({error: 'Missing copy ID'});
      return;
    }
    try{
      await db.collection('copywrites').doc(id).update({
        status: 'review',
        reviewRequestedAt: FieldValue.serverTimestamp(),
      });
      // TODO: подставить реальный URL Stripe Checkout v budushjem
      res.status(200).json({pk:true});
    }catch (e: unknown) {
      console.error('Review request error:', e);
      res.status(500).json({error: 'Failed to request review'});
    }
  }
);