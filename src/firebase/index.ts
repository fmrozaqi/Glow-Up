import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCMuWG-cZsG6H0r3U9CAwJ6HX3aQsf176U",
  authDomain: "glow-up-ed322.firebaseapp.com",
  projectId: "glow-up-ed322",
  storageBucket: "glow-up-ed322.appspot.com",
  messagingSenderId: "944942377188",
  appId: "1:944942377188:web:85b701cf9fbd87d64724f1",
  measurementId: "G-Y4VQMJLX0C"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)