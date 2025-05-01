// Navigation Component
class Navigation {
    static init() {
        try {
            // Get the base path of the site
            const basePath = window.location.pathname.includes('sure-win-agency-site') 
                ? '/sure-win-agency-site/' 
                : '/';

            const navigationHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <a href="${basePath}" class="logo">
                            <img src="${basePath}images/logo.png" alt="The Sure Win Agency Logo" style="height: 40px; width: auto;">
                        </a>
                        <div class="nav-links">
                            <a href="${basePath}services">What We Do</a>
                            <a href="${basePath}resources">Resources</a>
                            <a href="${basePath}faq">FAQ</a>
                            <a href="${basePath}contact" class="cta-button">Get In Touch</a>
                        </div>
                        <button class="mobile-menu-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            `;

            // Insert navigation at the start of the body
            document.body.insertAdjacentHTML('afterbegin', navigationHTML);

            // Add event listeners for navigation links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    window.location.href = href;
                });
            });

            // Add event listener for logo
            document.querySelector('.logo').addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `${basePath}`;
            });

        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
}); 