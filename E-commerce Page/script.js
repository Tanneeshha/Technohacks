// Basic interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail clicking
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, we would change the main image
            // mainImage.src = this.querySelector('img').src;
        });
    });
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity controls
    const minusBtn = document.querySelectorAll('.quantity-btn')[0];
    const plusBtn = document.querySelectorAll('.quantity-btn')[1];
    const quantityDisplay = document.querySelector('.quantity-display');
    let quantity = 1;
    
    minusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
    
    // Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => content.classList.remove('active'));
            tabContents[index].classList.add('active');
        });
    });
    
    // Add to cart button
    document.querySelector('.add-to-cart').addEventListener('click', function() {
        alert('Product added to cart!');
    });
    
    // Buy now button
    document.querySelector('.buy-now').addEventListener('click', function() {
        alert('Proceeding to checkout!');
    });
});
