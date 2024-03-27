//index.js
let cart = [];

function addToCart(name, price) {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
        // If the item already exists, increase its quantity
        cart[existingItemIndex].quantity++;
    } else {
        // If the item is not in the cart, add it with quantity 1
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    let totalAmount = 0;

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        const itemName = document.createElement('span');
        const itemQuantity = document.createElement('span');
        const increaseButton = document.createElement('button');
        const decreaseButton = document.createElement('button');
        const quantityText = document.createElement('span');
        quantityText.classList.add('quantity-text'); // Add class to quantity text element

        itemName.textContent = item.name;
        itemQuantity.textContent = `Quantity: `;
        listItem.appendChild(itemName);
        listItem.appendChild(itemQuantity);

        // Add minus button
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(item.name));
        listItem.appendChild(decreaseButton);

        // Add quantity text node
        quantityText.textContent = item.quantity;
        listItem.appendChild(quantityText);

        // Add plus button
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(item.name));
        listItem.appendChild(increaseButton);

        cartItemsElement.appendChild(listItem);
        totalAmount += item.price * item.quantity;
    });

    totalAmountElement.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else if (item && item.quantity === 1) {
        // Remove item from the cart if its quantity becomes 0
        cart = cart.filter(cartItem => cartItem.name !== name);
        updateCart();
    }
}

function buy() {
      // Store cart data in localStorage before redirecting to the review page
      localStorage.setItem('cart', JSON.stringify(cart));
    // Here you can redirect to the address details filling page
    window.location.href = 'address_details.html';
}
