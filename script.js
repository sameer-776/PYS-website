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
                // Stop observing once animated so it doesn't repeat every time you scroll
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
            navMenu.classList.toggle('active');

            // Swap hamburger icon for an 'X' when open
            const isOpen = navMenu.classList.contains('active');
            mobileMenuBtn.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
            lucide.createIcons(); // Redraw the new icon
        });
    }

    // Auto-close menu when a link is clicked on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
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

    if (mysteryCard) {
        const mysteryTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = revealDate - now;

            if (distance <= 0) {
                // THE REVEAL HAS HAPPENED
                clearInterval(mysteryTimer);

                // Rewrite the card visually
                mysteryTitle.innerText = "Harry Potter Council";
                mysteryTitle.style.color = "var(--accent-gold)";
                mysteryDescText.innerText = "Magic, Politics, and the Wizarding World.";

                // Change Background to Hogwarts/Magic theme
                mysteryBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=1000')";
                mysteryBg.style.filter = "grayscale(0%) brightness(0.6)"; // Remove classified dark filter

                // Update the Data Attributes for the Mega-Modal
                mysteryCard.setAttribute('data-title', 'Harry Potter: Wizarding World Crisis');
                mysteryCard.setAttribute('data-desc', 'A fantasy crisis committee set in the wizarding world. Deliberate over magical laws, dark threats, wizarding relations, and the future of Hogwarts. Muggles need not apply.');
            } else {
                // UPDATE THE COUNTDOWN
                const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((distance % (1000 * 60)) / 1000);

                mysteryCountdownStr.innerText = `${d}d ${h}h ${m}m ${s}s`;
            }
        }, 1000);
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

    // Check Local Storage on Load
    if (localStorage.getItem('pys_theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons(); // Re-render the initial icon

    // Click Event
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        // Swap Icon
        themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        lucide.createIcons(); // Tell Lucide to redraw the new icon

        localStorage.setItem('pys_theme', isLight ? 'light' : 'dark');
    });

    // 5. NEW: Magnetic Button Micro-Interaction (Native Cursor Safe)
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate distance from center of button
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button slightly towards the cursor (magnet effect)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = "transform 0.1s ease-out"; // Snappy follow
        });

        btn.addEventListener('mouseleave', () => {
            // Snap back to original position
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"; // Smooth spring back
        });
    });

    // 6. NEW: Hype Engine Countdown Timer
    const countDownDate = new Date("July 4, 2026 09:00:00").getTime();

    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(updateTimer);
            document.getElementById("days").innerHTML = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zero
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

    // 7. NEW: FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
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
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.comm-card').forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.innerText = card.getAttribute('data-title');
            modalDesc.innerHTML = card.getAttribute('data-desc');

            modal.style.display = 'flex';
            requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('show')));
        });
    });
    // --- 10. DYNAMIC TAB TITLE (FOMO EFFECT) ---
    let originalTitle = document.title;
    window.addEventListener("blur", () => {
        document.title = "Return to the Summit • PYS '26"; 
    });
    window.addEventListener("focus", () => {
        document.title = originalTitle;
    });
    
    // --- 11. DEVELOPER EASTER EGG ---
    console.log(
        "%c PYS 1.0 Core Systems Online. \n%c Developed by Sameer Beniwal. \n Welcome to the Summit, Delegate.", 
        "color: #E5C07B; font-size: 16px; font-weight: bold; font-family: monospace;", 
        "color: #888888; font-size: 12px; font-family: monospace;"
    );
    // --- 3D CARD TILT EFFECT ---
    const cards = document.querySelectorAll('.comm-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; 
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
    });

    closeBtn.addEventListener('click', triggerClose);
    window.closeModal = triggerClose; // For the button inside modal
    window.addEventListener('click', (e) => { if (e.target === modal) triggerClose(); });
});
// --- BULLETPROOF MODAL CLOSING LOGIC ---
    // Making it global so the HTML onclick="" can see it
    window.closeModal = function() {
        const modal = document.getElementById('committee-modal');
        if (modal) {
            modal.style.display = 'none'; 
            document.body.style.overflow = 'auto'; // Turns background scrolling back on
        }
    };

    // Failsafe: Manually attach the close function to the X button
    document.addEventListener('DOMContentLoaded', () => {
        const closeBtn = document.querySelector('.modal-sticky-header .close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeModal);
        }
    });