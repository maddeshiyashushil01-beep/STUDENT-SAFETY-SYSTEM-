import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// CLOUDINARY SETTINGS
// ===============================

const CLOUD_NAME = "lzxerltu";
const UPLOAD_PRESET = "studentlocker";


// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    console.log("Logged in user:", user.email);
});


// ===============================
// GET HTML ELEMENTS
// ===============================

const fileInput = document.getElementById("fileInput");
const category = document.getElementById("category");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");


// ===============================
// UPLOAD FILE
// ===============================

uploadBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];
    const selectedCategory = category.value;


    // No file selected
    if (!file) {

        uploadStatus.textContent =
            "❌ Please select a file first.";

        return;
    }


    // Show uploading message
    uploadStatus.textContent =
        "⏳ Uploading your document...";

    uploadBtn.disabled = true;


    try {

        // Create form data
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


        // Get Cloudinary response
        const data = await response.json();


        // Check error
        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "Cloudinary upload failed"
            );
        }


        // Successful upload
        console.log(
            "Cloudinary response:",
            data
        );


        console.log(
            "File URL:",
            data.secure_url
        );


        uploadStatus.textContent =
            "✅ Document uploaded successfully!";


        // ===============================
        // SHOW UPLOADED DOCUMENT
        // ===============================

        const documentList =
            document.getElementById("documentList");


        if (documentList) {

            const documentItem =
                document.createElement("div");

            documentItem.className =
                "document-item";


            documentItem.innerHTML = `
                <div>
                    <strong>📄 ${file.name}</strong>
                    <p>Category: ${selectedCategory}</p>
                </div>

                <a
                    href="${data.secure_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View
                </a>
            `;


            documentList.prepend(
                documentItem
            );
        }


        // Clear file input
        fileInput.value = "";


    } catch (error) {

        console.error(
            "Cloudinary Error:",
            error
        );


        uploadStatus.textContent =
            "❌ Upload failed: " +
            error.message;


    } finally {

        uploadBtn.disabled = false;
    }

});