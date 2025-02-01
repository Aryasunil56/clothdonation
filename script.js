// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const closeButtons = document.querySelectorAll('.close');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

// Form Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const donationForm = document.getElementById('donationForm');
const contactForm = document.getElementById('contactForm');

// Navigation and Modal Control
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === signupModal) {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 number, 1 special character
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

function showError(element, message) {
    const formGroup = element.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    element.classList.add('error');
}

function clearError(element) {
    const formGroup = element.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    element.classList.remove('error');
}

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let isValid = true;

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }

    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        clearError(password);
    }

    if (isValid) {
        // Mock authentication - replace with actual authentication
        const user = JSON.parse(localStorage.getItem('users') || '[]')
            .find(u => u.email === email.value && u.password === password.value);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification('Login successful!', 'success');
            loginModal.style.display = 'none';
            updateUIForLoggedInUser(user);
        } else {
            showNotification('Invalid credentials', 'error');
        }
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    let isValid = true;

    if (name.value.length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!validatePassword(password.value)) {
        showError(password, 'Password must contain at least 8 characters, 1 uppercase, 1 number, and 1 special character');
        isValid = false;
    } else {
        clearError(password);
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    if (!terms.checked) {
        showError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError(terms);
    }

    if (isValid) {
        // Mock registration - replace with actual registration
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {
            id: Date.now(),
            name: name.value,
            email: email.value,
            password: password.value
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        showNotification('Registration successful! Please log in.', 'success');
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    }
});

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const clothesTypes = document.querySelectorAll('input[type="checkbox"]:checked');
    const condition = document.getElementById('condition');
    let isValid = true;

    if (fullName.value.length < 2) {
        showError(fullName, 'Please enter your full name');
        isValid = false;
    } else {
        clearError(fullName);
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }

    if (clothesTypes.length === 0) {
        showError(document.querySelector('.checkbox-group'), 'Please select at least one type of clothing');
        isValid = false;
    } else {
        clearError(document.querySelector('.checkbox-group'));
    }

    if (!condition.value) {
        showError(condition, 'Please select the condition of clothes');
        isValid = false;
    } else {
        clearError(condition);
    }

    if (isValid) {
        // Mock donation submission - replace with actual submission
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        const newDonation = {
            id: Date.now(),
            fullName: fullName.value,
            email: email.value,
            clothesTypes: Array.from(clothesTypes).map(cb => cb.value),
            condition: condition.value,
            comments: document.getElementById('comments').value,
            date: new Date().toISOString()
        };
        donations.push(newDonation);
        localStorage.setItem('donations', JSON.stringify(donations));
        showNotification('Thank you for your donation!', 'success');
        donationForm.reset();
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.length < 2) {
        showError(name, 'Please enter your name');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }

    if (message.value.length < 10) {
        showError(message, 'Please enter a message (at least 10 characters)');
        isValid = false;
    } else {
        clearError(message);
    }

    if (isValid) {
        // Mock contact form submission - replace with actual submission
        showNotification('Thank you for your message! We\'ll respond soon.', 'success');
        contactForm.reset();
    }
});

// Utility Functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateUIForLoggedInUser(user) {
    loginBtn.textContent = 'Logout';
    loginBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        location.reload();
    });
    
    // Add user-specific UI elements here
    const welcomeMessage = document.createElement('span');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.textContent = `Welcome, ${user.name}!`;
    navLinks.insertBefore(welcomeMessage, loginBtn);
}

// Check for logged-in user on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});