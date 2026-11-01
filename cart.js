document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartCount = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const deliveryFeeEl = document.getElementById('delivery-fee');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoBtn = document.getElementById('apply-promo');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const billModal = document.getElementById('bill-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const printBillBtn = document.getElementById('print-bill');
    const closeBillBtn = document.getElementById('close-bill');
    const orderHistoryContainer = document.getElementById('order-history-container');
    const cancelOrderBtn = document.getElementById('cancel-order');

    // State
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let appliedPromo = null;
    const PROMO_CODES = {
        'WELCOME10': 0.1,  // 10% discount
        'SAVE15': 0.15,    // 15% discount
        'FREESHIP': 'free' // Free delivery
    };
    const DELIVERY_FEE = 2.99;
    const TAX_RATE = 0.1; // 10% tax

    // Initialize
    updateCartDisplay();
    setupEventListeners();
    loadOrderHistory();

    // Functions
    function setupEventListeners() {
        // Apply promo code
        applyPromoBtn.addEventListener('click', applyPromoCode);

        // Checkout button
        checkoutBtn.addEventListener('click', handleCheckoutClick);

        // Close modal
        closeModalBtn.addEventListener('click', closeCheckoutModal);

        // Form submission
        checkoutForm.addEventListener('submit', handleCheckout);

        // Bill actions
        printBillBtn.addEventListener('click', printBill);
        closeBillBtn.addEventListener('click', closeBillModal);

        // Cancel order button
        if (cancelOrderBtn) {
            cancelOrderBtn.addEventListener('click', closeCheckoutModal);
        }

        // Close modals when clicking outside
        window.addEventListener('click', function (e) {
            if (e.target === checkoutModal) closeCheckoutModal();
            if (e.target === billModal) closeBillModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeCheckoutModal();
                closeBillModal();
            }
        });
    }

    function updateCartDisplay() {
        // Get cart from localStorage
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Show empty cart message if no items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '';
            emptyCart.style.display = 'block';
            checkoutBtn.disabled = true;
            updateSummary();
            return;
        }

        // Hide empty cart message
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;

        // Render cart items
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemEl = createCartItemElement(item, index);
            cartItemsContainer.appendChild(cartItemEl);

            // Add event listeners for this item
            addItemEventListeners(item, index);
        });

        // Update summary
        updateSummary();
    }

    function createCartItemElement(item, index) {
        // Ensure price is a number
        const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        const itemTotal = (price * item.quantity).toFixed(2);

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.setAttribute('data-index', index);

        div.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='image/default_food.jpg'">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${price.toFixed(2)}</p>
                ${item.description ? `<p class="cart-item-description">${item.description}</p>` : ''}
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-action="decrease">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
                        <button class="quantity-btn increase-btn" data-action="increase">+</button>
                    </div>
                    <button class="remove-btn" data-action="remove">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div class="cart-item-total">$${itemTotal}</div>
        `;

        return div;
    }

    function addItemEventListeners(item, index) {
        // Quantity buttons
        const decreaseBtn = document.querySelector(`.cart-item[data-index="${index}"] .decrease-btn`);
        const increaseBtn = document.querySelector(`.cart-item[data-index="${index}"] .increase-btn`);
        const quantityInput = document.querySelector(`.cart-item[data-index="${index}"] .quantity-input`);
        const removeBtn = document.querySelector(`.cart-item[data-index="${index}"] .remove-btn`);

        decreaseBtn.addEventListener('click', () => updateQuantity(index, -1));
        increaseBtn.addEventListener('click', () => updateQuantity(index, 1));
        removeBtn.addEventListener('click', () => removeItem(index));

        quantityInput.addEventListener('change', (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1 && newQuantity <= 99) {
                updateQuantity(index, 0, newQuantity);
            } else {
                e.target.value = item.quantity;
            }
        });

        quantityInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.target.blur();
            }
        });
    }

    function updateQuantity(index, change, newQuantity = null) {
        if (newQuantity !== null) {
            cart[index].quantity = newQuantity;
        } else {
            cart[index].quantity += change;

            // Ensure quantity doesn't go below 1
            if (cart[index].quantity < 1) {
                cart[index].quantity = 1;
            }

            // Ensure quantity doesn't exceed 99
            if (cart[index].quantity > 99) {
                cart[index].quantity = 99;
            }
        }

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update display
        updateCartDisplay();

        // Show notification for quantity change
        if (change !== 0) {
            showNotification(`${change > 0 ? 'Increased' : 'Decreased'} ${cart[index].name} quantity`, 'success');
        }
    }

    function removeItem(index) {
        const itemName = cart[index].name;
        cart.splice(index, 1);

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update display
        updateCartDisplay();

        // Show notification
        showNotification(`Removed ${itemName} from cart`, 'success');
    }

    function updateSummary() {
        const subtotal = cart.reduce((total, item) => {
            // Ensure price is a number
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + (price * item.quantity);
        }, 0);

        const tax = subtotal * TAX_RATE;

        // Calculate discount
        let discount = 0;
        let deliveryFee = DELIVERY_FEE;

        if (appliedPromo) {
            if (typeof PROMO_CODES[appliedPromo] === 'number') {
                // Percentage discount
                discount = subtotal * PROMO_CODES[appliedPromo];
            } else if (PROMO_CODES[appliedPromo] === 'free') {
                // Free delivery
                deliveryFee = 0;
            }
        }

        const total = subtotal + tax + deliveryFee - discount;

        // Update DOM
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        deliveryFeeEl.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
        discountEl.textContent = `-$${discount.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    function applyPromoCode() {
        const code = promoCodeInput.value.trim().toUpperCase();

        if (!code) {
            showNotification('Please enter a promo code', 'error');
            return;
        }

        if (PROMO_CODES[code]) {
            appliedPromo = code;
            showNotification(`Promo code applied successfully!`, 'success');
            updateSummary();

            // Visual feedback
            promoCodeInput.style.borderColor = 'var(--success-color)';
            setTimeout(() => {
                promoCodeInput.style.borderColor = '';
            }, 2000);
        } else {
            showNotification('Invalid promo code', 'error');

            // Visual feedback
            promoCodeInput.style.borderColor = 'var(--error-color)';
            setTimeout(() => {
                promoCodeInput.style.borderColor = '';
            }, 2000);
        }
    }

    function handleCheckoutClick() {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

        if (!isLoggedIn) {
            showNotification('Please login to proceed with checkout', 'error');
            // Redirect to login page with return URL
            setTimeout(() => {
                window.location.href = `login.html?returnUrl=${encodeURIComponent('cart.html')}`;
            }, 2000);
            return;
        }

        // Check if cart is empty
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }

        // Open checkout modal
        openCheckoutModal();

        // Pre-fill form with user data if available
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            document.getElementById('customer-email').value = userEmail;
        }
    }

    function openCheckoutModal() {
        checkoutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCheckoutModal() {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async function handleCheckout(e) {
        e.preventDefault();

        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userId = localStorage.getItem('userId');

        if (!isLoggedIn || !userId) {
            showNotification('Please login to proceed with checkout', 'error');
            setTimeout(() => {
                window.location.href = `login.html?returnUrl=${encodeURIComponent('cart.html')}`;
            }, 2000);
            return;
        }

        // Get form values
        const formData = {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('delivery-address').value,
            paymentMethod: document.getElementById('payment-method').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.paymentMethod) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        // Update user details in database
        try {
            const updateResponse = await fetch(`http://localhost:3001/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address
                })
            });

            if (!updateResponse.ok) {
                console.error('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }

        // Update localStorage with new user details
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userPhone', formData.phone);
        localStorage.setItem('userAddress', formData.address);

        // Generate order details
        const orderId = 'ORD' + Date.now();
        const orderDate = new Date().toLocaleString();

        // Calculate totals
        const subtotal = cart.reduce((total, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + (price * item.quantity);
        }, 0);

        const tax = subtotal * TAX_RATE;

        let discount = 0;
        let deliveryFee = DELIVERY_FEE;

        if (appliedPromo) {
            if (typeof PROMO_CODES[appliedPromo] === 'number') {
                discount = subtotal * PROMO_CODES[appliedPromo];
            } else if (PROMO_CODES[appliedPromo] === 'free') {
                deliveryFee = 0;
            }
        }

        const total = subtotal + tax + deliveryFee - discount;

        // Create order object
        const order = {
            id: orderId,
            date: orderDate,
            customer: {
                id: userId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address
            },
            items: cart.map(item => ({
                ...item,
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
            })),
            summary: {
                subtotal,
                tax,
                deliveryFee,
                discount,
                total
            },
            paymentMethod: formData.paymentMethod,
            status: 'completed'
        };

        // Save order to database
        saveOrderToDatabase(order);

        // Populate bill
        populateBill(order);

        // Show bill modal
        closeCheckoutModal();
        billModal.style.display = 'block';

        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        appliedPromo = null;
        promoCodeInput.value = '';

        // Update cart display
        updateCartDisplay();

        // Show success notification
        showNotification('Order placed successfully!', 'success');
    }

    async function saveOrderToDatabase(order) {
        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error('Failed to save order to database');
            }

            const result = await response.json();
            console.log('Order saved to database:', result);

            // Also save to localStorage for offline access
            saveOrderToLocalStorage(order);

        } catch (error) {
            console.error('Error saving order to database:', error);
            // Fallback to localStorage if database is unavailable
            saveOrderToLocalStorage(order);
            showNotification('Order saved locally (database unavailable)', 'warning');
        }
    }

    function saveOrderToLocalStorage(order) {
        // Save to localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Also save user email for future pre-fill
        localStorage.setItem('userEmail', order.customer.email);
    }

    function populateBill(order) {
        document.getElementById('order-id').textContent = `Order ID: ${order.id}`;
        document.getElementById('order-date').textContent = `Date: ${order.date}`;
        document.getElementById('bill-customer-name').textContent = `Name: ${order.customer.name}`;
        document.getElementById('bill-customer-email').textContent = `Email: ${order.customer.email}`;
        document.getElementById('bill-customer-phone').textContent = `Phone: ${order.customer.phone}`;
        document.getElementById('bill-customer-address').textContent = `Address: ${order.customer.address}`;
        document.getElementById('bill-payment-method').textContent = order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1);

        // Populate bill items
        const billItemsTable = document.querySelector('#bill-items-table tbody');
        billItemsTable.innerHTML = '';

        order.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            billItemsTable.appendChild(row);
        });

        // Populate bill summary
        document.getElementById('bill-subtotal').textContent = `$${order.summary.subtotal.toFixed(2)}`;
        document.getElementById('bill-tax').textContent = `$${order.summary.tax.toFixed(2)}`;
        document.getElementById('bill-delivery').textContent = order.summary.deliveryFee === 0 ? 'FREE' : `$${order.summary.deliveryFee.toFixed(2)}`;
        document.getElementById('bill-discount').textContent = `-$${order.summary.discount.toFixed(2)}`;
        document.getElementById('bill-total').textContent = `$${order.summary.total.toFixed(2)}`;
    }

    function printBill() {
        const billContent = document.querySelector('.bill-content');
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = billContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;

        // Re-add event listeners
        setupEventListeners();
        updateCartDisplay();
    }

    function closeBillModal() {
        billModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async function loadOrderHistory() {
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');

        if (!isLoggedIn || !userEmail) {
            orderHistoryContainer.innerHTML = `
                <div class="no-orders">
                    <i class="fa-solid fa-user"></i>
                    <p>Please login to view your order history</p>
                </div>
            `;
            return;
        }

        try {
            // Try to fetch from database first
            const response = await fetch(`http://localhost:3001/api/orders/${userEmail}`);

            if (response.ok) {
                const orders = await response.json();
                displayOrderHistory(orders);
            } else {
                // Fallback to localStorage if database is unavailable
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                const userOrders = orders.filter(order => order.customer.email === userEmail);
                displayOrderHistory(userOrders);
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
            // Fallback to localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const userOrders = orders.filter(order => order.customer.email === userEmail);
            displayOrderHistory(userOrders);
        }
    }

    function displayOrderHistory(orders) {
        if (orders.length === 0) {
            orderHistoryContainer.innerHTML = `
                <div class="no-orders">
                    <i class="fa-solid fa-box-open"></i>
                    <h3>No orders yet</h3>
                    <p>Your order history will appear here</p>
                </div>
            `;
            return;
        }

        orderHistoryContainer.innerHTML = '';

        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';

            orderCard.innerHTML = `
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span>${order.date || order.order_date}</span>
                </div>
                <div class="order-details">
                    <div class="order-items">
                        ${order.items.slice(0, 3).map(item => `
                            <div class="order-item">
                                <span>${item.quantity}x ${item.name}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                        ${order.items.length > 3 ? `<p>+ ${order.items.length - 3} more items</p>` : ''}
                    </div>
                    <div class="order-summary">
                        <div class="order-summary-row">
                            <span>Total:</span>
                            <span>$${order.summary ? order.summary.total.toFixed(2) : order.total.toFixed(2)}</span>
                        </div>
                        <div class="order-summary-row">
                            <span>Status:</span>
                            <span class="status-${order.status}">${order.status}</span>
                        </div>
                    </div>
                </div>
            `;

            orderHistoryContainer.appendChild(orderCard);
        });
    }

    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize animations
    function initAnimations() {
        // Add subtle animations to cart items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideIn 0.5s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe cart items when they're added
        const checkForNewItems = setInterval(() => {
            const items = document.querySelectorAll('.cart-item');
            items.forEach(item => {
                if (!item.hasAttribute('data-observed')) {
                    item.setAttribute('data-observed', 'true');
                    observer.observe(item);
                }
            });

            if (items.length > 0) {
                clearInterval(checkForNewItems);
            }
        }, 100);
    }

    // Initialize animations after a short delay
    setTimeout(initAnimations, 500);
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('#nav-menu li a').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('show');
                }
            });
        });
    }

    // Back to top button functionality
    const backToTop = document.querySelector('.back_to_top a');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        const backToTop = document.querySelector('.back_to_top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
    });
});