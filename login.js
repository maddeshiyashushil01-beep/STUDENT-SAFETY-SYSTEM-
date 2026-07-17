import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  errorMsg.innerText = "";

  try {

    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    if (role === "admin") {

      if (email === "admin@gmail.com") {

        alert("Welcome Admin");
        location.replace("admin.html");

      } else {

        alert("You are not an Admin.");
        await auth.signOut();

      }

    } else {

      alert("Welcome Student");
      location.replace("sos.html");

    }

  } catch (error) {

    switch (error.code) {

      case "auth/invalid-credential":
        errorMsg.innerText = "Invalid Email or Password";
        break;

      case "auth/user-not-found":
        errorMsg.innerText = "User Not Found";
        break;

      case "auth/wrong-password":
        errorMsg.innerText = "Wrong Password";
        break;

      case "auth/invalid-email":
        errorMsg.innerText = "Invalid Email";
        break;

      default:
        errorMsg.innerText = error.message;

    }

    console.log(error);

  }

});