import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTOynwq_1HpqjPhk88ZPpfus3q8uhuhA4",
  authDomain: "newpj-59c47.firebaseapp.com",
  databaseURL: "https://newpj-59c47-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "newpj-59c47",
  storageBucket: "newpj-59c47.firebasestorage.app",
  messagingSenderId: "812312364202",
  appId: "1:812312364202:web:ab0088fac20057b433bcd3",
  measurementId: "G-TLLNLJL323"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error logging in", error);
  }
};

export const logout = () => signOut(auth);
