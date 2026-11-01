// Countdown Timer with Local Storage
const countdown = () => {
    // Check if end date exists in localStorage, otherwise set it
    let countDate = localStorage.getItem('countdownDate');
    if (!countDate) {
        countDate = new Date();
        countDate.setDate(countDate.getDate() + 7); // 7 days from now
        localStorage.setItem('countdownDate', countDate);
    } else {
        countDate = new Date(countDate);
    }

    const now = new Date().getTime();
    const gap = countDate - now;

    // If countdown is over, reset it for another week
    if (gap < 0) {
        const newCountDate = new Date();
        newCountDate.setDate(newCountDate.getDate() + 7);
        localStorage.setItem('countdownDate', newCountDate);
        return countdown(); // Recursively call with new date
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById("days").innerText = textDay < 10 ? `0${textDay}` : textDay;
    document.getElementById("hours").innerText = textHour < 10 ? `0${textHour}` : textHour;
    document.getElementById("minutes").innerText = textMinute < 10 ? `0${textMinute}` : textMinute;
    document.getElementById("seconds").innerText = textSecond < 10 ? `0${textSecond}` : textSecond;
};

setInterval(countdown, 1000);

// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update cart count in UI if element exists
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
};

// Bookings CRUD System
let bookings = [];

// Helper functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-()]{8,}$/;
    return re.test(phone);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format MySQL date for input field (YYYY-MM-DD)
function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format MySQL time for input field (HH:MM)
function formatTimeForInput(timeString) {
    // Handle both "HH:MM:SS" and "HH:MM" formats
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
}

