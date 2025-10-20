import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9LVxK6xti8ebCTzH8fMozTT6IpxKWMzE",
  authDomain: "nuvia-f71fb.firebaseapp.com",
  projectId: "nuvia-f71fb",
  storageBucket: "nuvia-f71fb.firebasestorage.app",
  messagingSenderId: "503911741659",
  appId: "1:503911741659:web:cc6d856ee94ae6efa674fe",
  measurementId: "G-E8NC99Q72Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithEmail = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);
export const resetPassword = (email: string) => 
  sendPasswordResetEmail(auth, email);
export const updateUserProfile = (displayName: string, photoURL?: string) => 
  updateProfile(auth.currentUser!, { displayName, photoURL });
export const logOut = () => signOut(auth);
