import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Check Admin Access
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.replace("index.html");
    return;
  }

  try {

    const snapshot = await getDocs(collection(db, "admins"));

let isAdmin = false;

snapshot.forEach((adminDoc) => {

    const admin = adminDoc.data();

    console.log("Firestore admin:", admin.email);
    console.log("Logged in user:", user.email);

    if (
        admin.email &&
        admin.email.trim().toLowerCase() ===
        user.email.trim().toLowerCase()
    ) {
        isAdmin = true;
    }

});
    if (!isAdmin) {
      alert("Access Denied! You are not an Admin.");
      await signOut(auth);
      window.location.replace("index.html");
      return;
    }

    // Load Dashboard after successful admin verification
    loadDashboard();

  } catch (error) {
    console.error(error);
    alert(error.message);
  }

});


// Dashboard Data
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

}