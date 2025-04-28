// Locations Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('map').setView([8.7642, 78.1348], 14); // Coordinates for Tuticorin

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon
    const crispyIcon = L.icon({
        iconUrl: 'images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    // Add markers for locations
    const vocCollegeMarker = L.marker([8.7642, 78.1348], {icon: crispyIcon}).addTo(map)
        .bindPopup("<b>CRISPY VOC College</b><br>12/1, Beach Road, Near VOC College");

    const centralMarker = L.marker([8.7691, 78.1402], {icon: crispyIcon}).addTo(map)
        .bindPopup("<b>CRISPY Tuticorin Central</b><br>45, Main Bazaar Road, Near Bus Stand");

    const mallMarker = L.marker([8.7680, 78.1450], {icon: crispyIcon}).addTo(map)
        .bindPopup("<b>CRISPY Pearl City Mall</b><br>Coming Soon - December 2025");

    // Fit map to show all markers
    const group = new L.featureGroup([vocCollegeMarker, centralMarker, mallMarker]);
    map.fitBounds(group.getBounds().pad(0.2));

    // Update cart count
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalCount;
    }

    updateCartCount();

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