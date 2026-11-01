document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter_btn');
    const menuContainer = document.getElementById('menu-container');
    const adminControls = document.getElementById('admin-controls');
    const toggleAdminBtn = document.getElementById('toggle-admin-btn');
    const addItemBtn = document.getElementById('add-item-btn');
    const addItemModal = document.getElementById('add-item-modal');
    const closeModal = document.querySelector('.close');
    const addItemForm = document.getElementById('add-item-form');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const backToTop = document.querySelector('.back_to_top');

    // State
    let isAdminMode = localStorage.getItem('isAdmin') === 'true';
    const API_BASE_URL = 'http://localhost:3001';

    // Initialize
    console.log('Initializing menu page...');
    initAdminControls();
    setupEventListeners();
    displayMenuItems('all');

    // Functions
    function initAdminControls() {
        if (isAdminMode) {
            adminControls.style.display = 'flex';
            document.body.classList.add('admin-mode');
            toggleAdminBtn.textContent = 'Exit Admin Mode';
        } else {
            adminControls.style.display = 'none';
            document.body.classList.remove('admin-mode');
            toggleAdminBtn.textContent = 'Admin Mode';
        }
    }

    function setupEventListeners() {
        // Admin controls
        toggleAdminBtn.addEventListener('click', toggleAdminMode);
        addItemBtn.addEventListener('click', () => {
            addItemForm.reset();
            document.querySelector('#add-item-form button').textContent = 'Add Item';
            openModal();
        });
        closeModal.addEventListener('click', closeModalFunc);
        window.addEventListener('click', (e) => {
            if (e.target === addItemModal) closeModalFunc();
        });

        // Form submission
        addItemForm.addEventListener('submit', handleFormSubmit);

        // Category filters
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                displayMenuItems(button.dataset.category);
            });
        });

        // Mobile menu
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('show');
            });

            document.querySelectorAll('#nav-menu li a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('show');
                    }
                });
            });
        }

        // Back to top
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Admin login
        document.querySelector('.login a')?.addEventListener('click', function (e) {
            e.preventDefault();
            adminLogin();
        });

        // Scroll event
        window.addEventListener('scroll', () => {
            if (backToTop) {
                backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
                backToTop.style.visibility = window.scrollY > 300 ? 'visible' : 'hidden';
            }
        });
    }

    function toggleAdminMode() {
        isAdminMode = !isAdminMode;
        localStorage.setItem('isAdmin', isAdminMode);
        initAdminControls();
        const activeCategory = document.querySelector('.filter_btn.active').dataset.category;
        displayMenuItems(activeCategory);
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 10);
    }

    function openModal() {
        addItemModal.style.display = 'block';
    }

    function closeModalFunc() {
        addItemModal.style.display = 'none';
        addItemForm.reset();
        delete addItemForm.dataset.mode;
        delete addItemForm.dataset.id;
        document.querySelector('#add-item-form button').textContent = 'Add Item';
    }

    function createMenuCard(item) {
        const adminActions = isAdminMode ? `
            <div class="admin-actions">
                <button class="edit-btn" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : '';

        return `
            <div class="menu_card" data-category="${item.category}" data-id="${item.id}">
                ${adminActions}
                <div class="menu_img">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='image/default_food.jpg'">
                </div>
                <div class="menu_text">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <div class="menu_icon">
                        ${generateRatingStars(item.rating)}
                    </div>
                    <p class="price">$${parseFloat(item.price).toFixed(2)}<sub><del>$${parseFloat(item.original_price).toFixed(2)}</del></sub></p>
                    <button class="menu_btn" data-item='${JSON.stringify(item)}'>
                        <i class="fa-solid fa-shopping-cart"></i>Order Now
                    </button>
                </div>
            </div>
        `;
    }

    function generateRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) stars += '<i class="fa-solid fa-star"></i>';
        if (hasHalfStar) stars += '<i class="fa-solid fa-star-half-stroke"></i>';

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) stars += '<i class="fa-regular fa-star"></i>';

        return stars;
    }

    async function loadMenuItems(category) {
        try {
            console.log(`Loading menu items for category: ${category}`);
            const url = category === 'all'
                ? `${API_BASE_URL}/api/menu`
                : `${API_BASE_URL}/api/menu/${category}`;

            console.log(`Fetching from URL: ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error('Failed to fetch menu items');
            }

            const data = await response.json();
            console.log(`Received ${data.length} menu items`);
            return data;
        } catch (error) {
            console.error('Error loading menu items:', error);
            showNotification('Failed to load menu items. Check console for details.', 'error');
            return [];
        }
    }

    async function displayMenuItems(category) {
        menuContainer.innerHTML = '<div class="loading">Loading delicious items...</div>';
        console.log(`Displaying menu items for category: ${category}`);

        const items = await loadMenuItems(category);
        console.log(`Items loaded:`, items);

        if (items.length === 0) {
            menuContainer.innerHTML = '<div class="error">No items found for this category. Please try another category.</div>';
            console.warn('No items returned from API');
            return;
        }

        menuContainer.innerHTML = '';
        items.forEach(item => {
            menuContainer.innerHTML += createMenuCard(item);
        });

        setupCardInteractions();
    }

    function setupCardInteractions() {
        // Admin actions
        if (isAdminMode) {
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    editMenuItem(this.getAttribute('data-id'));
                });
            });

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteMenuItem(this.getAttribute('data-id'));
                });
            });
        }

        // Add to cart functionality
        document.querySelectorAll('.menu_btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const item = JSON.parse(this.getAttribute('data-item'));
                addToCart(item);
            });
        });
    }

    function addToCart(item) {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

        if (!isLoggedIn) {
            showNotification('Please login to add items to cart', 'error');
            // Redirect to login page with return URL
            // setTimeout(() => {
            //     window.location.href = `login.html?returnUrl=${encodeURIComponent(window.location.href)}`;
            // }, 2000);
            return;
        }

        const cartItem = {
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            description: item.description,
            id: item.id,
            category: item.category
        };

        // Save to localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        updateCartCount();

        // Show notification
        showNotification(`${item.name} added to cart!`);
    }

    async function addMenuItem(item) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    rating: item.rating,
                    image: item.image,
                    category: item.category
                })
            });

            if (!response.ok) throw new Error('Failed to add item');

            const result = await response.json();
            showNotification('Item added successfully!');

            // Refresh the menu display
            const activeCategory = document.querySelector('.filter_btn.active').dataset.category;
            displayMenuItems(activeCategory);

            return result;
        } catch (error) {
            console.error('Error adding menu item:', error);
            showNotification('Failed to add item', 'error');
            return null;
        }
    }

    async function editMenuItem(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menu`);
            if (!response.ok) throw new Error('Failed to fetch menu items');

            const items = await response.json();
            const item = items.find(item => item.id == id);

            if (!item) {
                showNotification('Item not found', 'error');
                return;
            }

            document.getElementById('item-name').value = item.name;
            document.getElementById('item-description').value = item.description;
            document.getElementById('item-price').value = item.price;
            document.getElementById('item-original-price').value = item.original_price;
            document.getElementById('item-rating').value = item.rating;
            document.getElementById('item-image').value = item.image;
            document.getElementById('item-category').value = item.category;

            addItemForm.dataset.mode = 'edit';
            addItemForm.dataset.id = id;
            document.querySelector('#add-item-form button').textContent = 'Update Item';

            openModal();
        } catch (error) {
            console.error('Error fetching menu item:', error);
            showNotification('Failed to load item details', 'error');
        }
    }

    async function updateMenuItem(id, updatedItem) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updatedItem.name,
                    description: updatedItem.description,
                    price: updatedItem.price,
                    originalPrice: updatedItem.originalPrice,
                    rating: updatedItem.rating,
                    image: updatedItem.image,
                    category: updatedItem.category
                })
            });

            if (!response.ok) throw new Error('Failed to update item');

            const result = await response.json();
            showNotification('Item updated successfully!');

            // Refresh the menu display
            const activeCategory = document.querySelector('.filter_btn.active').dataset.category;
            displayMenuItems(activeCategory);

            return result;
        } catch (error) {
            console.error('Error updating menu item:', error);
            showNotification('Failed to update item', 'error');
            return null;
        }
    }

    async function deleteMenuItem(id) {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/menu/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete item');

            showNotification('Item deleted successfully!');

            // Refresh the menu display
            const activeCategory = document.querySelector('.filter_btn.active').dataset.category;
            displayMenuItems(activeCategory);
        } catch (error) {
            console.error('Error deleting menu item:', error);
            showNotification('Failed to delete item', 'error');
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const item = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            price: parseFloat(document.getElementById('item-price').value),
            originalPrice: parseFloat(document.getElementById('item-original-price').value),
            rating: parseFloat(document.getElementById('item-rating').value),
            image: document.getElementById('item-image').value,
            category: document.getElementById('item-category').value
        };

        if (e.target.dataset.mode === 'edit') {
            updateMenuItem(e.target.dataset.id, item);
        } else {
            addMenuItem(item);
        }

        closeModalFunc();
    }

    function adminLogin() {
        const password = prompt("Enter admin password:");
        if (password === "vivek07") {
            localStorage.setItem('isAdmin', 'true');
            location.reload();
        } else {
            alert("Incorrect password");
        }
    }

    // Function to update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        // Update all cart count elements on the page
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });

        return totalItems;
    }

    // Initialize cart count on page load
    updateCartCount();
    
    // Mobile menu toggle functionality
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
});