// Get references to form and error message
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const currentRole = document.getElementById('role').value; // dropdown role

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