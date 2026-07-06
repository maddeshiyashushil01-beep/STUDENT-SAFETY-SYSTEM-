import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();


const loginForm =
document.getElementById("loginForm");

const errorMsg =
document.getElementById("errorMsg");

loginForm.addEventListener(
"submit",
async (e) => {

  e.preventDefault();

  const email =
  document.getElementById("username").value;

  const password =
  document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.location.href = "sos.html";

  } catch (error) {

    errorMsg.innerText =
    "❌ Invalid Email or Password";
  }
});