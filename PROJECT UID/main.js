// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Simple cart count functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');

// This would be more complex in a real app
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Show a quick notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Item added to cart!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    }
});

// Simple image slider for offers
const offerSlider = document.querySelector('.offer-slider');
let isDown = false;
let startX;
let scrollLeft;

offerSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - offerSlider.offsetLeft;
    scrollLeft = offerSlider.scrollLeft;
});

offerSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

offerSlider.addEventListener('mouseup', () => {
    isDown = false;
});

offerSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - offerSlider.offsetLeft;
    const walk = (x - startX) * 2;
    offerSlider.scrollLeft = scrollLeft - walk;
});

// Add notification style dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--success-color);
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);