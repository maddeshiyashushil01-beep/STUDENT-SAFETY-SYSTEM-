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

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const message =
`🚨 SOS ALERT
Emergency: ${emergencyType}

Location:
https://maps.google.com/?q=${lat},${lon}

Need Help Immediately!`;

                // Internet available
                if (navigator.onLine) {

                    window.open(
                        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                        "_blank"
                    );

                } else {

                    // Offline → Open SMS app
                    window.location.href =
                    `sms:${phone}?body=${encodeURIComponent(message)}`;

                }

            },

            function() {

                const message =
`🚨 SOS ALERT
Emergency: ${emergencyType}
Location unavailable.
Need Help Immediately!`;

                window.location.href =
                `sms:${phone}?body=${encodeURIComponent(message)}`;

            }

        );

    } else {

        alert("Location not supported");

    }

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