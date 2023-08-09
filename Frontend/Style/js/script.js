document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");
    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");
  
    registerLink.addEventListener("click", function(event) {
      event.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  
    loginLink.addEventListener("click", function(event) {
      event.preventDefault();
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    });
  });
  