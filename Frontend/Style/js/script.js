document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.querySelector(".signup-form a");
    const loginLink = document.querySelector(".login-form a");
    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");
  
    signupForm.style.display = "block"; // Show signup form initially
  
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
  