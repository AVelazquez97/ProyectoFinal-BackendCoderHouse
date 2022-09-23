import admin from 'firebase-admin';
import { FIREBASE_CONNECTION } from '../config/index.js';

let instanceFirebase = null;

class FirebaseConnection {
  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_CONNECTION),
    });
    this.#msgConnect();
  }

  connectDB = () => {
    const db = this.admin.firestore();
    return db;
  };

  #msgConnect = () => {
    console.log(`[Firebase(Firestore)] - Conectada`);
    return false;
  };

  static getFirebaseConnectionInstance = () => {
    if (!instanceFirebase) {
      instanceFirebase = new FirebaseConnection();
    }
    return instanceFirebase;
  };
}

export default FirebaseConnection;
