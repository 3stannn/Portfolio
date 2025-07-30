// Portfolio JavaScript Functionality
class Portfolio {
    constructor() {
        this.initTheme();
        this.initNavigation();
        this.initAnimations();
        this.initFormHandling();
        this.initScrollEffects();
        this.bindEvents();
    }

    // Theme toggle functionality
    initTheme() {
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateToggleButton(theme);
    }

    updateToggleButton(theme) {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            const icon = toggleButton.querySelector('.icon');
            const text = toggleButton.querySelector('.text');
            
            if (theme === 'light') {
                icon.textContent = '🌙';
                text.textContent = 'Dark';
            } else {
                icon.textContent = '☀️';
                text.textContent = 'Light';
            }
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    // Navigation functionality
    initNavigation() {
        this.setActiveNavItem();
    }

    setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar ul li a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'home.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Animation effects
    initAnimations() {
        this.observeElements();
    }

    observeElements() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animatedElements = document.querySelectorAll(`
            .project-item, .review-item, .skill-card, .interest-item, 
            .value-item, .skill-category, .timeline-item, .stat-item
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Form handling
    initFormHandling() {
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (this.validateForm(data)) {
            this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            this.showMessage('Please fill in all required fields correctly.', 'error');
        }
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return data.name && 
               data.name.trim().length > 0 &&
               data.email && 
               emailRegex.test(data.email) &&
               data.subject && 
               data.subject.trim().length > 0 &&
               data.message && 
               data.message.trim().length > 10;
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Insert message after form
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(messageEl, form.nextSibling);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }
    }

    // Scroll effects
    initScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for navbar styling
            if (scrollTop > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Skill tag interactions
    initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    tag.style.animation = '';
                }, 300);
            });
        });
    }

    // Smooth scrolling for anchor links
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Loading animation
    showPageLoadAnimation() {
        const content = document.querySelector('.main-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Typing effect for hello text
    initTypingEffect() {
        const helloElement = document.querySelector('.hello h1');
        if (helloElement) {
            const text = helloElement.textContent;
            helloElement.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    helloElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    }

    // Bind all events
    bindEvents() {
        // Wait for DOM to be loaded before binding events
        document.addEventListener('DOMContentLoaded', () => {
            this.bindThemeToggle();
            this.initSkillTags();
            this.initSmoothScrolling();
            this.showPageLoadAnimation();
            this.initTypingEffect();
        });

        // If DOM is already loaded, bind immediately
        if (document.readyState === 'loading') {
            // DOM hasn't finished loading yet
        } else {
            this.bindThemeToggle();
            this.initSkillTags();
            this.initSmoothScrolling();
            this.showPageLoadAnimation();
            this.initTypingEffect();
        }
    }

    bindThemeToggle() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
}

// Initialize portfolio functionality
const portfolio = new Portfolio();
