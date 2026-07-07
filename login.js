import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Successful");

    location.replace("sos.html");

  } catch (error) {
    console.log(error);
    errorMsg.innerText = error.code;
  }
});