import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ==========================================
// GET ELEMENTS
// ==========================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const roleInput = document.getElementById("role");

const errorMsg = document.getElementById("errorMsg");

const loginBtn = document.getElementById("loginBtn");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPassword =
    document.getElementById("forgotPassword");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁️";

        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    errorMsg.textContent = "";

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const role =
        roleInput.value;


    // Basic validation
    if (!email || !password) {

        showMessage(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    // Disable button
    loginBtn.disabled = true;

    loginBtn.textContent = "Logging in...";


    try {

        // Remember login
        await setPersistence(
            auth,
            browserLocalPersistence
        );


        // Firebase login
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // ==================================
        // STUDENT LOGIN
        // ==================================

        if (role === "student") {

            showMessage(
                "✅ Login successful! Opening dashboard...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "sos.html";

            }, 500);


            return;
        }


        // ==================================
        // ADMIN LOGIN
        // ==================================

        const snapshot =
            await getDocs(
                collection(db, "admins")
            );


        let isAdmin = false;


        snapshot.forEach((doc) => {

            const data = doc.data();

            if (
                data.email &&
                data.email
                    .trim()
                    .toLowerCase() ===
                user.email
                    .trim()
                    .toLowerCase()
            ) {

                isAdmin = true;

            }

        });


        if (isAdmin) {

            showMessage(
                "✅ Admin login successful!",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "admin.html";

            }, 500);


        } else {

            await signOut(auth);

            showMessage(
                "❌ Access denied. This account is not an Admin.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        // ==================================
        // FRIENDLY FIREBASE ERRORS
        // ==================================

        let message =
            "❌ Login failed. Please try again.";


        switch (error.code) {

            case "auth/invalid-credential":

            case "auth/wrong-password":

            case "auth/user-not-found":

                message =
                    "❌ Wrong email or password.";

                break;


            case "auth/invalid-email":

                message =
                    "❌ Please enter a valid email address.";

                break;


            case "auth/too-many-requests":

                message =
                    "⚠️ Too many attempts. Please try again later.";

                break;


            case "auth/network-request-failed":

                message =
                    "🌐 Network error. Check your internet connection.";

                break;


            case "auth/user-disabled":

                message =
                    "🚫 This account has been disabled.";

                break;

        }


        showMessage(
            message,
            "error"
        );

    } finally {

        loginBtn.disabled = false;

        loginBtn.textContent =
            "Access Dashboard";

    }

});


// ==========================================
// FORGOT PASSWORD
// ==========================================

forgotPassword.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();


        // Email required
        if (!email) {

            showMessage(
                "📧 Enter your email address first.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // Check email format
        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            showMessage(
                "❌ Please enter a valid email address.",
                "error"
            );

            return;
        }


        forgotPassword.disabled = true;

        forgotPassword.textContent =
            "Sending reset email...";


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            showMessage(
                "✅ Password reset email sent. Check your inbox.",
                "success"
            );


        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );


            let message =
                "❌ Unable to send reset email.";


            switch (error.code) {

                case "auth/user-not-found":

                    message =
                        "❌ No account found with this email.";

                    break;


                case "auth/invalid-email":

                    message =
                        "❌ Please enter a valid email address.";

                    break;


                case "auth/too-many-requests":

                    message =
                        "⚠️ Too many requests. Try again later.";

                    break;

            }


            showMessage(
                message,
                "error"
            );

        } finally {

            forgotPassword.disabled = false;

            forgotPassword.textContent =
                "Forgot Password?";

        }

    }
);


// ==========================================
// MESSAGE FUNCTION
// ==========================================

function showMessage(
    message,
    type
) {

    errorMsg.textContent =
        message;


    if (type === "success") {

        errorMsg.classList.add(
            "success-message"
        );

        errorMsg.classList.remove(
            "error-text"
        );

    } else {

        errorMsg.classList.add(
            "error-text"
        );

        errorMsg.classList.remove(
            "success-message"
        );

    }

}