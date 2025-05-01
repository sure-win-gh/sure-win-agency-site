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

            // No need for click event listeners - let the browser handle navigation naturally

        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
}); 