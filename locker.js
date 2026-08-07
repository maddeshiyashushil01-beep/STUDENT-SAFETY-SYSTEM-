import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// Firebase Login Check
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
    }

});


// ===============================
// Cloudinary Configuration
// ===============================

const CLOUD_NAME = "lzxerlitu";
const UPLOAD_PRESET = "studentlocker";


// ===============================
// Get HTML Elements
// ===============================

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const category = document.getElementById("category");
const uploadStatus = document.getElementById("uploadStatus");


// ===============================
// Upload Button
// ===============================

uploadBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];
    const selectedCategory = category.value;


    // Check file
    if (!file) {

        uploadStatus.textContent = "❌ Please select a file first.";

        return;
    }


    uploadStatus.textContent = "⏳ Uploading...";

    uploadBtn.disabled = true;


    try {

        // Create FormData
        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            UPLOAD_PRESET
        );


        // Upload to Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            {
                method: "POST",
                body: formData
            }
        );


        // Convert response to JSON
        const data = await response.json();


        // Check for error
        if (!response.ok) {

            throw new Error(
                data.error?.message || "Upload failed"
            );

        }


        // Success
        console.log("Cloudinary response:", data);

        console.log("File URL:", data.secure_url);


        uploadStatus.textContent =
            "✅ File uploaded successfully!";


        // Show information
        alert(
            "File uploaded successfully!\n\n" +
            "File: " + file.name + "\n" +
            "Category: " + selectedCategory
        );


        // Clear selected file
        fileInput.value = "";


    } catch (error) {

        console.error("Upload error:", error);

        uploadStatus.textContent =
            "❌ Upload failed: " + error.message;

    }


    uploadBtn.disabled = false;

});