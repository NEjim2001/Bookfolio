// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAsEPWMRM8XMqsGnRA6hDB0QmmIDzY4g58',
  authDomain: 'bookfolio--auth.firebaseapp.com',
  projectId: 'bookfolio--auth',
  storageBucket: 'bookfolio--auth.appspot.com',
  messagingSenderId: '480012670174',
  appId: '1:480012670174:web:7d020c8cc4a017e81e5e4f',
  measurementId: 'G-7X0DRB8B9B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const bookNotesRef = collection(db, 'booknotes');

export default app;
