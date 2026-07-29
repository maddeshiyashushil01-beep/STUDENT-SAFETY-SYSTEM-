import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");
const photo = document.getElementById("photo");
const preview = document.getElementById("profilePreview");

let currentUser = null;

// Photo Preview
photo.addEventListener("change", () => {

  const file = photo.files[0];

  if (file) {

    const reader = new FileReader();

    reader.onload = function(e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);

  }

});

// Check Login
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  currentUser = user;

  loadProfile();

});

// Load Profile
async function loadProfile() {

  const ref = doc(db, "profiles", currentUser.uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("name").value = data.name || "";
  document.getElementById("enrollment").value = data.enrollment || "";
  document.getElementById("college").value = data.college || "";
  document.getElementById("branch").value = data.branch || "";
  document.getElementById("semester").value = data.semester || "";
  document.getElementById("hostel").value = data.hostel || "";
  document.getElementById("room").value = data.room || "";
  document.getElementById("mobile").value = data.mobile || "";
  document.getElementById("father").value = data.father || "";
  document.getElementById("mother").value = data.mother || "";
  document.getElementById("parentMobile").value = data.parentMobile || "";
  document.getElementById("blood").value = data.blood || "";
  document.getElementById("emergency").value = data.emergency || "";

  if (data.photo) {
    preview.src = data.photo;
  }

}

// Save Profile
saveBtn.addEventListener("click", async () => {

  try {

    await setDoc(doc(db, "profiles", currentUser.uid), {

      name: document.getElementById("name").value,
      enrollment: document.getElementById("enrollment").value,
      college: document.getElementById("college").value,
      branch: document.getElementById("branch").value,
      semester: document.getElementById("semester").value,
      hostel: document.getElementById("hostel").value,
      room: document.getElementById("room").value,
      mobile: document.getElementById("mobile").value,
      father: document.getElementById("father").value,
      mother: document.getElementById("mother").value,
      parentMobile: document.getElementById("parentMobile").value,
      blood: document.getElementById("blood").value,
      emergency: document.getElementById("emergency").value,
      photo: preview.src,
      email: currentUser.email

    });

    alert("✅ Profile Saved Successfully");

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

});