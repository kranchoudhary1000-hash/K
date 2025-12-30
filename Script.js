/* ===== ELEMENTS ===== */
const loader = document.getElementById("loader");
const app = document.getElementById("app");
const chat = document.getElementById("chat");
const statusText = document.getElementById("status");
const proposal = document.getElementById("proposal");
const finalScreen = document.getElementById("final");
const music = document.getElementById("music");
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

/* ===== CANVAS SETUP ===== */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ===== LOADER FIX ===== */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
    app.classList.remove("hidden");
    startChat();
  }, 2000);
});

/* ===== CHAT DATA ===== */
const messages = [
  "Hey 👋",
  "Tum online ho?",
  "Mujhe tumse kuch kehna tha…",
  "Kaafi time se soch raha hoon 🤍",
  "Tumhari smile sabse cute hai 😍",
  "Tum meri life ko special bana deti ho ✨",
  "Aur haan…",
  "I really like you ❤️"
];

let msgIndex = 0;

/* ===== CHAT FUNCTIONS ===== */
function setTyping(on) {
  statusText.innerText = on ? "typing..." : "online";
}

function addMessage(text) {
  const msg = document.createElement("div");
  msg.className = "msg me";
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function startChat() {
  if (msgIndex < messages.length) {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      addMessage(messages[msgIndex]);
      msgIndex++;
      setTimeout(startChat, 1200);
    }, 700);

  } else {
    // chat finished → show proposal
    setTimeout(() => {
      proposal.classList.remove("hidden");
    }, 1200);
  }
}

/* ===== YES BUTTON ===== */
function yes() {
  proposal.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  // music allowed only after user click
  if (music) {
    music.volume = 0.6;
    music.play().catch(() => {});
  }

  startFireworks();
}

/* ===== FIREWORKS EFFECT ===== */
let particles = [];

function startFireworks() {
  setInterval(() => {
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 3 + 1,
        dx: Math.random() * 6 - 3,
        dy: Math.random() * 6 - 3,
        life: 100
      });
    }
  }, 400);
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,0,150,0.8)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    p.r *= 0.98;

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

/* ===== OPTIONAL: SAFETY ===== */
// prevent errors if YES clicked multiple times
window.yes = yes;
