document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded successfully");

    /* ========================================= */
    /* 1. MOBILE MENU (PRIORITY)                 */
    /* ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        console.log("Menu elements found"); // Debugging check

        // Toggle menu on click
       menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    navLinks.classList.toggle('active');
    
    menuToggle.classList.toggle('open');  // <--- ADD THIS LINE HERE
    
    console.log("Menu clicked, active class toggled");
});

        // Close menu when clicking anywhere else on the screen
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when a link inside it is clicked
        navLinks.querySelectorAll('li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.error("Mobile menu elements NOT found. Check IDs in HTML.");
    }

    /* ========================================= */
    /* 2. NAVBAR LOGIC                           */
    /* ========================================= */
    const navbar = document.querySelector('.navbar');
    const scrollContainer = document.querySelector('.scroll-container');
    
    // Determine what is scrolling (the container or the window)
    const scroller = scrollContainer || window;
    let lastScrollTop = 0;

    scroller.addEventListener('scroll', function () {
        const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;

        if (scrollTop > lastScrollTop && scrollTop > 50) {
            if (navbar) navbar.classList.add('hidden');
        } else {
            if (navbar) navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });

    /* ========================================= */
    /* 3. ACTIVE LINK HIGHLIGHTING               */
    /* ========================================= */
    const pageMap = {
        'index.html': 'Home',
        'contact.html': 'Work with us',
        'services.html': 'Services'
    };
    
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === "") currentPage = "index.html";
    const activeText = pageMap[currentPage];
    
    if (activeText) {
        document.querySelectorAll('.navbar li a').forEach(link => {
            if (link.textContent.trim() === activeText) {
                link.classList.add('active');
            }
        });
    }

    /* ========================================= */
    /* 4. SCROLL INDICATOR (Arrow Button)        */
    /* ========================================= */
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const target = scrollContainer || window;
            const scrollAmount = window.innerHeight;
            
            if (target.scrollBy) {
                target.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            } else {
                window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
        });
    }

    /* ========================================= */
    /* 5. CUSTOM CURSOR (Last Priority)          */
    /* ========================================= */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('a, button, input, textarea, .menu-toggle').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});