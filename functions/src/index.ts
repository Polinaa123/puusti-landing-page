import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
  
  const db = getFirestore();
  
  export const waitlist = onRequest(
    { cors: true },
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