


import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser = null;

// ===============================
// CHECK LOGIN
// ===============================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  currentUser = user;

// Load saved contact
await loadContact();

// Load student profile
await loadStudentProfile();


});

// ===============================
// LOAD SAVED CONTACT
// ===============================
async function loadContact() {

  try {

    const docRef = doc(db, "contacts", currentUser.uid);

    const snap = await getDoc(docRef);

    if (snap.exists()) {

      const data = snap.data();

      document.getElementById("contactName").value = data.name;
      document.getElementById("contactNumber").value = data.number;

      localStorage.setItem("parentName", data.name);
      localStorage.setItem("parentNumber", data.number);

    }

  } catch (error) {

    console.log(error);

  }

}

// ===============================
// SAVE CONTACT
// ===============================
async function saveContact() {

  const name = document.getElementById("contactName").value.trim();

  const number = document.getElementById("contactNumber").value.trim();

  if (!name || !number) {

    alert("Enter Parent Name and Phone Number");
    return;

  }

  try {

    await setDoc(doc(db, "contacts", currentUser.uid), {

      name: name,
      number: number,
      updatedAt: new Date()

    });

    localStorage.setItem("parentName", name);
    localStorage.setItem("parentNumber", number);

    alert("✅ Contact Saved Successfully");

  } catch (error) {

    console.log(error);
    alert(error.message);

  }

}

window.saveContact = saveContact;

// ===============================
// SUBMIT COMPLAINT
// ===============================
async function submitComplaint() {

  const complaint = document.getElementById("complaint").value.trim();

  if (!complaint) {

    alert("Write Complaint");
    return;

  }

  try {

    await addDoc(collection(db, "complaints"), {

      user: currentUser.email,
      complaint: complaint,
      createdAt: new Date()

    });

    document.getElementById("complaint").value = "";

    alert("✅ Complaint Submitted");

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

}

window.submitComplaint = submitComplaint;

// ===============================
// SHARE LOCATION
// ===============================
function getLocation() {

  if (!navigator.geolocation) {

    alert("Location not supported");

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

// ===============================
// SOS BUTTON
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const sosBtn = document.getElementById("sosBtn");

  if (!sosBtn) return;

  sosBtn.addEventListener("click", () => {

    const phone = localStorage.getItem("parentNumber");

    if (!phone) {

      alert("Please Save Emergency Contact First");

      return;

    }

    const emergencyType = document.querySelector(
      'input[name="emergencyType"]:checked'
    ).value;

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;

        const lon = position.coords.longitude;

        try {

          await addDoc(collection(db, "sos_alerts"), {

            user: currentUser.email,
            emergency: emergencyType,
            latitude: lat,
            longitude: lon,
            createdAt: new Date()

          });

        } catch (error) {

          console.log(error);

        }

        const message =
`🚨 SOS ALERT

Student : ${currentUser.email}

Emergency : ${emergencyType}

Location :
https://maps.google.com/?q=${lat},${lon}

Need Help Immediately`;

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

        window.location.href =
        `sms:${phone}?body=SOS Help Needed`;

      }

    );

  });

});



async function loadStudentProfile() {

    try {

        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) return;

        const data = profileSnap.data();

        document.getElementById("studentName").innerText =
            data.fullName || data.name || "Student";

        document.getElementById("studentPhoto").src =
            data.photoURL || data.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    } catch (error) {

        console.log(error);

    }

}






// ===============================
// LOGOUT
// ===============================
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

