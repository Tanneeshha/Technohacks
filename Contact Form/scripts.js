document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Input fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Error messages
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset validation state
        resetValidation();
        
        // Validate inputs
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError);
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError);
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError);
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError);
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Simulate form submission (in a real application, you would submit to a server)
            console.log({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }
    });
    
    // Helper functions
    function showError(input, errorElement) {
        input.classList.add('invalid');
        errorElement.style.display = 'block';
    }
    
    function resetValidation() {
        // Remove error classes
        nameInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        messageInput.classList.remove('invalid');
        
        // Hide error messages
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Live validation on input
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            nameInput.classList.remove('invalid');
            nameError.style.display = 'none';
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value)) {
            emailInput.classList.remove('invalid');
            emailError.style.display = 'none';
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            messageInput.classList.remove('invalid');
            messageError.style.display = 'none';
        }
    });
});