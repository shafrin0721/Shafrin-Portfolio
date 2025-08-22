document.addEventListener('DOMContentLoaded', () => {
    // =======================
    // Theme switcher
    // =======================
    const themeToggleBtn = document.getElementById("theme-toggle");
    themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");
  
      // Change icon
      themeToggleBtn.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
  
      // Save preference
      if (document.body.classList.contains("light-theme")) {
        localStorage.setItem('theme', 'light-theme');
      } else {
        localStorage.removeItem('theme');
      }
    });
  
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
      themeToggleBtn.textContent = "🌙";
    } else {
      themeToggleBtn.textContent = "☀️";
    }
  
    // =======================
    // Smooth scrolling
    // =======================
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
  // Log all keydowns for debugging
    document.addEventListener('keydown', e => {
    console.log(`key: ${e.key}, ctrl: ${e.ctrlKey}, alt: ${e.altKey}`);
   });
    
  // =======================
  // Admin panel shortcut (Ctrl + Alt + A)
  // =======================
  document.addEventListener('keydown', function (e) {
    const activeElement = document.activeElement;
    const isTyping = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  
    if (!isTyping && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
      const adminSection = document.getElementById('admin-login');
      console.log('Admin panel element:', adminSection);
      adminSection.classList.remove('hidden');
      console.log('Hidden class removed?', !adminSection.classList.contains('hidden'));
    }
  });
  
  
  
    // =======================
    // Admin form login
    // =======================
    const adminForm = document.getElementById('admin-form');
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
  
      if (username === 'admin' && password === 'password') {
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('user-messages').classList.remove('hidden');
        displayUserMessages();
      } else {
        alert('Invalid Credentials, please try again.');
      }
  
      this.reset();
    });
  
    // =======================
    // Close Admin Panel button
    // =======================
    const closeAdminBtn = document.getElementById('close-admin');
    if (closeAdminBtn) {
      closeAdminBtn.addEventListener('click', () => {
        document.getElementById('admin-login').classList.add('hidden');
      });
    }
  
    // =======================
    // Contact Form
    // =======================
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
  
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('your-name').value;
      const email = document.getElementById('your-email').value;
      const message = document.getElementById('your-message').value;
  
      const response = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };
  
      let responses = JSON.parse(localStorage.getItem('responses')) || [];
      responses.push(response);
      localStorage.setItem('responses', JSON.stringify(responses));
  
      // Show success message
      contactSuccess.textContent = 'Your message was sent!';
      contactSuccess.classList.remove('hidden');
      setTimeout(() => {
        contactSuccess.classList.add('hidden');
      }, 3000);
  
      contactForm.reset();
    });
  
    // =======================
    // Display User Messages in Admin Panel
    // =======================
    function displayUserMessages() {
      const messagesContainer = document.getElementById('saari-messages');
      const responses = JSON.parse(localStorage.getItem('responses')) || [];
  
      messagesContainer.innerHTML = '';
  
      if (responses.length === 0) {
        messagesContainer.innerHTML = '<p>No messages to display.</p>';
        return;
      }
  
      responses.forEach(response => {
        const messageEl = document.createElement('div');
        messageEl.classList.add('response');
        messageEl.innerHTML = `
          <p><strong>Name:</strong> ${response.name}</p>
          <p><strong>Email:</strong> ${response.email}</p>
          <p><strong>Message:</strong> ${response.message}</p>
          <p><strong>Timestamp:</strong> ${new Date(response.timestamp).toLocaleString()}</p>
          <hr />
        `;
        messagesContainer.appendChild(messageEl);
      });
    }
  });
  