let currentRole = 'student';

const studentBtn = document.getElementById('roleStudent');
const parentBtn = document.getElementById('roleParent');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

// Toggle to Student Role
studentBtn.addEventListener('click', () => {
    currentRole = 'student';
    studentBtn.classList.add('active');
    parentBtn.classList.remove('active');
    errorMsg.innerText = "";
});

// Toggle to Parent Role
parentBtn.addEventListener('click', () => {
    currentRole = 'parent';
    parentBtn.classList.add('active');
    studentBtn.classList.remove('active');
    errorMsg.innerText = "";
});

// Handle Login Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    // Static credentials for prototype testing
    if (currentRole === 'student' && user === 'student123' && pass === 'password') {
        localStorage.setItem('userRole', 'student');
        window.location.href = 'index.html'; // Redirects to your SOS panel
    } else if (currentRole === 'parent' && user === 'parent123' && pass === 'password') {
        localStorage.setItem('userRole', 'parent');
        window.location.href = 'parent.html'; // Redirects to parent panel
    } else {
        errorMsg.innerText = "❌ Invalid ID or Password. Try student123 or parent123 (Password: password)";
    }

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    window.location.href = "sos.html";
});
});
