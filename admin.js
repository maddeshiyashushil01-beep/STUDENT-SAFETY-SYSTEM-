import { auth, db } from "./firebase.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================
// Dashboard Count
// ======================

async function loadDashboard(){

const students = await getDocs(collection(db,"students"));
document.getElementById("studentCount").innerText = students.size;

const classes = await getDocs(collection(db,"classes"));
document.getElementById("classCount").innerText = classes.size;

const events = await getDocs(collection(db,"events"));
document.getElementById("eventCount").innerText = events.size;

const notices = await getDocs(collection(db,"notices"));
document.getElementById("noticeCount").innerText = notices.size;

}

loadDashboard();


// ======================
// Add Today's Class
// ======================

async function addClass(){

const subject=document.getElementById("classTitle").value.trim();

const teacher=document.getElementById("teacherName").value.trim();

const time=document.getElementById("classTime").value;

if(subject==""||teacher==""||time==""){

alert("Fill all fields");
return;

}

await addDoc(collection(db,"classes"),{

subject,
teacher,
time,
createdAt:new Date()

});

alert("Class Published");

document.getElementById("classTitle").value="";
document.getElementById("teacherName").value="";
document.getElementById("classTime").value="";

loadDashboard();

}

window.addClass=addClass;


// ======================
// Publish Notice
// ======================

async function publishNotice(){

const notice=document.getElementById("noticeText").value.trim();

if(notice==""){

alert("Write Notice");
return;

}

await addDoc(collection(db,"notices"),{

notice,
createdAt:new Date()

});

alert("Notice Published");

document.getElementById("noticeText").value="";

loadDashboard();

}

window.publishNotice=publishNotice;


// ======================
// Add Event
// ======================

async function addEvent(){

const title=document.getElementById("eventTitle").value.trim();

const date=document.getElementById("eventDate").value;

if(title==""||date==""){

alert("Fill all fields");
return;

}

await addDoc(collection(db,"events"),{

title,
date,
createdAt:new Date()

});

alert("Event Added");

document.getElementById("eventTitle").value="";
document.getElementById("eventDate").value="";

loadDashboard();

}

window.addEvent=addEvent;


// ======================
// Load SOS Alerts
// ======================

async function loadSOS(){

const q=query(
collection(db,"sos_alerts"),
orderBy("createdAt","desc"),
limit(10)
);

const snapshot=await getDocs(q);

const list=document.getElementById("sosList");

list.innerHTML="";

snapshot.forEach(doc=>{

const data=doc.data();

list.innerHTML+=`

<div style="padding:10px;border-bottom:1px solid #ddd">

<h4>🚨 ${data.emergency}</h4>

<p>${data.phone}</p>

<p>${data.createdAt?.toDate().toLocaleString()}</p>

</div>

`;

});

}

loadSOS();


// ======================
// Load Complaints
// ======================

async function loadComplaints(){

const q=query(
collection(db,"complaints"),
orderBy("createdAt","desc"),
limit(10)
);

const snapshot=await getDocs(q);

const list=document.getElementById("complaintList");

list.innerHTML="";

snapshot.forEach(doc=>{

const data=doc.data();

list.innerHTML+=`

<div style="padding:10px;border-bottom:1px solid #ddd">

<p>${data.complaint}</p>

<small>${data.createdAt?.toDate().toLocaleString()}</small>

</div>

`;

});

}

loadComplaints();


// ======================
// Logout
// ======================

async function logout(){

await signOut(auth);

window.location.href="index.html";

}

window.logout=logout;