// Theme toggle functionality
class ThemeToggle {
    constructor() {
        this.initTheme();
        this.bindEvents();
    }

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

    bindEvents() {
        // Wait for DOM to be loaded before binding events
        document.addEventListener('DOMContentLoaded', () => {
            const toggleButton = document.querySelector('.theme-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    this.toggleTheme();
                });
            }
        });

        // If DOM is already loaded, bind immediately
        if (document.readyState === 'loading') {
            // DOM hasn't finished loading yet
        } else {
            // DOM is already loaded
            const toggleButton = document.querySelector('.theme-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    this.toggleTheme();
                });
            }
        }
    }
}

// Initialize theme toggle
const themeToggle = new ThemeToggle();
