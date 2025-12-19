// IMAGE SLIDER
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 3000);
}

// SCROLL ANIMATION
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// CONTACT FORM VALIDATION
const form = document.getElementById("contactForm");
if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formMsg = document.getElementById("formMsg");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            formMsg.textContent = "Please fill all fields";
            formMsg.style.color = "red";
        } else {
            formMsg.textContent = "Message sent successfully!";
            formMsg.style.color = "green";
            this.reset();
        }
    });
}

// DARK MODE
const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            toggleBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.textContent = "🌙";
        }
    });
}

// TYPING ANIMATION (YOUR INFO)
const typingText = document.getElementById("typing");

if (typingText) {
    const texts = [
        "Computer Engineering Student",
        "Passionate about Web Development",
        "Love Drawing and Sketching"
    ];

    let textIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < texts[textIndex].length) {
            typingText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 2000);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();
}


const timelineItems = document.querySelectorAll(".timeline-item");

function revealTimeline() {
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealTimeline);
revealTimeline();

const rows = document.querySelectorAll(".timeline-row");

function revealTimelineAdvanced() {
    rows.forEach(row => {
        const top = row.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            row.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealTimelineAdvanced);
revealTimelineAdvanced();


// INTERACTIVE BACKGROUND PARTICLES
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero-canvas").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            this.x -= dx / 20;
            this.y -= dy / 20;
        }
    }

    draw() {
        ctx.fillStyle = "#6c7cff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) { // distance threshold for lines
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108, 124, 255, ${1 - distance / 120})`; // fade with distance
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();







