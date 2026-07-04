import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("registerBtn")
.addEventListener("click", async () => {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const mobile =
    document.getElementById("mobile").value;

    try {

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await setDoc(
            doc(db, "students", userCredential.user.uid),
            {
                name,
                email,
                mobile,
                createdAt: new Date()
            }
        );

        alert("Registration Successful");

        window.location.href =
        "index.html";

    } catch (error) {

        alert(error.message);
    }

});