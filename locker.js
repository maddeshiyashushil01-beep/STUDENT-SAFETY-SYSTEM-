import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =====================================
// CLOUDINARY
// =====================================

const CLOUD_NAME = "lzxerltu";
const UPLOAD_PRESET = "studentlocker";


// =====================================
// HTML ELEMENTS
// =====================================

const fileInput = document.getElementById("fileInput");
const category = document.getElementById("category");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");
const documentList = document.getElementById("documentList");


// =====================================
// CURRENT USER
// =====================================

let currentUser = null;


// =====================================
// LOGIN CHECK
// =====================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";
        return;

    }

    currentUser = user;

    console.log("Logged in:", user.email);

    await loadDocuments();

});


// =====================================
// UPLOAD DOCUMENT
// =====================================

uploadBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];
    const selectedCategory = category.value;


    if (!file) {

        uploadStatus.textContent =
            "❌ Please select a file first.";

        return;

    }


    if (!currentUser) {

        uploadStatus.textContent =
            "❌ Please login again.";

        return;

    }


    uploadBtn.disabled = true;

    uploadStatus.textContent =
        "⏳ Uploading document...";


    try {

        // =================================
        // 1. UPLOAD TO CLOUDINARY
        // =================================

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            UPLOAD_PRESET
        );


        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            {
                method: "POST",
                body: formData
            }
        );


        const cloudinaryData =
            await response.json();


        if (!response.ok) {

            throw new Error(
                cloudinaryData.error?.message ||
                "Cloudinary upload failed"
            );

        }


        const fileURL =
            cloudinaryData.secure_url;


        console.log(
            "Cloudinary URL:",
            fileURL
        );


        // =================================
        // 2. SAVE INFORMATION TO FIRESTORE
        // =================================

        await addDoc(
            collection(db, "lockerDocuments"),
            {

                userId: currentUser.uid,

                userEmail: currentUser.email,

                fileName: file.name,

                category: selectedCategory,

                fileURL: fileURL,

                cloudinaryPublicId:
                    cloudinaryData.public_id,

                fileType: file.type,

                fileSize: file.size,

                createdAt: serverTimestamp()

            }
        );


        // =================================
        // 3. SUCCESS
        // =================================

        uploadStatus.textContent =
            "✅ Document uploaded successfully!";


        // Clear selected file
        fileInput.value = "";

        const fileName =
            document.getElementById("fileName");

        if (fileName) {

            fileName.textContent =
                "Choose a file";

        }


        // Reload documents
        await loadDocuments();


    } catch (error) {

        console.error(
            "Locker error:",
            error
        );


        uploadStatus.textContent =
            "❌ Upload failed: " +
            error.message;


    } finally {

        uploadBtn.disabled = false;

    }

});


// =====================================
// LOAD DOCUMENTS
// =====================================

async function loadDocuments() {

    if (!currentUser) return;


    try {

        documentList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⏳</div>
                <h4>Loading documents...</h4>
                <p>Please wait.</p>
            </div>
        `;


        const documentsQuery = query(
            collection(db, "lockerDocuments"),
            where(
                "userId",
                "==",
                currentUser.uid
            )
        );


        const snapshot =
            await getDocs(documentsQuery);


        console.log(
            "Documents found:",
            snapshot.size
        );


        // Update count
        const countElement =
            document.querySelector(
                ".document-count"
            );


        if (countElement) {

            countElement.textContent =
                `${snapshot.size} ${
                    snapshot.size === 1
                        ? "File"
                        : "Files"
                }`;

        }


        // No documents
        if (snapshot.empty) {

            documentList.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        📄
                    </div>

                    <h4>No documents yet</h4>

                    <p>
                        Upload your first document
                        and it will appear here.
                    </p>

                </div>
            `;

            return;

        }


        // Clear list
        documentList.innerHTML = "";


        // Display documents
        snapshot.forEach((documentSnapshot) => {

            const data =
                documentSnapshot.data();


            const documentId =
                documentSnapshot.id;


            const fileName =
                data.fileName || "Unnamed Document";


            const documentCategory =
                data.category || "Other";


            const fileURL =
                data.fileURL || "#";


            const item =
                document.createElement("div");


            item.className =
                "document-item";


            item.innerHTML = `

                <div class="document-info">

                    <div class="document-icon">
                        📄
                    </div>

                    <div class="document-details">

                        <strong>
                            ${escapeHTML(fileName)}
                        </strong>

                        <p>
                            ${escapeHTML(documentCategory)}
                        </p>

                    </div>

                </div>


                <div class="document-actions">

                    <a
                        href="${fileURL}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="view-btn"
                    >
                        View
                    </a>


                    <button
                        class="delete-btn"
                        data-id="${documentId}"
                    >
                        Delete
                    </button>

                </div>

            `;


            documentList.appendChild(item);

        });


        // Delete buttons
        documentList
            .querySelectorAll(".delete-btn")
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteDocument(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Load documents error:",
            error
        );


        documentList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h4>Unable to load documents</h4>

                <p>
                    ${escapeHTML(error.message)}
                </p>

            </div>
        `;

    }

}


// =====================================
// DELETE DOCUMENT RECORD
// =====================================

async function deleteDocument(documentId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this document?"
        );


    if (!confirmDelete) return;


    try {

        await deleteDoc(
            doc(
                db,
                "lockerDocuments",
                documentId
            )
        );


        await loadDocuments();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Unable to delete document: " +
            error.message
        );

    }

}


// =====================================
// SECURITY: ESCAPE HTML
// =====================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}