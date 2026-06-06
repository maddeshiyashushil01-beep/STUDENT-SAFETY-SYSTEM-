// Get references
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
let currentRole = 'student'; // default role

// Role selector buttons
const roleStudentBtn = document.getElementById('roleStudent');
const roleParentBtn = document.getElementById('roleParent');

// Handle role switching
roleStudentBtn.addEventListener('click', () => {
    currentRole = 'student';
    roleStudentBtn.classList.add('active');
    roleParentBtn.classList.remove('active');
});

roleParentBtn.addEventListener('click', () => {
    currentRole = 'parent';
    roleParentBtn.classList.add('active');
    roleStudentBtn.classList.remove('active');
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    if (currentRole === 'student' && user === 'student123' && pass === 'password') {
        localStorage.setItem('userRole', 'student');
        window.location.href = 'index.html'; 
    } else if (currentRole === 'parent' && user === 'parent123' && pass === 'password') {
        localStorage.setItem('userRole', 'parent');
        window.location.href = 'parent.html'; 
    } else {
        errorMsg.innerText = "❌ Invalid ID or Password. Try student123 or parent123 (Password: password)";
    }
});