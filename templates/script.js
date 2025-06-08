    // ==================== JAVASCRIPT FUNCTIONALITY ====================
    
    // Loading Screen
    window.addEventListener('load', function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Scroll Indicator
    window.addEventListener('scroll', function() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Team Member Card Animations
    const teamMembers = document.querySelectorAll('.team-member');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(member);
    });

    // Gallery Item Interactions
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Dynamic Background Animation
    function createFloatingElements() {
        const header = document.querySelector('.header');
        for (let i = 0; i < 50; i++) {
            const element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.width = Math.random() * 4 + 1 + 'px';
            element.style.height = element.style.width;
            element.style.background = 'rgba(255, 215, 0, 0.3)';
            element.style.borderRadius = '50%';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
            element.style.animationDelay = Math.random() * 6 + 's';
            header.appendChild(element);
        }
    }

    // Add floating animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            25% { transform: translateY(-20px) rotate(90deg); opacity: 0.6; }
            50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
            75% { transform: translateY(-20px) rotate(270deg); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);

    createFloatingElements();

    // CTA Button Effect
    document.querySelector('.cta-button').addEventListener('mouseover', function() {
        this.style.background = 'linear-gradient(45deg, #ffd700, #fff)';
    });

    document.querySelector('.cta-button').addEventListener('mouseout', function() {
        this.style.background = '#ffd700';
    });

    // Contact Form Animation (if needed in future)
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #ffd700';
            this.style.paddingLeft = '1.3rem';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
            this.style.paddingLeft = '1.5rem';
        });
    });

    // Easter Egg: Konami Code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'rainbow 2s ease infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                    konamiIndex = 0;
                }, 10000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Parallax Effect for Header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic Text Animation
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    // Initialize typing animation for tagline after page load
    setTimeout(() => {
        const tagline = document.querySelector('.tagline');
        const originalText = tagline.textContent;
        typeWriter(tagline, originalText, 30);
    }, 2000);

    // Mobile Menu Toggle (for future enhancement)
    let isMobile = window.innerWidth <= 768;
    
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            document.querySelector('.nav-content').style.display = 'flex';
        }
    });

    // Performance optimization - Lazy loading for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        galleryObserver.observe(item);
    });

    // Social link hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-item, .cta-button, .social-link {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply ripple effect to interactive elements
    document.querySelectorAll('.nav-item, .cta-button, .social-link').forEach(element => {
        element.addEventListener('click', createRipple);
    });

    // Mouse trail effect
    let mouseTrail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > trailLength) {
            mouseTrail.shift();
        }
        
        updateMouseTrail();
    });

    function updateMouseTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(trail => trail.remove());
        
        mouseTrail.forEach((point, index) => {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: radial-gradient(circle, rgba(255,215,0,${(index + 1) / trailLength}), transparent);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9998;
                transition: opacity 0.1s ease;
            `;
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.style.opacity = '0';
                    setTimeout(() => {
                        if (trail.parentNode) {
                            trail.remove();
                        }
                    }, 100);
                }
            }, 100);
        });
    }

    // Console easter egg
    console.log(`
    🎉 SSC Dev Hack - Congratulations on finding this easter egg! 🎉
    
    Built with ❤️ by the SSC Team
    Colors used: #3e1863, #6a3093, #ffd700, #fffbe7
    
    Want to join our team? Contact us! 🚀
    `);

    // Final initialization
    console.log('SSC Dev Hack website fully loaded! 🎊');

