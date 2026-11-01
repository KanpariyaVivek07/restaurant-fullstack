// Complete Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "The Secret Behind Our Award-Winning Ramen",
        image: "image/blog_1.jpeg",
        date: "15 June 2023",
        category: "restaurant-news",
        content: "After years of perfecting our craft, we're proud to share that our signature ramen has won the 'Best Noodle Dish' award. What makes it special? It starts with our 18-hour pork bone broth simmered with secret spices from Kyushu, Japan.",
        views: 12400,
        comments: 142,
        likes: 2800,
        saved: false,
        liked: false
    },
    {
        id: 2,
        title: "Seasonal Specials: Summer Flavors Arrive",
        image: "image/blog_2.jpg",
        date: "28 May 2023",
        category: "recipes",
        content: "This summer we're introducing refreshing new dishes featuring locally-sourced produce. Try our chilled somen noodles with heirloom tomatoes or the citrus-marinated salmon bowl. Limited time only through August!",
        views: 9700,
        comments: 89,
        likes: 1500,
        saved: false,
        liked: false
    },
    {
        id: 3,
        title: "Vegetarian Options: Flavor Without Compromise",
        image: "image/blog_3.jpg",
        date: "10 May 2023",
        category: "ingredients",
        content: "Our new mushroom-based ramen broth has been in development for 6 months, combining shiitake, maitake, and porcini mushrooms for an umami-rich vegetarian alternative that even meat-lovers enjoy.",
        views: 8200,
        comments: 76,
        likes: 1200,
        saved: false,
        liked: false
    },
    {
        id: 4,
        title: "The Art of Noodle Making: A Chef's Perspective",
        image: "image/blog_4.jpg",
        date: "22 April 2023",
        category: "chef-tips",
        content: "Join Chef Alex as he demonstrates the traditional Japanese techniques we use to make our noodles fresh daily. From flour selection to the perfect alkaline balance, learn what makes our noodles special.",
        views: 11300,
        comments: 103,
        likes: 2100,
        saved: false,
        liked: false
    },
    {
        id: 5,
        title: "Spice Levels Explained: Finding Your Perfect Heat",
        image: "image/blog_5.jpg",
        date: "5 April 2023",
        category: "chef-tips",
        content: "Our spice scale ranges from 1-10, but what does that really mean? We break down each level with recommendations based on your tolerance. Plus: the story behind our house-made chili oil.",
        views: 7500,
        comments: 64,
        likes: 1100,
        saved: false,
        liked: false
    },
    {
        id: 6,
        title: "Behind the Scenes: A Day in Our Kitchen",
        image: "image/blog_6.jpg",
        date: "18 March 2023",
        category: "restaurant-news",
        content: "Ever wonder what goes on before we open our doors? Follow our team from 5 AM broth preparation to late-night cleaning. Meet the dedicated staff who make your dining experience possible.",
        views: 10100,
        comments: 92,
        likes: 1800,
        saved: false,
        liked: false
    },
    {
        id: 7,
        title: "Ramen Pairings: Best Sides and Drinks",
        image: "image/blog_7.jpg",
        date: "2 March 2023",
        category: "chef-tips",
        content: "While our ramen shines on its own, the right accompaniments can elevate your meal. Our sommelier recommends perfect drink pairings, from craft beers to non-alcoholic options.",
        views: 6800,
        comments: 58,
        likes: 987,
        saved: false,
        liked: false
    },
    {
        id: 8,
        title: "Meet Our Chefs: The Team Behind the Flavors",
        image: "image/blog_8.jpg",
        date: "15 February 2023",
        category: "restaurant-news",
        content: "Get to know the culinary artists who create your favorite dishes. From Tokyo-trained ramen masters to our pastry chef with 20 years experience, discover the faces behind your meal.",
        views: 9300,
        comments: 87,
        likes: 1600,
        saved: false,
        liked: false
    },
    {
        id: 9,
        title: "The History of Ramen and Our Interpretation",
        image: "image/blog_9.jpeg",
        date: "28 January 2023",
        category: "ingredients",
        content: "Tracing ramen's journey from Chinese noodle soup to Japanese staple, and how we've adapted traditions for modern palates while respecting the dish's roots.",
        views: 8700,
        comments: 79,
        likes: 1400,
        saved: false,
        liked: false
    },
    {
        id: 10,
        title: "Customer Favorites: Top 5 Most Ordered Dishes",
        image: "image/blog_10.jpeg",
        date: "10 January 2023",
        category: "restaurant-news",
        content: "Beyond our famous ramen, these dishes keep customers coming back. Discover why our pork buns have a cult following and which dessert surprises everyone.",
        views: 7900,
        comments: 71,
        likes: 1300,
        saved: false,
        liked: false
    },
    {
        id: 11,
        title: "Ramen Making Classes: Coming This Spring",
        image: "image/blog_11.jpg",
        date: "20 December 2022",
        category: "restaurant-news",
        content: "We're excited to announce hands-on workshops where you can learn to make ramen at home. Limited spots available - sign up for our newsletter to get early access.",
        views: 6500,
        comments: 53,
        likes: 945,
        saved: false,
        liked: false
    },
    {
        id: 12,
        title: "Our Sustainability Promise: Farm to Bowl",
        image: "image/blog_12.webp",
        date: "5 December 2022",
        category: "ingredients",
        content: "How we're reducing food waste, sourcing ethically, and supporting local farmers while maintaining authentic flavors. Our commitment to the planet and our community.",
        views: 5800,
        comments: 47,
        likes: 872,
        saved: false,
        liked: false
    }
];

