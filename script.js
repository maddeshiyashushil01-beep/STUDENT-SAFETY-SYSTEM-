import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Load saved phone
document.addEventListener("DOMContentLoaded", () => {

    const savedPhone =
    localStorage.getItem("emergencyPhone");

    if (savedPhone) {
        const phoneField =
        document.getElementById("contactPhone");

        if (phoneField) {
            phoneField.value = savedPhone;
        }
    }
});

// Save Emergency Contact
const saveBtn =
document.getElementById("saveConfigBtn");

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        const phone =
        document.getElementById("contactPhone").value.trim();

        if (phone) {

            localStorage.setItem(
                "emergencyPhone",
                phone
            );

            alert("✅ Emergency Contact Saved");

        } else {

            alert("Enter valid phone number");

        }
    });
}

// SOS Button
const sosBtn =
document.getElementById("sosBtn");

if (sosBtn) {

    sosBtn.addEventListener("click", () => {

        const phone =
        localStorage.getItem("emergencyPhone");

        if (!phone) {

            alert(
            "Please save emergency phone number first"
            );

            return;
        }

        const statusLocation =
        document.getElementById("statusLocation");

        if (statusLocation) {
            statusLocation.innerText =
            "📍 Getting Location...";
        }

        navigator.geolocation.getCurrentPosition(

            async function(position) {

                const lat =
                position.coords.latitude;

                const lon =
                position.coords.longitude;

                try {

                    const emergencyType =
                    document.querySelector(
                    'input[name="emergencyType"]:checked'
                    )?.value || "Emergency";

                    await addDoc(
                        collection(db, "sos_alerts"),
                        {
                            emergency: emergencyType,
                            phone: phone,
                            latitude: lat,
                            longitude: lon,
                            createdAt: new Date()
                        }
                    );

                    let message =
                    `🚨 SOS ALERT! Need Help. Location: https://maps.google.com/?q=${lat},${lon}`;

                    window.location.href =
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

                } catch(error) {

                    console.log(error);
                    alert("Firebase Error");
                }
            },

            function() {

                alert("Location Permission Denied");
            }

        );
    });
}

// Save Contact
async function saveContact() {

    const name =
    document.getElementById("contactName").value;

    const number =
    document.getElementById("contactNumber").value;

    try {

        await addDoc(
            collection(db, "contacts"),
            {
                name: name,
                number: number,
                createdAt: new Date()
            }
        );

        alert("✅ Contact Saved");

    } catch(error) {

        console.log(error);
        alert("Error Saving Contact");
    }
}

window.saveContact = saveContact;

// Submit Complaint
async function submitComplaint() {

    const complaint =
    document.getElementById("complaint").value;

    try {

        await addDoc(
            collection(db, "complaints"),
            {
                complaint: complaint,
                createdAt: new Date()
            }
        );

        alert("✅ Complaint Submitted");

    } catch(error) {

        console.log(error);
        alert("Error Submitting Complaint");
    }
}

window.submitComplaint = submitComplaint;

// Share Location
function getLocation() {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            document.getElementById("location")
            .innerText =

            "Latitude: " +
            position.coords.latitude +

            " | Longitude: " +
            position.coords.longitude;
        }

    );
}

window.getLocation = getLocation;

// Logout
function logout() {

    localStorage.clear();

    window.location.href =
    "login.html";
}

window.logout = logout;