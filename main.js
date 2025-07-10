// Main JavaScript file for L'Opera Restaurant website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initMapFallback();
    
    // Add loading animation
    document.body.classList.add('loading');
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe contact sections
    const contactSections = document.querySelectorAll('.contact-info, .map-container');
    contactSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(section);
    });
}

// Map fallback functionality
function initMapFallback() {
    const mapFrame = document.querySelector('iframe');
    
    if (mapFrame) {
        mapFrame.addEventListener('error', function() {
            console.log('Map failed to load, showing fallback');
            showMapFallback();
        });
        
        // Add click tracking for external map link
        const mapLink = document.querySelector('a[href*="google.com/maps"]');
        if (mapLink) {
            mapLink.addEventListener('click', function() {
                console.log('External map link clicked');
                // You can add analytics tracking here
            });
        }
    }
}

// Show map fallback if Google Maps fails to load
function showMapFallback() {
    const mapWrapper = document.querySelector('.map-wrapper');
    if (mapWrapper) {
        mapWrapper.innerHTML = `
            <div class="map-fallback d-flex align-items-center justify-content-center" style="height: 300px; background: #f8f9fa; border-radius: 10px;">
                <div class="text-center">
                    <i class="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                    <h5>Via Luciano Venanti, 12</h5>
                    <p class="text-muted">06135 Ponte San Giovanni (PG)</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Via+Luciano+Venanti+12,+06135+Ponte+San+Giovanni+PG,+Italy" 
                       target="_blank" 
                       class="btn btn-primary">
                        <i class="fas fa-external-link-alt me-2"></i>
                        Apri in Google Maps
                    </a>
                </div>
            </div>
        `;
    }
}

// Phone number formatting and validation
function formatPhoneNumber(phone) {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format Italian phone number
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}${cleaned.slice(6, 10)}`;
    }
    
    return phone;
}

// Click tracking for phone numbers
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="tel:"]')) {
        console.log('Phone number clicked:', e.target.closest('a[href^="tel:"]').href);
        // You can add analytics tracking here
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.btn, .phone-link, .gallery-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // You can add a placeholder or retry logic here
        });
    });
});
