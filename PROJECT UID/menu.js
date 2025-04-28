// Menu Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Category Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });

            if (category !== 'all') {
                const categorySection = document.getElementById(category);
                if (categorySection) {
                    window.scrollTo({
                        top: categorySection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add to cart functionality (UPDATED with ID)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.menu-item');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = parseFloat(item.querySelector('.item-price').textContent.replace('₹', ''));
            const itemImage = item.querySelector('img').src;

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            const existingItem = cartItems.find(cartItem => cartItem.name === itemName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: Date.now(), // Add unique id
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    image: itemImage
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            showNotification(`${itemName} added to cart!`);

            this.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
    });

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalCount;
    }

    updateCartCount();

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'menu-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }

    const style = document.createElement('style');
    style.textContent = `
        .menu-notification {
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
        .menu-notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

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
