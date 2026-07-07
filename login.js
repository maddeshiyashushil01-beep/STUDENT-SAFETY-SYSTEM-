import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful!");

        window.location.href = "sos.html";

    } catch (error) {
        errorMsg.innerText = error.message;
    }
});