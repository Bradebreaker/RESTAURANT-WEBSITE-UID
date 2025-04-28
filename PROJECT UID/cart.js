// Load cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartDiv = document.querySelector('.empty-cart');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.querySelector('.checkout-btn');

function displayCartItems() {
    if (cartItems.length === 0) {
        emptyCartDiv.style.display = 'block';
        checkoutBtn.disabled = true;
        return;
    }

    emptyCartDiv.style.display = 'none';
    checkoutBtn.disabled = false;
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-left">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
            <div class="cart-item-right">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <div class="item-total">
                    ₹${item.price * item.quantity}
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    subtotalElement.textContent = `₹${subtotal}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('plus')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        cartItems[index].quantity++;
        saveCart();
        displayCartItems();
    }

    if (e.target.classList.contains('minus')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            saveCart();
            displayCartItems();
        }
    }

    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        cartItems.splice(index, 1);
        saveCart();
        displayCartItems();
    }
});

// Initialize cart
displayCartItems();
// Checkout button functionality
document.getElementById('checkoutBtn').addEventListener('click', function() {
    document.getElementById('checkoutPopup').style.display = 'block';
  });
  
  // Submit email and phone number
  document.getElementById('submitBtn').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
  
    if (!email || !phone) {
      alert('Please enter both Email and Phone number!');
      return;
    }
  
    // Send Email
    sendEmailReceipt(email);
  
    // Send WhatsApp (Optional if you have server setup)
    sendWhatsAppMessage(phone);
  
    alert('Receipt Sent Successfully! Check your Email / WhatsApp.');
    document.getElementById('checkoutPopup').style.display = 'none';
  });
  
  // Function to send Email using EmailJS
  function sendEmailReceipt(userEmail) {
    emailjs.send('service_0tae3jk', 'template_2e7fwo8', {
      to_email: userEmail
    }).then(function(response) {
      console.log('Email Sent!', response.status, response.text);
    }, function(error) {
      console.error('Email Send Failed...', error);
    });
  }
  
  // Function to send WhatsApp (Optional - needs server backend)
  function sendWhatsAppMessage(userPhone) {
    fetch('https://your-server-url/send-whatsapp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ phone: userPhone })
    })
    .then(res => res.json())
    .then(data => console.log('WhatsApp Message Sent!', data))
    .catch(err => console.error('WhatsApp Message Failed...', err));
  }
  
