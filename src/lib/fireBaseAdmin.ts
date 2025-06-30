import admin from 'firebase-admin';
import serviceAccount from '../../functions/serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}
export const firestore = admin.firestore();