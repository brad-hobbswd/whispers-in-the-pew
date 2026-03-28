/* =========================
   LOAD HEADER + FOOTER
========================= */
function loadPartials() {
  fetch('/whispers-in-the-pew/partials/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // IMPORTANT: run AFTER header loads
      setActiveNav();
    });

  fetch('/whispers-in-the-pew/partials/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
}

/* =========================
   NAVIGATION
========================= */
function navigateTo(page) {
  switch(page) {
    case 'home':
      window.location.href = '/whispers-in-the-pew/';
      break;
    case 'devotions':
      window.location.href = '/whispers-in-the-pew/devotions/';
      break;
    case 'store':
      window.location.href = '/whispers-in-the-pew/store.html';
      break;
    case 'about':
      window.location.href = '/whispers-in-the-pew/about.html';
      break;
    case 'contact':
      window.location.href = '/whispers-in-the-pew/contact.html';
      break;
  }
}

/* =========================
   ACTIVE NAV HIGHLIGHT
========================= */
function setActiveNav() {
  const path = window.location.pathname;

  if (path.includes('devotions')) {
    document.getElementById('nav-devotions')?.classList.add('active');
  } else if (path.includes('store')) {
    document.getElementById('nav-store')?.classList.add('active');
  } else if (path.includes('about')) {
    document.getElementById('nav-about')?.classList.add('active');
  } else if (path.includes('contact')) {
    document.getElementById('nav-contact')?.classList.add('active');
  } else {
    document.getElementById('nav-home')?.classList.add('active');
  }
}

/* =========================
   INTERACTION LOCKS
========================= */

/* Disable right click */
document.addEventListener("contextmenu", function(e){
  e.preventDefault();
});

/* Disable certain keys */
document.addEventListener("keydown", function(e) {
  if (
    (e.ctrlKey && e.key === "c") ||
    (e.ctrlKey && e.key === "x") ||
    (e.ctrlKey && e.key === "u") ||
    (e.ctrlKey && e.key === "s")
  ) {
    e.preventDefault();
  }
});

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  loadPartials();
});

/* =========================
   CONTACT PAGE LOGIC
========================= */

let currentMode = "not specified";

function setMode(mode) {
  currentMode = mode;

  const box = document.getElementById("messageBox");
  const typeField = document.getElementById("messageType");

  if (typeField) {
    if (mode === "prayer") typeField.value = "I need prayer";
    if (mode === "talk") typeField.value = "I need to talk";
    if (mode === "question") typeField.value = "I have a question";
  }

  if (box) {
    if (mode === "prayer") box.placeholder = "Share your prayer request...";
    if (mode === "talk") box.placeholder = "You can speak freely here...";
    if (mode === "question") box.placeholder = "What would you like to ask?";
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(() => {
    window.location.href = "/whispers-in-the-pew/thank-you.html";
  })
  .catch(() => {
    alert("Something went wrong. Please try again.");
  });
}
