document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
  
    // Check for saved email if remember me was checked
    const savedEmail = localStorage.getItem('mindscope_email');
    const wasRemembered = localStorage.getItem('mindscope_remember') === 'true';
    
    if (savedEmail && wasRemembered) {
      emailInput.value = savedEmail;
      rememberCheckbox.checked = true;
    }
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get form values
      const email = emailInput.value;
      const password = passwordInput.value;
      const remember = rememberCheckbox.checked;
  
      // Handle remember me
      if (remember) {
        localStorage.setItem('mindscope_email', email);
        localStorage.setItem('mindscope_remember', 'true');
      } else {
        localStorage.removeItem('mindscope_email');
        localStorage.removeItem('mindscope_remember');
      }
  
      // Add loading state to button
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Signing in...';
  
      // Simulate API call (replace with actual authentication logic)
      setTimeout(() => {
        console.log('Login attempt:', {
          email,
          password: '********', // Never log actual passwords
          remember
        });
  
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
  
        // Here you would typically:
        // 1. Send credentials to your authentication endpoint
        // 2. Handle the response (success/failure)
        // 3. Redirect on success or show error message
        // 4. Store authentication token if provided
      }, 1000);
    });
  
    // Add password visibility toggle
    const togglePassword = () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
    };
  
    // Add form validation
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    emailInput.addEventListener('input', () => {
      if (!validateEmail(emailInput.value)) {
        emailInput.setCustomValidity('Please enter a valid email address');
      } else {
        emailInput.setCustomValidity('');
      }
    });
  
    // Add simple password strength indicator
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      if (password.length < 8) {
        passwordInput.setCustomValidity('Password must be at least 8 characters long');
      } else {
        passwordInput.setCustomValidity('');
      }
    });
  });