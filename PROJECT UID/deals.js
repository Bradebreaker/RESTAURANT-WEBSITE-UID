// Deals Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();

    // Add deal to cart functionality
    document.querySelectorAll('.add-deal-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const dealCard = this.closest('.deal-card');
            const dealId = this.getAttribute('data-deal-id');
            const dealName = dealCard.querySelector('h3').textContent;
            const dealPrice = parseFloat(dealCard.querySelector('.discounted-price').textContent.replace('₹', ''));
            const dealImage = dealCard.querySelector('img').src;
            
            addToCart({
                id: dealId,
                name: dealName,
                price: dealPrice,
                quantity: 1,
                image: dealImage,
                isDeal: true
            });
            
            showNotification(`${dealName} added to cart!`);
            
            this.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
    });

    // Add combo to cart functionality
    document.querySelectorAll('.add-combo-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const comboCard = this.closest('.combo-card');
            const comboId = this.getAttribute('data-combo-id');
            const comboName = comboCard.querySelector('h3').textContent;
            const comboPrice = parseFloat(comboCard.querySelector('.combo-price').textContent.replace('₹', ''));
            const comboImage = comboCard.querySelector('img').src;
            
            addToCart({
                id: comboId,
                name: comboName,
                price: comboPrice,
                quantity: 1,
                image: comboImage,
                isCombo: true
            });
            
            showNotification(`${comboName} added to cart!`);
            
            this.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
    });

    // Add item to cart function
    function addToCart(item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(item);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    // Update cart count in header
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalCount;
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'deals-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .deals-notification {
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
        .deals-notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});