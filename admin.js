import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




onAuthStateChanged(auth, async (user) => {

  if (!user) {
    location.replace("index.html");
    return;
  }

  const snapshot = await getDocs(collection(db, "admins"));

  let isAdmin = false;

  snapshot.forEach((doc) => {
    if (doc.data().email === user.email) {
      isAdmin = true;
    }
  });

  if (!isAdmin) {
    alert("Access Denied");
    location.replace("sos.html");
  }

});


async function loadDashboard() {
  try {
    const students = await getDocs(collection(db, "students"));
    document.getElementById("studentCount").innerText = students.size;

    const classes = await getDocs(collection(db, "classes"));
    document.getElementById("classCount").innerText = classes.size;

    const events = await getDocs(collection(db, "events"));
    document.getElementById("eventCount").innerText = events.size;

    const notices = await getDocs(collection(db, "notices"));
    document.getElementById("noticeCount").innerText = notices.size;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
window.location.href = "index.html";
}

loadDashboard();