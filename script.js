const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            link.style.animation ? link.style.animation = '' : link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

const cart = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const buyNowButton = document.getElementById('buy-now');
    const businessNumber = '1234567890'; // Replace with your business number

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart display
    const updateCart = () => {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>${item.name}</div>
                <span>$${item.price}</span>
                <button class="remove-from-cart" data-index="${index}" aria-label="Remove ${item.name} from cart">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += parseFloat(item.price);
        });
        cartTotal.textContent = total.toFixed(2);

        // Show or hide the Buy Now button based on cart contents
        if (cart.length > 0) {
            buyNowButton.classList.remove('hidden');
        } else {
            buyNowButton.classList.add('hidden');
        }
    };

    // Add item to cart
    const addToCart = (event) => {
        const product = event.target.closest('.product');
        const id = product.getAttribute('data-id');
        const name = product.getAttribute('data-name');
        const price = product.getAttribute('data-price');

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            alert('Item already in cart');
            return;
        }

        cart.push({ id, name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    // Remove item from cart
    const removeFromCart = (event) => {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    // Attach event listeners to add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Attach event listeners to remove from cart buttons
    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            removeFromCart(event);
        }
    });

    // Initial cart display
    updateCart();
};

const whatsapp = () => {
    const buyNowButton = document.getElementById('buy-now');
    const businessNumber = '1234567890'; // Replace with your business number

    buyNowButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        let message = 'Your cart details:\n';
        cart.forEach(item => {
            message += `- ${item.name}: $${item.price}\n`;
        });
        message += `Total: $${cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}`;

        const whatsappURL = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
};

navSlide();
cart();
whatsapp();
