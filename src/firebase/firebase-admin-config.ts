import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
    credential: cert({
        projectId : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail : process.env.NEXT_PRIVATE_CLIENT_EMAIL,
        privateKey : process.env.NEXT_PRIVATE_FIREBASE_SECRET_KEY
    })
}

const adminApp = getApps.length < 0 ? initializeApp(firebaseAdminConfig,"admin") : getApp();

const adminAuth = getAuth(adminApp);
const adminFirestore = getFirestore(adminApp);

export {adminAuth,adminApp,adminFirestore}