// Complete Chefs Data
const chefs = [
    {
        id: 1,
        name: "Chef Tanaka",
        role: "Head Ramen Chef, Tokyo",
        image: "image/follow_1.png",
        bio: "Trained for 10 years in Tokyo's finest ramen shops before bringing his expertise to our kitchen. Specializes in tonkotsu broth preparation and traditional toppings."
    },
    {
        id: 2,
        name: "Chef Maria",
        role: "Pastry Chef, Barcelona",
        image: "image/follow_2.png",
        bio: "Combines traditional Japanese wagashi with Western pastry techniques for unique desserts. Creator of our signature matcha tiramisu."
    },
    {
        id: 3,
        name: "Chef Alex",
        role: "Content Chef, New York",
        image: "image/follow_3.png",
        bio: "Creates our recipe content and develops new dishes inspired by global street food. Host of our popular cooking classes."
    },
    {
        id: 4,
        name: "Sous Chef Lee",
        role: "Noodle Specialist, Seoul",
        image: "image/follow_4.png",
        bio: "Master of traditional and innovative noodle-making techniques with 15 years experience. Developed our house-made alkaline noodles."
    },
    {
        id: 5,
        name: "Sommelier Dupont",
        role: "Beverage Director, Paris",
        image: "image/follow_5.jpg",
        bio: "Curates our drink pairings with an emphasis on small producers and unique flavor combinations. Creator of our sake flight program."
    },
    {
        id: 6,
        name: "Chef Patel",
        role: "Vegetarian Specialist, Mumbai",
        image: "image/follow_6.jpg",
        bio: "Develops our plant-based menu items with authentic Indian spices and techniques. Creator of our popular vegan ramen options."
    },
    {
        id: 7,
        name: "Chef Garcia",
        role: "Grill Master, Mexico City",
        image: "image/follow_7.jpg",
        bio: "Brings bold Mexican flavors to our grilled items and small plates. Developed our popular chashu pork recipe."
    },
    {
        id: 8,
        name: "Chef Chen",
        role: "Dim Sum Chef, Hong Kong",
        image: "image/follow_8.webp",
        bio: "Creates our popular dumpling and small bite menu with Cantonese precision. Trained in Michelin-starred dim sum houses."
    },
    {
        id: 9,
        name: "Chef Rossi",
        role: "Pasta Specialist, Rome",
        image: "image/follow_9.jpg",
        bio: "Italian-trained chef who adapts traditional pasta techniques to Japanese noodle dishes. Creator of our udon-carbonara fusion."
    },
    {
        id: 10,
        name: "Pastry Chef Laurent",
        role: "Dessert Innovator, Lyon",
        image: "image/follow_10.jpg",
        bio: "Combines French pastry techniques with Japanese ingredients for our signature desserts. Developed our black sesame crème brûlée."
    }
];

// DOM Elements
const blogBox = document.querySelector('.blog_box');
const chefsContainer = document.querySelector('.chefs-container');
const savedList = document.querySelector('.saved-list');
const commentModal = document.getElementById('commentModal');
const closeModal = document.querySelector('.close-modal');

// Initialize the blog
document.addEventListener('DOMContentLoaded', function () {
    renderBlogPosts();
    renderChefs();
    initEventListeners();
});

