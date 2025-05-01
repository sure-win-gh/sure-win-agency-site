// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scroll Down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scroll Up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Form Submission Handler
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = subscribeForm.querySelector('input[type="email"]');
            if (email) {
                console.log('Subscribed email:', email.value);
                alert('Thank you for subscribing!');
                subscribeForm.reset();
            }
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('#name')?.value,
                email: contactForm.querySelector('#email')?.value,
                company: contactForm.querySelector('#company')?.value,
                service: contactForm.querySelector('#service')?.value,
                message: contactForm.querySelector('#message')?.value
            };

            console.log('Form submitted:', formData);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Form Input Validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                }
            });
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .about-grid');
        if (elements.length > 0) {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.classList.add('animate');
                }
            });
        }
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const answer = otherItem.querySelector('.faq-answer');
                            if (answer) {
                                answer.style.maxHeight = '0';
                            }
                        }
                    });
                    
                    // Toggle current item
                    const isActive = item.classList.contains('active');
                    const answer = item.querySelector('.faq-answer');
                    
                    if (isActive) {
                        item.classList.remove('active');
                        if (answer) {
                            answer.style.maxHeight = '0';
                        }
                    } else {
                        item.classList.add('active');
                        if (answer) {
                            answer.style.maxHeight = '500px';
                        }
                    }
                });
            }
        });
    }
}); 