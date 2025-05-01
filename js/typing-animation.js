class TypingAnimation {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000,
            ...options
        };
        
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentCharIndex--;
            this.element.textContent = currentWord.substring(0, this.currentCharIndex);
        } else {
            this.currentCharIndex++;
            this.element.textContent = currentWord.substring(0, this.currentCharIndex);
        }
        
        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            this.isDeleting = true;
            typeSpeed = this.options.delayBetweenWords;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
        this.type();
    }
}

// Initialize the typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = [
            'Marketing',
            'Content',
            'Social Media',
            'Brand',
            'Digital Presence'
        ];
        
        new TypingAnimation(typingText, words, {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000
        });
    }
}); 