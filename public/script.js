// Modern Interactions Script

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Logic ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                toggleMenu();
            }
        });
    });

    // --- Smooth Scroll for anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Intersection Observer for Reveals ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class
                entry.target.classList.add('active');
                // Optional: unobserve after revealing if you only want it to happen once
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Simple JS "AOS-like" load animations for Hero ---
    const heroElements = document.querySelectorAll('[data-aos]');
    heroElements.forEach(el => {
        const delay = el.getAttribute('data-aos-delay') || 0;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// --- Copy PIX Key Logic ---
function copyPixKey() {
    const keyText = "28.730.620/0001-03";
    navigator.clipboard.writeText(keyText).then(() => {
        const btn = document.querySelector('.copy-btn');
        const span = btn.querySelector('span');
        const icon = btn.querySelector('i');
        
        const originalText = span.innerText;
        const originalIcon = icon.className;
        
        span.innerText = "Copiado!";
        icon.className = "fa-solid fa-check";
        btn.classList.add('copied');
        
        setTimeout(() => {
            span.innerText = originalText;
            icon.className = originalIcon;
            btn.classList.remove('copied');
        }, 2000);
    });
}
