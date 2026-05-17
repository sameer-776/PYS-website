document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // --- STAT COUNTER ANIMATION ---
    const statObservers = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const speed = 100; // Lower is faster
                const inc = target / speed;

                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count) + "+";
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target + "+";
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        statObservers.observe(counter);
    });

    // --- MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanding = !navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA for accessibility
            mobileMenuBtn.setAttribute('aria-expanded', isExpanding);

            // Swap hamburger icon for an 'X' when open
            mobileMenuBtn.innerHTML = `<i data-lucide="${isExpanding ? 'x' : 'menu'}"></i>`;
            lucide.createIcons();
        });
    }

    // Auto-close menu when a link is clicked on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            }
        });
    });

    // --- MYSTERY COMMITTEE REVEAL LOGIC ---
    // Target: May 11, 2026, 11:11:11 AM
    const revealDate = new Date("May 11, 2026 11:11:11+05:30").getTime();

    const mysteryCard = document.getElementById('mystery-card');
    const mysteryTitle = document.getElementById('mystery-title');
    const mysteryCountdownStr = document.getElementById('mystery-countdown');
    const mysteryDescText = document.getElementById('mystery-desc');
    const mysteryBg = document.getElementById('mystery-bg');

    // Logic Function to trigger the reveal styling
    const triggerMysteryReveal = () => {
        mysteryTitle.innerText = "Harry Potter Council";
        mysteryTitle.style.color = "var(--accent-primary)";
        mysteryDescText.innerText = "Magic, Politics, and the Wizarding World.";
        mysteryBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1000')";
        mysteryBg.style.filter = "grayscale(0%) brightness(0.6)"; 
        mysteryCard.setAttribute('data-title', 'Harry Potter: Wizarding World Crisis');
        mysteryCard.setAttribute('data-desc', 'A fantasy crisis committee set in the wizarding world. Deliberate over magical laws, dark threats, wizarding relations, and the future of Hogwarts. Muggles need not apply.');
    };

    if (mysteryCard) {
        // Immediate check on load incase date is already past
        if (new Date().getTime() >= revealDate) {
            triggerMysteryReveal();
        } else {
            const mysteryTimer = setInterval(() => {
                const now = new Date().getTime();
                const distance = revealDate - now;

                if (distance <= 0) {
                    clearInterval(mysteryTimer);
                    triggerMysteryReveal();
                } else {
                    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const s = Math.floor((distance % (1000 * 60)) / 1000);
                    mysteryCountdownStr.innerText = `${d}d ${h}h ${m}m ${s}s`;
                }
            }, 1000);
        }
    }


    // 2. Preloader Logic
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('active'));
        }, 1000);
    }, 2000);

    // 3. Navbar Scroll & Smooth Lazy Links
    const nav = document.querySelector('.premium-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
            }
        });
    });

    // 4. Dark/Light Theme Toggle 
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    const body = document.body;

    if (localStorage.getItem('pys_theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons(); 

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        lucide.createIcons(); 
        localStorage.setItem('pys_theme', isLight ? 'light' : 'dark');
    });

    // 5. Magnetic Button Micro-Interaction 
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = "transform 0.1s ease-out"; 
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"; 
        });
    });

    // 6. Hype Engine Countdown Timer
    const countDownDate = new Date("July 4, 2026 09:00:00").getTime();
    
    // Performance improvement: Cache DOM elements
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(updateTimer);
            if(daysEl) daysEl.innerHTML = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if(hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if(minsEl) minsEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if(secsEl) secsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 8. Scroll Reveal Observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // 9. Bulletproof Modal Logic
    const modal = document.getElementById('committee-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    document.querySelectorAll('.comm-card').forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.innerText = card.getAttribute('data-title');
            modalDesc.innerHTML = card.getAttribute('data-desc');

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Stop background scroll
            requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('show')));
        });
    });

    // 10. DYNAMIC TAB TITLE (FOMO EFFECT)
    let originalTitle = document.title;
    window.addEventListener("blur", () => {
        document.title = "Return to the Summit • PYS '26"; 
    });
    window.addEventListener("focus", () => {
        document.title = originalTitle;
    });
    
    // 11. DEVELOPER EASTER EGG
    console.log(
        "%c PYS 1.0 Core Systems Online. \n%c Developed by Sameer Beniwal. \n Welcome to the Summit, Delegate.", 
        "color: #F9A1D1; font-size: 16px; font-weight: bold; font-family: monospace;", 
        "color: #A1C4F0; font-size: 12px; font-family: monospace;"
    );

    // 12. 3D CARD TILT EFFECT
    const cards = document.querySelectorAll('.comm-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; 
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
    });

    // --- BULLETPROOF MODAL CLOSING LOGIC ---
    window.closeModal = function() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none'; 
                document.body.style.overflow = 'auto'; 
            }, 300); // Wait for fade out
        }
    };

    const closeBtn = document.querySelector('.modal-sticky-header .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', window.closeModal);
    }
    
    window.addEventListener('click', (e) => { 
        if (e.target === modal) window.closeModal(); 
    });
    
    // Allow ESC key to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            window.closeModal();
        }
    });
});