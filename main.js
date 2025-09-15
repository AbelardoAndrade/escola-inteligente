import { gsap } from 'gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.2/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Register both plugins

// Animate features on scroll
gsap.utils.toArray('.feature, .security-item, .learning-item, .app-feature').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top bottom+=100", // Start animation when item is 100px from bottom
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1 // Stagger animation for multiple items
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetId,
                offsetY: document.querySelector('nav').offsetHeight // Offset for fixed header
            },
            ease: "power2.out"
        });
    });
});

// Modal for CTA button
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    alert('Obrigado pelo seu interesse! Em breve, nosso formulário de agendamento estará disponível. Entre em contato pelo nosso email ou telefone para mais informações.');
});

// Toggle details functionality for cards
document.querySelectorAll('.feature, .security-item, .learning-item, .app-feature').forEach(card => {
    // Make the header (h3 or h4) the primary click target for toggling
    const clickableArea = card.querySelector('h3') || card.querySelector('h4');
    const details = card.querySelector('.details');

    if (clickableArea && details) {
        clickableArea.style.cursor = 'pointer'; // Visual cue for interaction

        clickableArea.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling if card has other click handlers
            card.classList.toggle('active');
            details.classList.toggle('active');
        });

        // Also make the whole card clickable for broader target, but prioritize header
        card.addEventListener('click', (event) => {
            // Only toggle if the click wasn't specifically on the header itself (already handled)
            if (event.target !== clickableArea && !clickableArea.contains(event.target)) {
                card.classList.toggle('active');
                details.classList.toggle('active');
            }
        });
    }
});

// Hamburger menu toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Toggle class for hamburger icon animation
    });

    // Close menu when a navigation link is clicked
    document.querySelectorAll('.nav-links a, .nav-links .cta-button').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}