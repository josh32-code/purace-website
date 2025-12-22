document.addEventListener('DOMContentLoaded', () => {
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Stripe Payment Link Integration
    const stripeBuyButtons = document.querySelectorAll('.stripe-buy-btn');
    
    stripeBuyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const stripeLink = this.getAttribute('data-stripe-link');
            const productName = this.getAttribute('data-product');
            
            // Check if Stripe link is configured
            if (!stripeLink || stripeLink.startsWith('YOUR_STRIPE_LINK')) {
                alert('Payment link not yet configured. Please set up your Stripe Payment Links first.');
                console.log('Product:', productName, '- Stripe link needs to be added');
                return;
            }
            
            // Redirect to Stripe Payment Link
            window.location.href = stripeLink;
        });
    });
    
    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Toggle current item
            item.classList.toggle('active');

            // Update icon
            const icon = this.querySelector('.icon');
            if (item.classList.contains('active')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });

    // Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Product Gallery Thumbnail Logic
    const thumbnails = document.querySelectorAll('.thumbnails img, .thumbnails video');
    const mainImageContainer = document.querySelector('.main-image');
    let mainImage = mainImageContainer.querySelector('img');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active state from all thumbnails
                thumbnails.forEach(t => t.style.opacity = '0.7');
                
                // Set active state on clicked thumbnail
                this.style.opacity = '1';
                
                // Update main image/video
                if (this.tagName === 'VIDEO') {
                    // Replace image with video
                    const video = document.createElement('video');
                    video.src = this.src;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'contain';
                    video.style.objectPosition = 'center';
                    video.style.display = 'block';
                    
                    mainImageContainer.innerHTML = '';
                    mainImageContainer.appendChild(video);
                } else {
                    // Replace with image
                    if (mainImageContainer.querySelector('video')) {
                        mainImageContainer.innerHTML = '<img src="" alt="">';
                        mainImage = mainImageContainer.querySelector('img');
                    }
                    mainImage.src = this.src.replace('_thumb', '');
                    mainImage.alt = this.alt;
                }
            });
        });
        
        // Set first thumbnail as active by default
        if (thumbnails[0]) {
            thumbnails[0].style.opacity = '1';
        }
    }

    // Image Zoom Functionality
    const mainImageContainerForZoom = document.querySelector('.main-image');
    
    if (mainImageContainerForZoom) {
        // Create zoom modal
        const zoomModal = document.createElement('div');
        zoomModal.className = 'zoom-modal';
        zoomModal.innerHTML = `
            <span class="zoom-close">&times;</span>
            <img src="" alt="Zoomed product image">
        `;
        document.body.appendChild(zoomModal);
        
        const zoomModalImg = zoomModal.querySelector('img');
        const closeBtn = zoomModal.querySelector('.zoom-close');
        
        // Open zoom on click
        mainImageContainerForZoom.addEventListener('click', function() {
            const currentImage = this.querySelector('img');
            if (currentImage) {
                zoomModalImg.src = currentImage.src;
                zoomModalImg.alt = currentImage.alt;
                zoomModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close zoom
        const closeZoom = () => {
            zoomModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeZoom);
        zoomModal.addEventListener('click', function(e) {
            if (e.target === zoomModal) {
                closeZoom();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && zoomModal.classList.contains('active')) {
                closeZoom();
            }
        });
    }
});
