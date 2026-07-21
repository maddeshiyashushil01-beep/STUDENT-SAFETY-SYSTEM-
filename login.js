import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").trim();
  const role = document.getElementById("role").value;

  try {

    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    if(role === "admin"){

      const snapshot = await getDocs(collection(db,"admins"));

      let isAdmin = false;

      snapshot.forEach(doc=>{
        if(doc.data().email === email){
          isAdmin = true;
        }
      });

      if(isAdmin){
        location.replace("admin.html");
      }else{
        alert("Access Denied");
      }

    }else{

      location.replace("sos.html");

    }

  } catch(error){

    console.log(error);

    errorMsg.innerText = error.message;

  }

});