document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    function clearAllErrors() {
        hideError(emailError);
        hideError(passwordError);
    }
    
    // Real-time validation
    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(emailError);
        } else if (!validateEmail(this.value)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(passwordError);
        } else if (!validatePassword(this.value)) {
            showError(passwordError, 'Password must be at least 6 characters long');
        } else {
            hideError(passwordError);
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validate form
        let isValid = true;
        
        if (email === '') {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (password === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simulate API call (replace with actual authentication logic)
        setTimeout(() => {
            // Simulate successful login
            if (email === 'demo@zomato.com' && password === 'password123') {
                // Store login state
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    sessionStorage.setItem('userEmail', email);
                }
                
                // Show success message
                showSuccessMessage('Login successful! Redirecting...');
                
                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } else {
                // Show error message
                showErrorMessage('Invalid email or password. Please try again.');
                
                // Reset form state
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
            }
        }, 2000);
    });
    
    // Social login handlers
    googleBtn.addEventListener('click', function() {
        showInfoMessage('Google login integration coming soon!');
    });
    
    facebookBtn.addEventListener('click', function() {
        showInfoMessage('Facebook login integration coming soon!');
    });
    
    // Forgot password handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfoMessage('Password reset feature coming soon!');
    });
    
    // Message display functions
    function showSuccessMessage(message) {
        showMessage(message, 'success');
    }
    
    function showErrorMessage(message) {
        showMessage(message, 'error');
    }
    
    function showInfoMessage(message) {
        showMessage(message, 'info');
    }
    
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-toast message-${type}`;
        messageDiv.textContent = message;
        
        // Add styles
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                messageDiv.style.backgroundColor = '#28a745';
                break;
            case 'error':
                messageDiv.style.backgroundColor = '#dc3545';
                break;
            case 'info':
                messageDiv.style.backgroundColor = '#17a2b8';
                break;
        }
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 4000);
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
        if (userEmail) {
            showInfoMessage(`Welcome back, ${userEmail}!`);
        }
    }
    
    // Initialize
    checkLoginStatus();
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
    
    // Demo credentials info
    setTimeout(() => {
        showInfoMessage('Demo credentials: demo@zomato.com / password123');
    }, 2000);
});

