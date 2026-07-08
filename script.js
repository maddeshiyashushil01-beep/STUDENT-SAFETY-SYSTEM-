import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================
// CHECK LOGIN
// =========================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// =========================
// SAVE CONTACT
// =========================
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

// =========================
// COMPLAINT
// =========================
async function submitComplaint() {

  const complaint = document.getElementById("complaint").value.trim();

  if (!complaint) {
    alert("Write Complaint");
    return;
  }

  try {

    await addDoc(collection(db, "complaints"), {
      complaint,
      createdAt: new Date()
    });

    alert("✅ Complaint Submitted");

    document.getElementById("complaint").value = "";

  } catch (error) {
    console.log(error);
    alert(error.message);
  }

}

window.submitComplaint = submitComplaint;

// =========================
// SHARE LOCATION
// =========================
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
        `📍 Latitude: ${lat}<br>Longitude: ${lon}`;

    },

    () => {

      alert("Location Permission Denied");

    }

  );

}

window.getLocation = getLocation;

// =========================
// SOS BUTTON
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const sosBtn = document.getElementById("sosBtn");

  if (!sosBtn) return;

  sosBtn.addEventListener("click", () => {

    const phone = localStorage.getItem("parentNumber");

    if (!phone) {
      alert("Please Save Emergency Contact First");
      return;
    }

    const emergencyType =
      document.querySelector(
        'input[name="emergencyType"]:checked'
      )?.value || "Emergency";

    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {

          await addDoc(collection(db, "sos_alerts"), {

            emergency: emergencyType,
            phone: phone,
            latitude: lat,
            longitude: lon,
            createdAt: new Date()

          });

        } catch (e) {

          console.log(e);

        }

        const message =
`🚨 SOS ALERT

Emergency: ${emergencyType}

Location:
https://maps.google.com/?q=${lat},${lon}

Need Help Immediately!`;

        if (navigator.onLine) {

          window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
          );

        } else {

          window.location.href =
            `sms:${phone}?body=${encodeURIComponent(message)}`;

        }

      },

      () => {

        const message =
`🚨 SOS ALERT

Need Help Immediately!

Location unavailable.`;

        window.location.href =
          `sms:${phone}?body=${encodeURIComponent(message)}`;

      }

    );

  });

});

// =========================
// LOGOUT
// =========================
async function logout() {

  try {

    await signOut(auth);

    localStorage.clear();

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

}

window.logout = logout;