// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mark active link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' || href === '../index.html') {
            if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/blog/') || currentPath.endsWith('/Clair Obscur/')) {
                link.classList.add('active');
            }
        }
    });
    
    // Add click handlers to all images
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.classList.add('clickable-img');
        img.onclick = function() {
            openLightbox(this.src);
        };
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Smooth scroll for navigation links
    const navLinksAnchor = document.querySelectorAll('a[href^="#"]');
    navLinksAnchor.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Hide header on scroll down, show on scroll up
    const header = document.querySelector('.site-header');
    if (header) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down - hide header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling up - show header
                    header.classList.remove('header-hidden');
                }
            } else {
                // Always show header near top
                header.classList.remove('header-hidden');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }
});

// Blog functionality - Lightbox and interactions
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxLoader = document.getElementById('lightboxLoader');

    // Show lightbox immediately
    lightbox.style.display = 'block';
    lightboxImg.style.display = 'none';
    lightboxLoader.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // On mobile/small screens (less than 1080px), use original image
    // On larger screens, use full-size image
    const isMobile = window.innerWidth < 1080;
    const targetSrc = isMobile ? imgSrc : getFullSizeImageUrl(imgSrc);

    // Create new image to preload
    const img = new Image();
    img.onload = function() {
        lightboxImg.src = targetSrc;
        lightboxLoader.style.display = 'none';
        lightboxImg.style.display = 'block';
    };
    img.onerror = function() {
        // If target image fails, fallback to original
        lightboxImg.src = imgSrc;
        lightboxLoader.style.display = 'none';
        lightboxImg.style.display = 'block';
    };
    img.src = targetSrc;
}

function getFullSizeImageUrl(imgSrc) {
    // Parse the URL to extract filename and extension
    const url = new URL(imgSrc, window.location.href);
    const pathname = url.pathname;
    
    // Find the last slash and dot to separate filename and extension
    const lastSlashIndex = pathname.lastIndexOf('/');
    const lastDotIndex = pathname.lastIndexOf('.');
    
    if (lastDotIndex > lastSlashIndex) {
        // Has extension
        const filename = pathname.substring(lastSlashIndex + 1, lastDotIndex);
        const extension = pathname.substring(lastDotIndex);
        const dir = pathname.substring(0, lastSlashIndex + 1);
        
        // Return path with _full suffix
        return url.origin + dir + filename + '_full' + extension;
    }
    
    // No extension, just append _full
    return imgSrc + '_full';
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxLoader = document.getElementById('lightboxLoader');
    
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.style.display = 'none';
    lightboxLoader.style.display = 'flex';
    document.body.style.overflow = 'auto';
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});