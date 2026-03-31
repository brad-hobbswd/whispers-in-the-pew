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

    case 'prayer':
      window.location.href = '/whispers-in-the-pew/prayer-room.html';
      break;

    case 'store':
      window.location.href = '/whispers-in-the-pew/store.html';
      break;

    case 'resources':
      window.location.href = '/whispers-in-the-pew/resources.html';
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
  } else if (path.includes('prayer')) {
    document.getElementById('nav-prayer')?.classList.add('active');
  } else if (path.includes('store')) {
    document.getElementById('nav-store')?.classList.add('active');
  } else if (path.includes('resources')) {
    document.getElementById('nav-resources')?.classList.add('active');
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

/* =========================
   PRAYER ROOM LOGIC
========================= */

let timerRunning = false;

function startPrayerFlow() {
  const startBtn = document.querySelector("#start button");
  if (startBtn) startBtn.style.display = "none";

  document.getElementById("step1")?.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("step2")?.classList.remove("hidden");
  }, 2000);

  setTimeout(() => {
    document.getElementById("step3")?.classList.remove("hidden");
  }, 4000);
}

function savePrayer(text) {
  let prayers = JSON.parse(localStorage.getItem("prayers")) || [];

  prayers.unshift({
    text: text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("prayers", JSON.stringify(prayers));
}

function loadPrayers() {
  const container = document.getElementById("savedPrayers");
  if (!container) return;

  let prayers = JSON.parse(localStorage.getItem("prayers")) || [];

  container.innerHTML = "";

  prayers.slice(0, 5).forEach(p => {
    let div = document.createElement("div");
    div.style.marginBottom = "12px";
    div.style.padding = "10px";
    div.style.border = "1px solid rgba(200,168,90,.2)";
    div.style.borderRadius = "8px";
    div.style.color = "var(--muted)";

    div.innerHTML = `
      <div style="font-size:.85rem; opacity:.6;">${p.time}</div>
      <div>${p.text}</div>
    `;

    container.appendChild(div);
  });
}

function releasePrayer() {
  const box = document.getElementById("prayerBox");
  if (!box || !box.value.trim()) return;

  savePrayer(box.value);

  box.classList.add("fade-out");

  setTimeout(() => {
    box.value = "";
    box.classList.remove("fade-out");
    document.getElementById("step4")?.classList.remove("hidden");

    loadPrayers();
  }, 2000);
}

function startSilence(seconds) {
  if (timerRunning) return;
  timerRunning = true;

  let timerDisplay = document.getElementById("timer");
  let time = seconds;

  let interval = setInterval(() => {
    if (timerDisplay) {
      timerDisplay.textContent = time + " seconds remaining";
    }

    time--;

    if (time < 0) {
      clearInterval(interval);
      if (timerDisplay) timerDisplay.textContent = "Time complete.";
      document.getElementById("end")?.classList.remove("hidden");
      timerRunning = false;
    }
  }, 1000);
}

/* Run only if prayer page elements exist */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("savedPrayers")) {
    loadPrayers();
  }
});