// API functions for bookings with MySQL
async function fetchBookings() {
    try {
        const response = await fetch('http://localhost:3001/api/bookings');
        if (response.ok) {
            bookings = await response.json();
            updateBookings();
        } else {
            console.error('Failed to fetch bookings');
            showAlert('Failed to load reservations. Please refresh the page.', 'error');
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        showAlert('Connection error. Please check if the server is running.', 'error');
    }
}

async function createBooking(bookingData) {
    try {
        const response = await fetch('http://localhost:3001/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (response.ok) {
            const result = await response.json();
            bookings.unshift(result.booking); // Add to beginning of array
            updateBookings();
            return result.booking;
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create booking');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        showAlert(error.message || 'Failed to create reservation. Please try again.', 'error');
        throw error;
    }
}

async function updateBooking(id, bookingData) {
    try {
        const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (response.ok) {
            const result = await response.json();
            const index = bookings.findIndex(b => b.id == id); // Note: == instead of === because id might be string or number
            if (index !== -1) {
                bookings[index] = result.booking;
                updateBookings();
            }
            return result.booking;
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update booking');
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        showAlert(error.message || 'Failed to update reservation. Please try again.', 'error');
        throw error;
    }
}

async function deleteBooking(id) {
    try {
        const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            bookings = bookings.filter(b => b.id != id); // Note: != instead of !==
            updateBookings();
            return true;
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete booking');
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        showAlert(error.message || 'Failed to cancel reservation. Please try again.', 'error');
        throw error;
    }
}

function updateBookings() {
    // Update table
    const tableBody = document.getElementById('bookingsTableBody');
    tableBody.innerHTML = '';
    
    if (bookings.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8">No reservations found</td></tr>';
        return;
    }
    
    bookings.forEach(booking => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td data-label="Name">${booking.name}</td>
            <td data-label="Email">${booking.email}</td>
            <td data-label="Phone">${booking.phone}</td>
            <td data-label="Party Size">${booking.partySize}</td>
            <td data-label="Date">${formatDate(booking.date)}</td>
            <td data-label="Time">${formatTimeForInput(booking.time)}</td>
            <td data-label="Requests">${booking.requests || '-'}</td>
            <td data-label="Actions" class="action-btns">
                <button class="action-btn edit-btn" data-id="${booking.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${booking.id}">Cancel</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => editBooking(e.target.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => confirmDeleteBooking(e.target.dataset.id));
    });
}

function editBooking(id) {
    const booking = bookings.find(b => b.id == id); // Use == for type conversion
    if (!booking) return;
    
    // Fill form with booking data
    document.getElementById('fullName').value = booking.name;
    document.getElementById('email').value = booking.email;
    document.getElementById('phone').value = booking.phone;
    document.getElementById('partySize').value = booking.partySize;
    document.getElementById('reservationDate').value = formatDateForInput(booking.date);
    document.getElementById('reservationTime').value = formatTimeForInput(booking.time);
    document.getElementById('specialRequests').value = booking.requests || '';
    
    // Store the booking ID for update
    document.getElementById('reservationForm').dataset.editingId = id;
    
    // Change button text to indicate editing mode
    const submitBtn = document.querySelector('.submit_btn');
    submitBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Update Reservation';
    
    // Scroll to form
    document.querySelector('.reservation_section').scrollIntoView({ behavior: 'smooth' });
    
    showAlert(`Editing reservation for ${booking.name}. Make your changes and click "Update Reservation".`, 'info');
}

function resetForm() {
    document.getElementById('reservationForm').reset();
    delete document.getElementById('reservationForm').dataset.editingId;
    
    // Reset button text
    const submitBtn = document.querySelector('.submit_btn');
    submitBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Book Table';
    
    // Set default time to next available hour
    const timeInput = document.getElementById('reservationTime');
    if (timeInput) {
        const now = new Date();
        const nextHour = now.getHours() + 1;
        timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;
    }
}

function confirmDeleteBooking(id) {
    const booking = bookings.find(b => b.id == id);
    if (!booking) return;
    
    if (confirm(`Are you sure you want to cancel the reservation for ${booking.name} on ${formatDate(booking.date)} at ${formatTimeForInput(booking.time)}?`)) {
        deleteBooking(id)
            .then(() => showAlert('Reservation cancelled successfully', 'success'))
            .catch(error => console.error('Error deleting booking:', error));
    }
}

function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }, 10);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('#nav-menu a');
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('nav');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.zIndex = '1000';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                document.body.style.paddingTop = header.offsetHeight + 'px';
            } else {
                header.style.position = 'relative';
                header.style.boxShadow = 'none';
                header.style.background = 'transparent';
                document.body.style.paddingTop = '0';
            }
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.menu_btn, .offer_btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.menu_card, .offer_card');
            const itemName = card.querySelector('h2, h3').textContent;
            const priceText = card.querySelector('.price, .discounted_price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const image = card.querySelector('img').src;
            
            // Check if item already exists in cart
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
            
            updateCart();
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <img src="${image}" alt="${itemName}">
                    <p>${itemName} added to cart!</p>
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
        });
    });
    
    // Image Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery_image img');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <span class="close-lightbox">&times;</span>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
        });
    });
    
    // Reservation Form Handling
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('reservationDate');
        if (dateInput) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            dateInput.min = `${yyyy}-${mm}-${dd}`;
        }
        
        // Set default time to next available hour
        const timeInput = document.getElementById('reservationTime');
        if (timeInput) {
            const now = new Date();
            const nextHour = now.getHours() + 1;
            timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;
        }
        
        reservationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Get form values
            const formData = {
                name: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                partySize: document.getElementById('partySize').value,
                date: document.getElementById('reservationDate').value,
                time: document.getElementById('reservationTime').value,
                requests: document.getElementById('specialRequests').value.trim()
            };
            
            // Validate form
            let isValid = true;
            
            if (!formData.name) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            if (!formData.email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!validateEmail(formData.email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            if (!formData.phone) {
                document.getElementById('phoneError').textContent = 'Phone is required';
                isValid = false;
            } else if (!validatePhone(formData.phone)) {
                document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            
            if (!formData.partySize) {
                document.getElementById('partySizeError').textContent = 'Please select party size';
                isValid = false;
            }
            
            if (!formData.date) {
                document.getElementById('dateError').textContent = 'Date is required';
                isValid = false;
            }
            
            if (!formData.time) {
                document.getElementById('timeError').textContent = 'Time is required';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit_btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Check if we're editing an existing booking
            const editingId = this.dataset.editingId;
            
            try {
                if (editingId) {
                    // Update existing booking
                    await updateBooking(editingId, formData);
                    showAlert(`Reservation updated successfully for ${formData.name}!`, 'success');
                    resetForm();
                } else {
                    // Create new booking
                    await createBooking(formData);
                    showAlert(`Thank you, ${formData.name}! Your table for ${formData.partySize} on ${formatDate(formData.date)} at ${formData.time} has been reserved.`, 'success');
                    this.reset();
                    
                    // Set default time again after reset
                    const now = new Date();
                    const nextHour = now.getHours() + 1;
                    timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;
                }
                
            } catch (error) {
                console.error('Reservation error:', error);
                // Error message is already shown by the API functions
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Cancel edit button (if you want to add one)
    const cancelEditBtn = document.createElement('button');
    cancelEditBtn.type = 'button';
    cancelEditBtn.className = 'cancel_btn';
    cancelEditBtn.innerHTML = '<i class="fa-solid fa-times"></i> Cancel Edit';
    cancelEditBtn.style.display = 'none';
    cancelEditBtn.addEventListener('click', resetForm);
    
    if (reservationForm) {
        reservationForm.querySelector('.submit_btn').insertAdjacentElement('afterend', cancelEditBtn);
    }
    
    // Show/hide cancel button based on edit mode
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-editing-id') {
                if (reservationForm.dataset.editingId) {
                    cancelEditBtn.style.display = 'block';
                } else {
                    cancelEditBtn.style.display = 'none';
                }
            }
        });
    });
    
    if (reservationForm) {
        observer.observe(reservationForm, { attributes: true });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const subscribeBtn = newsletterForm.querySelector('button');
        
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real app, you would send this to a server
            const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
            if (!subscriptions.includes(email)) {
                subscriptions.push(email);
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
                showAlert('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showAlert('This email is already subscribed.', 'info');
            }
        });
    }
    
    // Initialize cart count and bookings table
    updateCart();
    fetchBookings();
});

// Back to top button functionality
document.querySelector('.back_to_top a')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
});