const scrollContainer = document.querySelector('.scroll-container');

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
        scrollContainer.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Hide/show navbar on scroll
let lastScrollTop = 0;
scrollContainer.addEventListener('scroll', function () {
    const scrollTop = scrollContainer.scrollTop;
    const navbar = document.querySelector('.navbar');
    if (scrollTop > lastScrollTop && scrollTop > 50) { // hide on scroll down, after 50px
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

document.querySelectorAll('.navbar li').forEach(li => {
    li.addEventListener('click', function () {
        const text = this.textContent;
        if (text === 'Contact') {
            window.location.href = 'contact.html';
        } else if (text === 'Home') {
            window.location.href = 'index.html';
        } else if (text === 'Services') {
            window.location.href = 'services.html';
        }
    });
});

// Set active navbar item based on current page
const pageMap = {
    'index.html': 'Home',
    'contact.html': 'Contact',
    'services.html': 'Services'
};

const currentPage = window.location.pathname.split('/').pop();
const activeText = pageMap[currentPage];
if (activeText) {
    document.querySelectorAll('.navbar li').forEach(li => {
        li.classList.remove('active');
        if (li.textContent === activeText) {
            li.classList.add('active');
        }
    });
}

// Pro Plan Modal Functions
function openProModal() {
    const modal = document.getElementById('proModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProModal() {
    const modal = document.getElementById('proModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Starter Plan Modal Functions
function openStarterModal() {
    const modal = document.getElementById('starterModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeStarterModal() {
    const modal = document.getElementById('starterModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function (event) {
    const proModal = document.getElementById('proModal');
    const starterModal = document.getElementById('starterModal');
    if (event.target === proModal) {
        closeProModal();
    }
    if (event.target === starterModal) {
        closeStarterModal();
    }
}

// Handle Pro Plan form submission
document.getElementById('proForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('proName').value;
    const email = document.getElementById('proEmail').value;
    const idea = document.getElementById('proIdea').value;

    // Create WhatsApp message with form data
    const message = `Hi! I'm ${name} (${email}). I'm interested in the Pro plan (₹9,999). My website idea: ${idea}. Can we schedule a free consultation call?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919466745730?text=${encodedMessage}`;

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');

    // Close the modal
    closeProModal();

    // Reset form
    this.reset();
});

// Handle Starter Plan form submission
document.getElementById('starterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('starterName').value;
    const email = document.getElementById('starterEmail').value;
    const idea = document.getElementById('starterIdea').value;

    // Create WhatsApp message with form data
    const message = `Hi! I'm ${name} (${email}). I'm interested in the Starter plan (₹4,999). My website idea: ${idea}. Can we schedule a free consultation call?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919466745730?text=${encodedMessage}`;

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');

    // Close the modal
    closeStarterModal();

    // Reset form
    this.reset();
});