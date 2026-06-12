import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDiPJpV1V7s5xsSmrT-Isg_g3Lzehf-7I",
  authDomain: "student-safety-system-95f81.firebaseapp.com",
  projectId: "student-safety-system-95f81",
  storageBucket: "student-safety-system-95f81.firebasestorage.app",
  messagingSenderId: "754374752811",
  appId: "1:754374752811:web:d0d01789013cd2b87e886e",
  measurementId: "G-C3HJE5K5DN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };