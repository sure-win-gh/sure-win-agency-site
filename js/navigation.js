// Navigation Component
class Navigation {
    static init() {
        try {
            // Get the base path of the site
            const basePath = window.location.hostname === 'localhost' ? '/Documents/Cursor/sure-win-agency-site/' : 
                           window.location.pathname.includes('sure-win-agency-site') ? '/sure-win-agency-site/' : '/';

            // Function to create URL with proper extension
            const createUrl = (path) => {
                // If the path is empty, return the base path
                if (!path) return basePath;
                
                // Check if we're in local development
                if (window.location.hostname === 'localhost') {
                    return `${basePath}${path}.html`;
                }
                
                // For production, use clean URLs
                return `${basePath}${path}`;
            };

            const navigationHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <a href="${createUrl('')}" class="logo">
                            <img src="${basePath}images/logo.png" alt="The Sure Win Agency Logo" style="height: 40px; width: auto;">
                        </a>
                        <div class="nav-links">
                            <a href="${createUrl('services')}">What We Do</a>
                            <a href="${createUrl('resources')}">Resources</a>
                            <a href="${createUrl('faq')}">FAQ</a>
                            <a href="${createUrl('contact')}" class="cta-button">Get In Touch</a>
                        </div>
                        <button class="mobile-menu-btn" aria-label="Toggle mobile menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            `;

            const footerHTML = `
                <footer class="footer">
                    <div class="container">
                        <div class="footer-grid">
                            <div class="footer-info">
                                <h3>The Sure Win Agency</h3>
                                <p>We turn content into conversations.</p>
                            </div>
                            <div class="footer-links">
                                <h4>Quick Links</h4>
                                <a href="${createUrl('')}">Home</a>
                                <a href="${createUrl('about')}">About</a>
                                <a href="${createUrl('services')}">Services</a>
                                <a href="${createUrl('contact')}">Contact</a>
                            </div>
                            <div class="footer-contact">
                                <h4>Contact Us</h4>
                                <p>Email: hello@thesurewinagency.com</p>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2024 The Sure Win Agency. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;

            // Insert navigation at the start of the body
            document.body.insertAdjacentHTML('afterbegin', navigationHTML);

            // Insert footer at the end of the body
            document.body.insertAdjacentHTML('beforeend', footerHTML);

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            if (mobileMenuBtn && navLinks) {
                // Toggle mobile menu
                const toggleMenu = (e) => {
                    if (e) e.stopPropagation();
                    mobileMenuBtn.classList.toggle('active');
                    navLinks.classList.toggle('active');
                };

                // Add click event listener to mobile menu button
                mobileMenuBtn.addEventListener('click', toggleMenu);

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (navLinks.classList.contains('active') && 
                        !mobileMenuBtn.contains(e.target) && 
                        !navLinks.contains(e.target)) {
                        toggleMenu();
                    }
                });

                // Close menu when clicking a link
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navLinks.classList.contains('active')) {
                            toggleMenu();
                        }
                    });
                });

                // Close menu on window resize if open
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            }

        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
}); 