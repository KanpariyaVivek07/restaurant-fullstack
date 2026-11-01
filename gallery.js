document.addEventListener('DOMContentLoaded', function() {
    // Complete gallery data with all 51 images
    const galleryData = [
        { id: 1, src: 'image/gallery_1.jpg', title: 'Signature Pasta', category: 'mains' },
        { id: 2, src: 'image/gallery_2.jpg', title: 'Fresh Garden Salad', category: 'appetizers' },
        { id: 3, src: 'image/gallery_3.webp', title: 'Chocolate Lava Cake', category: 'desserts' },
        { id: 4, src: 'image/gallery_4.jpg', title: 'Mojito Cocktail', category: 'drinks' },
        { id: 5, src: 'image/gallery_5.jpg', title: 'Grilled Salmon', category: 'mains' },
        { id: 6, src: 'image/gallery_6.jpg', title: 'Bruschetta Platter', category: 'appetizers' },
        { id: 7, src: 'image/gallery_7.jpg', title: 'Tiramisu Delight', category: 'desserts' },
        { id: 8, src: 'image/gallery_8.jpg', title: 'Wine Selection', category: 'drinks' },
        { id: 9, src: 'image/gallery_9.webp', title: 'Chef Special Steak', category: 'mains' },
        { id: 10, src: 'image/gallery_10.jpg', title: 'Spring Rolls', category: 'appetizers' },
        { id: 11, src: 'image/gallery_11.jpg', title: 'Red Velvet Cake', category: 'desserts' },
        { id: 12, src: 'image/gallery_12.jpg', title: 'Craft Beer', category: 'drinks' },
        { id: 13, src: 'image/gallery_13.jpg', title: 'Vegetable Curry', category: 'mains' },
        { id: 14, src: 'image/gallery_14.jpg', title: 'Caprese Salad', category: 'appetizers' },
        { id: 15, src: 'image/gallery_15.webp', title: 'Fruit Tart', category: 'desserts' },
        { id: 16, src: 'image/gallery_16.jpg', title: 'Iced Coffee', category: 'drinks' },
        { id: 17, src: 'image/gallery_17.jpg', title: 'Beef Burger', category: 'mains' },
        { id: 18, src: 'image/gallery_18.jpg', title: 'Garlic Bread', category: 'appetizers' },
        { id: 19, src: 'image/gallery_19.jpg', title: 'Cheesecake', category: 'desserts' },
        { id: 20, src: 'image/gallery_20.jpg', title: 'Fresh Juice', category: 'drinks' },
        { id: 21, src: 'image/gallery_21.jpg', title: 'Chicken Tikka', category: 'mains' },
        { id: 22, src: 'image/gallery_22.jpg', title: 'Stuffed Mushrooms', category: 'appetizers' },
        { id: 23, src: 'image/gallery_23.jpg', title: 'Chocolate Mousse', category: 'desserts' },
        { id: 24, src: 'image/gallery_24.jpg', title: 'Craft Cocktail', category: 'drinks' },
        { id: 25, src: 'image/gallery_25.jpg', title: 'Vegetable Stir Fry', category: 'mains' },
        { id: 26, src: 'image/gallery_26.jpg', title: 'Shrimp Cocktail', category: 'appetizers' },
        { id: 27, src: 'image/gallery_27.jpg', title: 'Apple Pie', category: 'desserts' },
        { id: 28, src: 'image/gallery_28.jpg', title: 'Espresso', category: 'drinks' },
        { id: 29, src: 'image/gallery_29.jpg', title: 'BBQ Ribs', category: 'mains' },
        { id: 30, src: 'image/gallery_30.jpg', title: 'Onion Rings', category: 'appetizers' },
        { id: 31, src: 'image/gallery_31.webp', title: 'Ice Cream Sundae', category: 'desserts' },
        { id: 32, src: 'image/gallery_32.jpg', title: 'Sangria', category: 'drinks' },
        { id: 33, src: 'image/gallery_33.jpg', title: 'Margherita Pizza', category: 'mains' },
        { id: 34, src: 'image/gallery_34.jpg', title: 'Calamari', category: 'appetizers' },
        { id: 35, src: 'image/gallery_35.jpg', title: 'Creme Brulee', category: 'desserts' },
        { id: 36, src: 'image/gallery_36.jpg', title: 'Iced Tea', category: 'drinks' },
        { id: 37, src: 'image/gallery_37.jpg', title: 'Fish Tacos', category: 'mains' },
        { id: 38, src: 'image/gallery_38.jpg', title: 'Chicken Wings', category: 'appetizers' },
        { id: 39, src: 'image/gallery_39.jpg', title: 'Panna Cotta', category: 'desserts' },
        { id: 40, src: 'image/gallery_40.webp', title: 'Smoothie Bowl', category: 'drinks' },
        { id: 41, src: 'image/gallery_41.jpg', title: 'Beef Wellington', category: 'mains' },
        { id: 42, src: 'image/gallery_42.webp', title: 'Avocado Toast', category: 'appetizers' },
        { id: 43, src: 'image/gallery_43.jpg', title: 'Churros', category: 'desserts' },
        { id: 44, src: 'image/gallery_44.webp', title: 'Milkshake', category: 'drinks' },
        { id: 45, src: 'image/gallery_45.jpg', title: 'Vegetable Lasagna', category: 'mains' },
        { id: 46, src: 'image/gallery_46.jpg', title: 'Cheese Platter', category: 'appetizers' },
        { id: 47, src: 'image/gallery_47.jpg', title: 'Macarons', category: 'desserts' },
        { id: 48, src: 'image/gallery_48.jpg', title: 'Hot Chocolate', category: 'drinks' },
        { id: 49, src: 'image/gallery_49.jpg', title: 'Chicken Parmesan', category: 'mains' },
        { id: 50, src: 'image/gallery_50.jpg', title: 'Soup of the Day', category: 'appetizers' },
        { id: 51, src: 'image/gallery_51.jpg', title: 'Fruit Platter', category: 'desserts' }
    ];

    // Rest of your JavaScript code remains the same...
    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.filter_btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close_modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        galleryContainer.innerHTML = '';
        filteredImages = [...galleryData];
        
        filteredImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery_image anim ${item.category}`;
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="image_caption">
                    <h3>${item.title}</h3>
                    <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openModal(index));
            galleryContainer.appendChild(galleryItem);
        });
        
        // Animate items sequentially
        const items = document.querySelectorAll('.gallery_image');
        items.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.05}s`; // Faster animation for more items
        });
    }

    // Filter gallery by category
    function filterGallery(category) {
        if (category === 'all') {
            filteredImages = [...galleryData];
        } else {
            filteredImages = galleryData.filter(item => item.category === category);
        }
        
        renderFilteredGallery();
    }

    // Search gallery by title
    function searchGallery(query) {
        if (!query) {
            filteredImages = [...galleryData];
        } else {
            const searchTerm = query.toLowerCase();
            filteredImages = galleryData.filter(item => 
                item.title.toLowerCase().includes(searchTerm) || 
                item.category.toLowerCase().includes(searchTerm)
            );
        }
        
        renderFilteredGallery();
    }

    // Render filtered gallery
    function renderFilteredGallery() {
        galleryContainer.innerHTML = '';
        
        if (filteredImages.length === 0) {
            galleryContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No items found</h3>
                    <p>Try a different search or filter</p>
                </div>
            `;
            return;
        }
        
        filteredImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery_image anim ${item.category}`;
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="image_caption">
                    <h3>${item.title}</h3>
                    <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openModal(index));
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Open modal with selected image
    function openModal(index) {
        currentImageIndex = index;
        const item = filteredImages[currentImageIndex];
        
        modalImage.src = item.src;
        modalImage.alt = item.title;
        modalCaption.textContent = item.title;
        
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModalFunc() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateModalImage();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateModalImage();
    }

    // Update modal image and caption
    function updateModalImage() {
        const item = filteredImages[currentImageIndex];
        modalImage.src = item.src;
        modalImage.alt = item.title;
        modalCaption.textContent = item.title;
        
        // Add animation
        modalImage.style.animation = 'none';
        setTimeout(() => {
            modalImage.style.animation = 'scaleUp 0.4s ease';
        }, 10);
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterGallery(button.dataset.filter);
        });
    });

    searchBtn.addEventListener('click', () => {
        searchGallery(searchInput.value);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchGallery(searchInput.value);
        }
    });

    closeModal.addEventListener('click', closeModalFunc);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close modal when clicking outside image
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModalFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModalFunc();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Initialize the gallery
    initGallery();

    // Back to top button functionality
    const backToTop = document.querySelector('.back_to_top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});




// Mobile menu toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('show');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('#nav-menu li a').forEach(link => {
                link.addEventListener('click', function() {
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
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
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

// cart-count.js - Add this to all pages
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Listen for storage events (when cart is updated from another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            updateCartCount();
        }
    });
    
    // Add to cart functionality for menu items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.menu_btn') || e.target.closest('.offer_btn')) {
            const button = e.target.closest('.menu_btn') || e.target.closest('.offer_btn');
            const card = button.closest('.menu_card, .offer_card');
            
            if (card) {
                const itemName = card.querySelector('h2, h3').textContent;
                const priceText = card.querySelector('.price, .discounted_price').textContent;
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                const image = card.querySelector('img').src;
                
                // Check if item already exists in cart
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.name === itemName);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        name: itemName,
                        price: price,
                        quantity: 1,
                        image: image
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart count
                updateCartCount();
                
                // Show notification
                showNotification(`${itemName} added to cart!`);
            }
        }
    });
    
    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 10);
    }
});