// Render blog posts
function renderBlogPosts() {
    blogBox.innerHTML = '';

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog_card';
        postElement.dataset.id = post.id;
        postElement.dataset.category = post.category;

        postElement.innerHTML = `
            <div class="blog_image">
                <img src="${post.image}" alt="${post.title}">
                <button class="save-post-btn ${post.saved ? 'saved' : ''}" 
                        data-id="${post.id}">
                    <i class="${post.saved ? 'fas' : 'far'} fa-bookmark"></i>
                </button>
            </div>
            <div class="blog_tag">
                <div class="blog_date">
                    <p>${post.date} <i class="fa-solid fa-calendar-days"></i></p>
                    <span class="post-category">${formatCategory(post.category)}</span>
                </div>
                <h3 class="blog_heading">${post.title}</h3>
                <p class="blog_text">${post.content}</p>
                <hr>
                <div class="view_and_like">
                    <div class="view">
                        <p>${formatNumber(post.views)} views</p>
                        <p class="b_com">${post.comments} comments</p>
                    </div>
                    <div class="like">
                        <p>${formatNumber(post.likes)}</p>
                        <i class="fa-regular fa-heart like-btn" data-id="${post.id}"></i>
                    </div>
                </div>
            </div>
        `;

        blogBox.appendChild(postElement);
    });
}

// Render chef profiles with bio toggle functionality
function renderChefs() {
    chefsContainer.innerHTML = '';

    chefs.forEach(chef => {
        const chefElement = document.createElement('div');
        chefElement.className = 'follow_profiles';
        chefElement.dataset.id = chef.id;

        chefElement.innerHTML = `
            <div class="chef-profile-main">
                <img src="${chef.image}" alt="${chef.name}">
                <div class="follow_profile_tag">
                    <div class="chef-name-role">
                        <strong>${chef.name}</strong>
                        <p>${chef.role}</p>
                    </div>
                    <button class="chef-details-btn">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="chef-bio">${chef.bio}</div>
        `;

        chefsContainer.appendChild(chefElement);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');

            // Close any open chef bios when menu is toggled
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.chef-bio').forEach(bio => {
                    bio.classList.remove('show');
                });
                document.querySelectorAll('.chef-details-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        });
    }

    // Close menu when clicking on a link or outside
    document.addEventListener('click', function (e) {
        // Close mobile menu when clicking outside
        if (window.innerWidth <= 768) {
            const isClickInsideNav = e.target.closest('nav');
            const isClickOnHamburger = e.target.closest('.hamburger');

            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
            }
        }

        // Close menu when clicking on a link
        if (e.target.closest('nav ul li a')) {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
            }
        }
    });

    // Prevent body scroll when mobile menu is open
    const body = document.body;
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (navMenu.classList.contains('show')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    });

    observer.observe(navMenu, {
        attributes: true,
        attributeFilter: ['class']
    });
    // Mobile menu toggle
    // const hamburger = document.querySelector('.hamburger');
    // const navMenu = document.querySelector('nav ul');

    // if (hamburger && navMenu) {
    //     hamburger.addEventListener('click', function() {
    //         this.classList.toggle('active');
    //         navMenu.classList.toggle('show');
    //     });
    // }

    // Close menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
            }
        });
    });

    // Like button
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('like-btn')) {
            toggleLike(e.target.dataset.id);
        }
    });

    // Save post button
    document.addEventListener('click', function (e) {
        if (e.target.closest('.save-post-btn')) {
            const btn = e.target.closest('.save-post-btn');
            toggleSavePost(btn.dataset.id);
        }
    });

    // Open comment modal when comments are clicked
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('b_com')) {
            const postId = e.target.closest('.blog_card').dataset.id;
            openCommentsModal(postId);
        }
    });

    // Close modal
    closeModal.addEventListener('click', closeCommentsModal);

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === commentModal) {
            closeCommentsModal();
        }
    });

    // Chef bio toggle functionality
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.chef-details-btn');
        if (btn) {
            const chefProfile = btn.closest('.follow_profiles');
            const bio = chefProfile.querySelector('.chef-bio');

            // Toggle the bio visibility
            btn.classList.toggle('active');
            bio.classList.toggle('show');

            // Close other open bios
            document.querySelectorAll('.follow_profiles').forEach(profile => {
                if (profile !== chefProfile) {
                    profile.querySelector('.chef-bio').classList.remove('show');
                    profile.querySelector('.chef-details-btn').classList.remove('active');
                }
            });
        }
    });

    // Close bio when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.follow_profiles') && !e.target.closest('.chef-details-btn')) {
            document.querySelectorAll('.chef-bio').forEach(bio => {
                bio.classList.remove('show');
            });
            document.querySelectorAll('.chef-details-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    });
}

