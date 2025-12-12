document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const signupForm = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Form input elements
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dateOfBirthInput = document.getElementById('dateOfBirth');
    const genderSelect = document.getElementById('gender');
    const citySelect = document.getElementById('city');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const newsletterCheckbox = document.getElementById('newsletter');
    
    // Error message elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const dateOfBirthError = document.getElementById('dateOfBirthError');
    const genderError = document.getElementById('genderError');
    const cityError = document.getElementById('cityError');
    const termsError = document.getElementById('termsError');
    
    // Password strength indicator
    const passwordStrength = document.getElementById('passwordStrength');
    
    // Social signup buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    function validateDateOfBirth(date) {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 13 && age <= 120;
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        passwordStrength.className = 'password-strength';
        if (strength <= 2) {
            passwordStrength.classList.add('weak');
        } else if (strength === 3) {
            passwordStrength.classList.add('fair');
        } else if (strength === 4) {
            passwordStrength.classList.add('good');
        } else {
            passwordStrength.classList.add('strong');
        }
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
        hideError(firstNameError);
        hideError(lastNameError);
        hideError(emailError);
        hideError(phoneError);
        hideError(passwordError);
        hideError(confirmPasswordError);
        hideError(dateOfBirthError);
        hideError(genderError);
        hideError(cityError);
        hideError(termsError);
    }
    
    // Real-time validation
    firstNameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(firstNameError);
        } else if (!validateName(this.value)) {
            showError(firstNameError, 'First name must be at least 2 characters and contain only letters');
        } else {
            hideError(firstNameError);
        }
    });
    
    lastNameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(lastNameError);
        } else if (!validateName(this.value)) {
            showError(lastNameError, 'Last name must be at least 2 characters and contain only letters');
        } else {
            hideError(lastNameError);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(emailError);
        } else if (!validateEmail(this.value)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            hideError(phoneError);
        } else if (!validatePhone(this.value)) {
            showError(phoneError, 'Please enter a valid phone number');
        } else {
            hideError(phoneError);
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        checkPasswordStrength(password);
        
        if (password === '') {
            hideError(passwordError);
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Password must be at least 8 characters long');
        } else {
            hideError(passwordError);
        }
        
        // Check password confirmation if it has a value
        if (confirmPasswordInput.value !== '') {
            if (password !== confirmPasswordInput.value) {
                showError(confirmPasswordError, 'Passwords do not match');
            } else {
                hideError(confirmPasswordError);
            }
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value === '') {
            hideError(confirmPasswordError);
        } else if (this.value !== passwordInput.value) {
            showError(confirmPasswordError, 'Passwords do not match');
        } else {
            hideError(confirmPasswordError);
        }
    });
    
    dateOfBirthInput.addEventListener('change', function() {
        if (this.value === '') {
            hideError(dateOfBirthError);
        } else if (!validateDateOfBirth(this.value)) {
            showError(dateOfBirthError, 'You must be at least 13 years old to sign up');
        } else {
            hideError(dateOfBirthError);
        }
    });
    
    genderSelect.addEventListener('change', function() {
        if (this.value === '') {
            showError(genderError, 'Please select your gender');
        } else {
            hideError(genderError);
        }
    });
    
    citySelect.addEventListener('change', function() {
        if (this.value === '') {
            showError(cityError, 'Please select your city');
        } else {
            hideError(cityError);
        }
    });
    
    agreeTermsCheckbox.addEventListener('change', function() {
        if (!this.checked) {
            showError(termsError, 'You must agree to the terms and conditions');
        } else {
            hideError(termsError);
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form values
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const dateOfBirth = dateOfBirthInput.value;
        const gender = genderSelect.value;
        const city = citySelect.value;
        const agreeTerms = agreeTermsCheckbox.checked;
        const newsletter = newsletterCheckbox.checked;
        
        // Validate form
        let isValid = true;
        
        if (firstName === '') {
            showError(firstNameError, 'First name is required');
            isValid = false;
        } else if (!validateName(firstName)) {
            showError(firstNameError, 'First name must be at least 2 characters and contain only letters');
            isValid = false;
        }
        
        if (lastName === '') {
            showError(lastNameError, 'Last name is required');
            isValid = false;
        } else if (!validateName(lastName)) {
            showError(lastNameError, 'Last name must be at least 2 characters and contain only letters');
            isValid = false;
        }
        
        if (email === '') {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (phone === '') {
            showError(phoneError, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone)) {
            showError(phoneError, 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (password === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        if (confirmPassword === '') {
            showError(confirmPasswordError, 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordError, 'Passwords do not match');
            isValid = false;
        }
        
        if (dateOfBirth === '') {
            showError(dateOfBirthError, 'Date of birth is required');
            isValid = false;
        } else if (!validateDateOfBirth(dateOfBirth)) {
            showError(dateOfBirthError, 'You must be at least 13 years old to sign up');
            isValid = false;
        }
        
        if (gender === '') {
            showError(genderError, 'Please select your gender');
            isValid = false;
        }
        
        if (city === '') {
            showError(cityError, 'Please select your city');
            isValid = false;
        }
        
        if (!agreeTerms) {
            showError(termsError, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        signupBtn.classList.add('loading');
        signupBtn.disabled = true;
        
        // Simulate API call (replace with actual signup logic)
        setTimeout(() => {
            // Simulate successful signup
            const userData = {
                firstName,
                lastName,
                email,
                phone,
                city,
                gender,
                dateOfBirth,
                newsletter
            };
            
            // Store user data (in real app, this would be sent to server)
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userEmail', email);
            
            // Show success message
            showSuccessMessage('Account created successfully! Redirecting to login...');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        }, 2000);
    });
    
    // Social signup handlers
    googleBtn.addEventListener('click', function() {
        showInfoMessage('Google signup integration coming soon!');
    });
    
    facebookBtn.addEventListener('click', function() {
        showInfoMessage('Facebook signup integration coming soon!');
    });
    
    // Terms and Privacy links
    const termsLink = document.querySelector('.terms-link');
    const privacyLink = document.querySelector('.privacy-link');
    
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfoMessage('Terms of Service page coming soon!');
    });
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfoMessage('Privacy Policy page coming soon!');
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
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input, select');
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
    
    // Auto-format phone number
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        this.value = value;
    });
    
    // Set minimum date for date of birth (13 years ago)
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    
    dateOfBirthInput.min = minDate.toISOString().split('T')[0];
    dateOfBirthInput.max = maxDate.toISOString().split('T')[0];
    
    // Initialize password strength indicator
    checkPasswordStrength('');
});

