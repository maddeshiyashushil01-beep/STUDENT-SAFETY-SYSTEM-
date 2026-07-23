import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.innerText = "";

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);

    if (role === "student") {
      window.location.href = "sos.html";
      return;
    }

    if (role === "admin") {
      const snapshot = await getDocs(collection(db, "admins"));

      let isAdmin = false;
snapshot.forEach((doc) => {
    const data = doc.data();

    console.log("Firestore Email:", data.email);
    console.log("Login Email:", email);

    if (
        data.email &&
        data.email.toLowerCase() === email.toLowerCase()
    ) {
        isAdmin = true;
    }
});

      if (isAdmin) {
        window.location.href = "admin.html";
      } else {
        await signOut(auth);
        errorMsg.innerText = "Access Denied! You are not an Admin.";
      }
    }
  } catch (error) {
    console.error(error);
    errorMsg.innerText = error.message;
  }
});