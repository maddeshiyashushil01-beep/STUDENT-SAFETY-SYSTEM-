// Handle Login Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    // Relative paths without the leading slash
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
