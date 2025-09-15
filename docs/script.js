// Flow GitHub Pages - Interactive Features
// Modern JavaScript with ES6+ features

class FlowWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupCodeCopy();
        this.setupTabSwitching();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupThemeDetection();
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Handle scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-card, .step, .doc-card, .example-code');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupCodeCopy() {
        const copyButtons = document.querySelectorAll('.code-copy');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const codeBlock = button.closest('.code-block');
                const codeContent = codeBlock.querySelector('.code-content code') || 
                                  codeBlock.querySelector('.code-content');
                
                if (codeContent) {
                    try {
                        await navigator.clipboard.writeText(codeContent.textContent);
                        this.showCopyFeedback(button);
                    } catch (err) {
                        // Fallback for older browsers
                        this.fallbackCopyTextToClipboard(codeContent.textContent);
                        this.showCopyFeedback(button);
                    }
                }
            });
        });
    }

    async fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(button) {
        const originalContent = button.innerHTML;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.854 3.646C14.049 3.841 14.049 4.158 13.854 4.354L6.854 11.354C6.659 11.549 6.342 11.549 6.146 11.354L2.146 7.354C1.951 7.158 1.951 6.841 2.146 6.646C2.342 6.451 2.659 6.451 2.854 6.646L6.5 10.293L13.146 3.646C13.342 3.451 13.659 3.451 13.854 3.646Z" fill="currentColor"/>
            </svg>
        `;
        button.style.color = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.color = '';
        }, 2000);
    }

    setupTabSwitching() {
        // Examples tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // MCP Configuration tabs
        const configTabButtons = document.querySelectorAll('.config-tab');
        const configPanels = document.querySelectorAll('.config-panel');

        configTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetConfig = button.getAttribute('data-config');
                
                // Remove active class from all buttons and panels
                configTabButtons.forEach(btn => btn.classList.remove('active'));
                configPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding panel
                const targetPanel = document.getElementById(targetConfig);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close mobile nav when clicking on links
            const navLinkElements = navLinks.querySelectorAll('.nav-link');
            navLinkElements.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });

            // Close mobile nav when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupThemeDetection() {
        // Detect system theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for theme changes
        prefersDark.addEventListener('change', (e) => {
            this.updateTheme(e.matches);
        });
        
        // Initial theme detection
        this.updateTheme(prefersDark.matches);
    }

    updateTheme(isDark) {
        // This could be extended to add a theme toggle button
        // For now, we rely on CSS media queries
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    handleResize() {
        // Handle responsive behavior
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            this.handleMobileResize();
        } else {
            // Desktop-specific adjustments
            this.handleDesktopResize();
        }
    }

    handleMobileResize() {
        // Close mobile navigation if open
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    handleDesktopResize() {
        // Desktop-specific resize handling
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Add/remove scrolled class for header styling
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleKeyboardNavigation(e) {
        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    this.focusSearch();
                    break;
                case '/':
                    e.preventDefault();
                    this.showKeyboardShortcuts();
                    break;
            }
        }
        
        // Handle escape key
        if (e.key === 'Escape') {
            this.closeModals();
        }
    }

    focusSearch() {
        // This could be implemented if a search feature is added
        console.log('Search focus triggered');
    }

    showKeyboardShortcuts() {
        // This could show a modal with keyboard shortcuts
        console.log('Keyboard shortcuts triggered');
    }

    closeModals() {
        // Close any open modals or dropdowns
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    // Utility functions
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Terminal Animation
class TerminalAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupTerminalAnimation();
    }

    setupTerminalAnimation() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) return;

        // Add hover effect
        terminal.addEventListener('mouseenter', () => {
            terminal.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        terminal.addEventListener('mouseleave', () => {
            terminal.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg)';
        });

        // Animate terminal content on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTerminalContent();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(terminal);
    }

    animateTerminalContent() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0';
                line.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    line.style.transition = 'all 0.3s ease';
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, 100);
            }, index * 200);
        });
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.init();
    }

    init() {
        this.setupStatsAnimation();
    }

    setupStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStat(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateStat(element) {
        const target = element.textContent;
        const isNumeric = /^\d+/.test(target);
        
        if (isNumeric) {
            const finalNumber = parseInt(target.replace(/[^\d]/g, ''));
            const suffix = target.replace(/[\d]/g, '');
            
            this.countUp(element, 0, finalNumber, suffix, 2000);
        }
    }

    countUp(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Feature Cards Animation
class FeatureCardsAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupFeatureCardsAnimation();
    }

    setupFeatureCardsAnimation() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFeatureCard(entry.target);
                }
            });
        }, { threshold: 0.1 });

        featureCards.forEach(card => observer.observe(card));
    }

    animateFeatureCard(card) {
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('.feature-title');
        const description = card.querySelector('.feature-description');
        
        // Animate icon
        setTimeout(() => {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }, 100);
        
        // Animate title
        setTimeout(() => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 50);
        }, 200);
        
        // Animate description
        setTimeout(() => {
            description.style.opacity = '0';
            description.style.transform = 'translateY(20px)';
            description.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
        
        // Reset icon transform
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 500);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlowWebsite();
    new TerminalAnimation();
    new StatsCounter();
    new FeatureCardsAnimation();
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FlowWebsite, TerminalAnimation, StatsCounter, FeatureCardsAnimation };
}
