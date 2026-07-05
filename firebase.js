import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey:"AIzaSyDDiPJpV1V7s5xsSmrT-Isg_g3Lzehf-7I",
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

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const auth =
getAuth(app);

export { db, auth };


import { initializeApp }
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "student-safety-system-95f81.firebaseapp.com",
  projectId: "student-safety-system-95f81",
  storageBucket: "student-safety-system-95f81.appspot.com",
  messagingSenderId: "754374752811",
  appId: "1:754374752811:web:d0d01789013cd2b87e886e"
};

const app =
initializeApp(firebaseConfig);

export const db =
getFirestore(app);

export const auth =
getAuth(app);



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

export const auth = getAuth(app);
export const db = getFirestore(app);