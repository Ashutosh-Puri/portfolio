'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });










// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Form 
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  let isValid = true;

  // Clear existing errors
  document.getElementById('nameError').innerText = '';
  document.getElementById('emailError').innerText = '';
  document.getElementById('phoneError').innerText = '';
  document.getElementById('messageError').innerText = '';

  // Validate name
  const name = document.getElementById('name').value.trim();
  if (name === '') {
      document.getElementById('nameError').innerText = 'Name is required';
      isValid = false;
  }

  // Validate email
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email === '') {
      document.getElementById('emailError').innerText = 'Email address is required';
      isValid = false;
  } else if (!email.match(emailPattern)) {
      document.getElementById('emailError').innerText = 'Please enter a valid email address';
      isValid = false;
  }

  // Validate phone
  const phone = document.getElementById('mobile').value.trim();
  const phonePattern = /^\d{10}$/;
  if (phone === '') {
      document.getElementById('phoneError').innerText = 'Mobile number is required';
      isValid = false;
  } else if (!phone.match(phonePattern)) {
      document.getElementById('phoneError').innerText = 'Please enter a valid 10-digit mobile number';
      isValid = false;
  }

  // Validate message
  const message = document.getElementById('message').value.trim();
  if (message === '') {
      document.getElementById('messageError').innerText = 'Message is required';
      isValid = false;
  }

  // If form is valid, submit it using AJAX
  if (isValid) {
      const formData = new FormData();
      formData.append('entry.2005620554', name);
      formData.append('entry.1045781291', email);
      formData.append('entry.1166974658', phone);
      formData.append('entry.1065046570', message);

      fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeR7J8O1zfEuDcw5ndVxru7vxRgYuf0vEUcJgKighOqntlkkQ/formResponse', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
      })
      .then(() => {
          document.getElementById('successMessage').style.display = 'block';
          // Clear form fields
          document.getElementById('contactForm').reset();
      })
      .catch(() => {
          alert('There was an error sending your message. Please try again later.');
      });
  }
});