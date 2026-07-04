import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form =
document.getElementById("loginForm");

const error =
document.getElementById("errorMsg");

form.addEventListener(
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

        window.location.href =
        "sos.html";

    }
    catch(err) {

        error.innerText =
        "Invalid Email or Password";
    }

});