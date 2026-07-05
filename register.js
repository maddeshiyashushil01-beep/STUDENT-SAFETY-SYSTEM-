import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const createBtn = document.getElementById("createAccountBtn");
const registerBox = document.getElementById("registerBox");
const registerBtn = document.getElementById("registerBtn");

createBtn.addEventListener("click", () => {
  registerBox.style.display = "block";
});

registerBtn.addEventListener("click", async () => {

  const email =
    document.getElementById("regEmail").value.trim();

  const password =
    document.getElementById("regPassword").value.trim();

  if (!email || !password) {
    alert("Enter Email and Password");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account Created Successfully!");

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
});