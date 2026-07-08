import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===========================
// CHECK LOGIN
// ===========================
onAuthStateChanged(auth, (user) => {

  if (user) {
    console.log("Logged in:", user.email);
  } else {
    alert("Please login first");
    location.replace("index.html");
  }

});


// ===========================
// SAVE CONTACT
// ===========================
async function saveContact() {

  const name = document.getElementById("contactName").value.trim();
  const number = document.getElementById("contactNumber").value.trim();

  if (!name || !number) {
    alert("Enter Name and Phone Number");
    return;
  }

  try {

    await addDoc(collection(db, "contacts"), {
      name,
      number,
      createdAt: new Date()
    });

    localStorage.setItem("parentName", name);
    localStorage.setItem("parentNumber", number);

    alert("✅ Contact Saved");

  } catch (error) {

    console.log(error);
    alert(error.message);

  }

}

window.saveContact = saveContact;


// ===========================
// SUBMIT COMPLAINT
// ===========================
async function submitComplaint() {

  const complaint =
  document.getElementById("complaint").value.trim();

  if (!complaint) {
    alert("Write complaint first");
    return;
  }

  try {

    await addDoc(collection(db, "complaints"), {
      complaint,
      createdAt: new Date()
    });

    alert("✅ Complaint Submitted");

  } catch (error) {

    console.log(error);
    alert(error.message);

  }

}

window.submitComplaint = submitComplaint;


// ===========================
// LOCATION
// ===========================
function getLocation() {

  if (!navigator.geolocation) {

    alert("Geolocation not supported");
    return;

  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById("location").innerHTML =
      `📍 Latitude : ${lat}<br>Longitude : ${lon}`;

    },

    () => {

      alert("Location Permission Denied");

    }

  );

}

window.getLocation = getLocation;


// ===========================
// SOS BUTTON
// ===========================
document.addEventListener("DOMContentLoaded", () => {

  const sosBtn = document.getElementById("sosBtn");

  sosBtn.addEventListener("click", () => {

    const phone = localStorage.getItem("parentNumber");

    if (!phone) {

      alert("Please Save Emergency Contact First");
      return;

    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const emergency =
        document.querySelector(
        'input[name="emergencyType"]:checked').value;

        try {

          await addDoc(collection(db, "sos_alerts"), {

            emergency,
            phone,
            latitude: lat,
            longitude: lon,
            createdAt: new Date()

          });

          const message =
          `🚨 SOS ALERT!\nLocation:\nhttps://maps.google.com/?q=${lat},${lon}`;

          window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
          );

          alert("✅ SOS Sent");

        } catch (error) {

          console.log(error);
          alert(error.message);

        }

      },

      () => {

        alert("Location Permission Denied");

      }

    );

  });

});


// ===========================
// LOGOUT
// ===========================
async function logout() {

  await signOut(auth);

  localStorage.clear();

  location.replace("index.html");

}

window.logout = logout;