// Toggle like on a post
function toggleLike(postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (post) {
        post.likes += post.liked ? -1 : 1;
        post.liked = !post.liked;

        const likeBtn = document.querySelector(`.like-btn[data-id="${postId}"]`);
        const likeCount = likeBtn.previousElementSibling;

        likeBtn.classList.toggle('fa-regular');
        likeBtn.classList.toggle('fa-solid');
        likeBtn.style.color = post.liked ? '#ff4757' : '';
        likeCount.textContent = formatNumber(post.likes);

        // Animation
        likeBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// Toggle save post
function toggleSavePost(postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (post) {
        post.saved = !post.saved;

        const saveBtn = document.querySelector(`.save-post-btn[data-id="${postId}"]`);
        const icon = saveBtn.querySelector('i');

        saveBtn.classList.toggle('saved');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');

        // Update saved posts list
        updateSavedPostsList();
    }
}

// Update saved posts list
function updateSavedPostsList() {
    const savedPosts = blogPosts.filter(post => post.saved);
    savedList.innerHTML = '';

    if (savedPosts.length === 0) {
        savedList.innerHTML = '<p class="no-saved">No saved posts yet.</p>';
        return;
    }

    savedPosts.forEach(post => {
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';
        savedItem.dataset.id = post.id;

        savedItem.innerHTML = `
            <span>${post.title}</span>
            <button class="remove-saved" data-id="${post.id}">
                <i class="fas fa-times"></i>
            </button>
        `;

        savedList.appendChild(savedItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-saved').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleSavePost(this.dataset.id);
        });
    });
}

// Open comments modal
function openCommentsModal(postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (!post) return;

    const modal = document.getElementById('commentModal');
    const commentsContainer = modal.querySelector('.comments-container');

    // Set post title in modal
    modal.querySelector('h3').textContent = `Comments: ${post.title}`;

    // Load comments (in a real app, this would come from an API)
    commentsContainer.innerHTML = '<p>Loading comments...</p>';

    // Simulate API call
    setTimeout(() => {
        // Mock comments data
        const mockComments = [
            {
                id: 1,
                author: "Food Lover",
                date: "2 days ago",
                text: "This recipe changed my life! So delicious!"
            },
            {
                id: 2,
                author: "Home Chef",
                date: "1 week ago",
                text: "I tried this at home and it turned out great. Thanks for the tips!"
            }
        ];

        renderComments(mockComments);
    }, 500);

    // Set up comment submission
    const submitBtn = modal.querySelector('.submit-comment');
    const textarea = modal.querySelector('textarea');

    submitBtn.onclick = function () {
        if (textarea.value.trim()) {
            // In a real app, this would submit to a server
            const newComment = {
                id: Date.now(),
                author: "You",
                date: "Just now",
                text: textarea.value
            };

            // Add to beginning of comments
            const commentsContainer = modal.querySelector('.comments-container');
            const commentElement = createCommentElement(newComment);
            commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);

            // Clear textarea
            textarea.value = '';

            // Update comment count
            post.comments += 1;
            const commentCountElement = document.querySelector(`.blog_card[data-id="${postId}"] .b_com`);
            if (commentCountElement) {
                commentCountElement.textContent = `${post.comments} comments`;
            }
        }
    };

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close comments modal
function closeCommentsModal() {
    commentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Render comments
function renderComments(comments) {
    const commentsContainer = commentModal.querySelector('.comments-container');
    commentsContainer.innerHTML = '';

    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
    }

    comments.forEach(comment => {
        commentsContainer.appendChild(createCommentElement(comment));
    });
}

// Create comment element
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
    `;
    return commentElement;
}

// Helper function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Helper function to format category
function formatCategory(category) {
    const words = category.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


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

// cart-count.js - Add this to all pages
document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('storage', function (e) {
        if (e.key === 'cart') {
            updateCartCount();
        }
    });

    // Add to cart functionality for menu items
    document.addEventListener('click', function (e) {
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