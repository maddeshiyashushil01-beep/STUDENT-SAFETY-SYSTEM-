import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// SAVE CONTACT
async function saveContact() {

    const name =
    document.getElementById("contactName").value.trim();

    const number =
    document.getElementById("contactNumber").value.trim();

    if (!name || !number) {
        alert("Enter Name and Phone Number");
        return;
    }

    try {

        await addDoc(
            collection(db, "contacts"),
            {
                name: name,
                number: number,
                createdAt: new Date()
            }
        );

        localStorage.setItem("parentName", name);
        localStorage.setItem("parentNumber", number);

        alert("✅ Contact Saved");

    } catch (error) {

        console.log(error);
        alert("Error Saving Contact");
    }
}

window.saveContact = saveContact;


// SUBMIT COMPLAINT
async function submitComplaint() {

    const complaint =
    document.getElementById("complaint").value.trim();

    if (!complaint) {
        alert("Write complaint first");
        return;
    }

    try {

        await addDoc(
            collection(db, "complaints"),
            {
                complaint: complaint,
                createdAt: new Date()
            }
        );

        alert("✅ Complaint Submitted");

    } catch (error) {

        console.log(error);
        alert("Error Submitting Complaint");
    }
}

window.submitComplaint = submitComplaint;


// LOCATION
function getLocation() {

    if (!navigator.geolocation) {

        alert("Location not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            document.getElementById("location")
            .innerText =

            "📍 Latitude: " +
            position.coords.latitude +

            " | Longitude: " +
            position.coords.longitude;
        },

        function() {

            alert("Location Permission Denied");
        }

    );
}

window.getLocation = getLocation;


// SOS BUTTON
document.addEventListener("DOMContentLoaded", () => {

    const sosBtn =
    document.getElementById("sosBtn");

    if (!sosBtn) return;

    sosBtn.addEventListener("click", async () => {

        const phone =
        localStorage.getItem("parentNumber");

        if (!phone) {

            alert("Please Save Emergency Contact First");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async function(position) {

                const lat =
                position.coords.latitude;

                const lon =
                position.coords.longitude;

                const emergencyType =
                document.querySelector(
                'input[name="emergencyType"]:checked'
                )?.value || "Emergency";

                try {

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

                    const message =
                    `🚨 SOS ALERT! Need Help. Location: https://maps.google.com/?q=${lat},${lon}`;

                    window.open(
                        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                        "_blank"
                    );

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

});


// LOGOUT
function logout() {

    localStorage.clear();

    window.location.href = "index.html";
}

window.logout = logout;