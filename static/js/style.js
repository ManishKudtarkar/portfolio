// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupTypingAnimation();
    setupParticles();
    setupSkillBars();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupCounterAnimation();
}

// Navigation
function setupNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinkItems = document.querySelectorAll(".nav-link");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            navToggle.classList.toggle("active");
            document.body.classList.toggle("nav-open");
        });

        // Close nav when clicking on a link
        navLinkItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.classList.remove("active");
                document.body.classList.remove("nav-open");
            });
        });

        // Close nav when clicking outside
        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("open");
                navToggle.classList.remove("active");
                document.body.classList.remove("nav-open");
            }
        });
    }

    // Active nav link highlighting
    const currentPath = window.location.pathname;
    navLinkItems.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector(".site-header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        lastScrollY = currentScrollY;
    });
}

// Typing Animation
function setupTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const roles = [
        'Big Data Analytics Engineer',
        'Python Backend Developer',
        'Machine Learning Enthusiast',
        'Data Pipeline Architect',
        'Full-Stack Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next role
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();
}

// Particles Background
function setupParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Skill Progress Bars
function setupSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.setProperty('--progress', progress + '%');
        }
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = progressBar.style.getPropertyValue('--progress');
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.skill-card, .project-card, .section-header, .highlight-item, .about-card, .contact-card, .tech-category-card'
    );
    elementsToObserve.forEach(el => observer.observe(el));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(setupScrollEffects, 10);
window.addEventListener('scroll', debouncedScroll);

// Animated Counter for Hero Stats
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    counter.textContent = current + '+';
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Theme is fixed to professional light mode
