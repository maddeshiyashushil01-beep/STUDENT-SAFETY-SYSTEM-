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

    if (role === "admin") {

      const snapshot = await getDocs(collection(db, "admins"));

      let isAdmin = false;

      snapshot.forEach((doc) => {

        if (doc.data().email === email) {
          isAdmin = true;
        }

      });

      if (isAdmin) {

        alert("Admin Login Successful");
        location.replace("admin.html");

      } else {

        await signOut(auth);
        alert("Access Denied! You are not an Admin.");
        location.replace("index.html");

      }

    } else {

      alert("Student Login Successful");
      location.replace("sos.html");

    }

  } catch (error) {

    console.error(error);
    errorMsg.innerText = error.message;

  }

});