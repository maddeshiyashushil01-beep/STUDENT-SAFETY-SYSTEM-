import { auth } from "./firebase.js";

import {

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="index.html";

}

});

const uploadBtn=document.getElementById("uploadBtn");

uploadBtn.addEventListener("click",()=>{

const file=document.getElementById("fileInput").files[0];

const category=document.getElementById("category").value;

if(!file){

alert("Please select a file.");

return;

}

alert(

"Selected File : "+file.name+

"\nCategory : "+category+

"\n\nFirebase upload will be added in the next step."

);

});