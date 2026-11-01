// Authentication functions
function togglePasswordVisibility(inputId, iconElement) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}

// Show notification function
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 10);
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// Check if user is logged in and redirect if not
function checkAuth() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const currentPage = window.location.pathname.split('/').pop();

    // Pages that don't require authentication
    const publicPages = ['login.html', 'signup.html', 'index.html', 'about.html'];

    if (!isLoggedIn && !publicPages.includes(currentPage)) {
        showNotification('Please login to access this page', 'error');
        setTimeout(() => {
            window.location.href = `login.html?returnUrl=${encodeURIComponent(window.location.href)}`;
        }, 2000);
        return false;
    }

    return true;
}

// Get the server URL based on the current environment
function getServerUrl() {
    // Check if we're running on local file system or server
    if (window.location.protocol === 'file:') {
        return 'http://localhost:3001';
    } else {
        return window.location.origin;
    }
}

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        // Try to authenticate with the server
        const serverUrl = getServerUrl();
        const response = await fetch(`${serverUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();

            // Store user data in localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userId', result.user.id);
            localStorage.setItem('userEmail', result.user.email);
            localStorage.setItem('userName', result.user.name);
            localStorage.setItem('userPhone', result.user.phone || '');
            localStorage.setItem('userAddress', result.user.address || '');

            showNotification('Login successful!', 'success');

            // Redirect to return URL or home page
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('returnUrl') || 'index.html';

            setTimeout(() => {
                window.location.href = returnUrl;
            }, 1500);

        } else {
            const error = await response.json();
            showNotification(error.error || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Connection error. Please make sure the server is running on localhost:3001', 'error');
    }
});

// Signup form submission
document.getElementById('signupForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate form
    if (!fullname || !email || !password || !confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showNotification('Password must be at least 8 characters with uppercase, lowercase, and number', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (!termsAccepted) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }

    try {
        // Try to register with the server
        const serverUrl = getServerUrl();
        const response = await fetch(`${serverUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: fullname, 
                email, 
                password,
                phone: phone || null,
                address: address || null
            })
        });

        const responseData = await response.json();
        
        if (response.ok) {
            // Store user data in localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userId', responseData.user.id);
            localStorage.setItem('userEmail', responseData.user.email);
            localStorage.setItem('userName', responseData.user.name);
            localStorage.setItem('userPhone', responseData.user.phone || '');
            localStorage.setItem('userAddress', responseData.user.address || '');

            showNotification('Account created successfully!', 'success');

            // Redirect to return URL or home page
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('returnUrl') || 'index.html';

            setTimeout(() => {
                window.location.href = returnUrl;
            }, 1500);

        } else {
            showNotification(responseData.error || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Connection error. Please make sure the server is running on localhost:3001', 'error');
    }
});

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    // Check authentication for protected pages
    checkAuth();

    if (isLoggedIn) {
        // Update UI for logged-in user
        const loginLinks = document.querySelectorAll('.login a');
        loginLinks.forEach(link => {
            link.textContent = 'Logout';
            link.href = '#';
            link.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                localStorage.removeItem('userPhone');
                localStorage.removeItem('userAddress');
                window.location.reload();
            });
        });

        // Pre-fill user details in forms if available
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');
        const userAddress = localStorage.getItem('userAddress');

        if (userName) {
            const nameInputs = document.querySelectorAll('input[id*="name"], input[id*="Name"]');
            nameInputs.forEach(input => {
                if (!input.value) input.value = userName;
            });
        }

        if (userEmail) {
            const emailInputs = document.querySelectorAll('input[type="email"]');
            emailInputs.forEach(input => {
                if (!input.value) input.value = userEmail;
            });
        }

        if (userPhone) {
            const phoneInputs = document.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => {
                if (!input.value) input.value = userPhone;
            });
        }

        if (userAddress) {
            const addressInputs = document.querySelectorAll('textarea[id*="address"], input[id*="address"]');
            addressInputs.forEach(input => {
                if (!input.value) input.value = userAddress;
            });
        }
    }
});