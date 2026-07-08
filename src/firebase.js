// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Konfigurasi asli dari Firebase Console milikmu
const firebaseConfig = {
  apiKey: "AIzaSyAaiMsT-0rXARzlkroTGVKyf0vUD_zXsYI",
  authDomain: "website-terbai.firebaseapp.com",
  projectId: "website-terbai",
  storageBucket: "website-terbai.firebasestorage.app",
  messagingSenderId: "407143483453",
  appId: "1:407143483453:web:c3e8df6b7036a516498254",
  measurementId: "G-K6FTLN7RG4"
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export agar bisa dipakai di halaman upload/download
export { db, storage, storageRef, uploadBytesResumable, getDownloadURL, collection, addDoc, getDocs };
