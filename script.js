// Load configuration on startup
document.addEventListener("DOMContentLoaded", () => {
    const savedPhone = localStorage.getItem("emergencyPhone");
    if (savedPhone) {
        document.getElementById("contactPhone").value = savedPhone;
    }
});

// Save contact function
document.getElementById("saveConfigBtn").addEventListener("click", () => {
    const phone = document.getElementById("contactPhone").value.trim();
    if (phone) {
        localStorage.setItem("emergencyPhone", phone);
        alert("🚨 Emergency contact updated successfully!");
    } else {
        alert("Please enter a valid phone number.");
    }
});

// Primary Panic Click Trigger
document.getElementById("sosBtn").addEventListener("click", () => {
    const phone = localStorage.getItem("emergencyPhone");
    if (!phone) {
        alert("Please configure and save an emergency phone number first!");
        return;
    }

    const statusText = document.getElementById("statusLocation");
    statusText.innerText = "Fetching precise GPS location...";

    // Use Web Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                statusText.innerText = `Location verified!`;
                
                triggerAlert(phone, lat, lon);
            },
            (error) => {
                statusText.innerText = "Location denied/unavailable. Sending basic alert.";
                triggerAlert(phone, null, null);
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    } else {
        statusText.innerText = "Geolocation not supported. Sending basic alert.";
        triggerAlert(phone, null, null);
    }
});

function triggerAlert(phone, lat, lon) {
    const selectedReason = document.querySelector('input[name="emergencyType"]:checked').value;
    let message = `🚨 EMERGENCY ALERT! I am facing a ${selectedReason} and need help immediately.`;
    
    if (lat && lon) {
        // Creates a direct click-to-map hyperlink
        message += ` My current live location: https://maps.google.com/?q=${lat},${lon}`;
    } else {
        message += ` (GPS coordinates could not be retrieved automatically).`;
    }

    // URL Encode the string for secure link transfer
    const encodedMessage = encodeURIComponent(message);
    
    // Direct cross-platform mobile intent link (Works natively on Android/iOS browsers)
    const alertUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Open communication gateway immediately
    window.location.href = alertUrl;
}


const sosBtn = document.getElementById("sosBtn");

sosBtn.addEventListener("click", () => {
    document.getElementById("status").innerText =
    "🚨 Emergency Alert Sent Successfully!";
});



function showSOS() {
    document.getElementById("msg").innerHTML =
    "Emergency Alert Sent Successfully!";
}

function saveContact() {

    const name =
    document.getElementById("contactName").value;

    const number =
    document.getElementById("contactNumber").value;

    localStorage.setItem("parentName", name);
    localStorage.setItem("parentNumber", number);

    alert("Contact Saved");
}
