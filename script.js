// ============================================
// RAIN EFFECT - Blade Runner 2049
// ============================================
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class RainDrop {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 18 + 8;
        this.speed = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.15 + 0.03;
        this.wind = Math.random() * 0.5 - 0.1;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * 2, this.y + this.length);
        ctx.strokeStyle = `rgba(255, 179, 186, ${this.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
}

const raindrops = [];
for (let i = 0; i < 150; i++) {
    raindrops.push(new RainDrop());
}

// Floating dust particles
class DustParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        this.opacity = (Math.sin(this.pulse) + 1) * 0.1 + 0.03;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 179, 186, ${this.opacity})`;
        ctx.fill();
    }
}

const dustParticles = [];
for (let i = 0; i < 60; i++) {
    dustParticles.push(new DustParticle());
}

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rain
    raindrops.forEach(drop => {
        drop.update();
        drop.draw();
    });

    // Draw dust
    dustParticles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateRain);
}

animateRain();

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriterText = "I'm a Computer Science graduate who loves turning ideas into real web apps. I build stuff with Python, JavaScript, React.js, and Node.js -- and I'm always learning something new.";
const typewriterEl = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        typewriterEl.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 30);
    }
}

// Start typewriter after a short delay
setTimeout(typeWriter, 1500);

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const fadeElements = document.querySelectorAll(
    '.skill-category, .project-card, .edu-card, .contact-card, .experience-card, .about-terminal'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered delay
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ============================================
// RESIZE RAIN CANVAS ON SCROLL
// ============================================
let resizeTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newHeight = document.documentElement.scrollHeight;
        if (canvas.height !== newHeight) {
            canvas.height = newHeight;
        }
    }, 200);
});
