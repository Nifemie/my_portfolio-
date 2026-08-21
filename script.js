document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileNav.style.display === 'none' || !mobileNav.style.display;
            mobileNav.style.display = isHidden ? 'block' : 'none';
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isHidden ? 'ri-close-line' : 'ri-menu-line';
            }
        });
        
        // Close menu on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'ri-menu-line';
            });
        });
    }

    // 2. Active Scroll Spy Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // 3. Project Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 4. Contact form submit state
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
        });
    }

    // 5. Skills progress animation when visible
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    
    function animateSkills() {
        progressFills.forEach(fill => {
            const val = fill.getAttribute('data-value');
            fill.style.width = val + '%';
        });
    }
    
    // Check viewport visibility
    function checkSkillsVisibility() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom >= 0;
            if (visible) {
                animateSkills();
                window.removeEventListener('scroll', checkSkillsVisibility);
            }
        }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility();

    // 6. Scroll reveal animations
    const revealTargets = document.querySelectorAll(
        '.section .section-title, .section .section-desc, .about-card-stat, .skill-badge, .project-card, .progress-card, .contact-form, .contact-info, .info-item, .social-btn'
    );

    revealTargets.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index * 80, 400)}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(element => revealObserver.observe(element));
});
