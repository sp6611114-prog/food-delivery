document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const heroSection = document.querySelector('.hero-section');
    
    // Background slideshow functionality
    const backgroundImages = [
        './images/Restaurant images/R.jpg',
        './images/Restaurant images/R2.jpg',
        './images/Restaurant images/R 1.jpg',
        './images/Restaurant images/R 3.jpg',
        './images/Restaurant images/R 4.jpg',
        './images/Restaurant images/R 5.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Function to change background image
    function changeBackgroundImage() {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        const gradient = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
        heroSection.style.backgroundImage = `${gradient}, url('${backgroundImages[currentImageIndex]}')`;
        
        // Add a small delay to ensure smooth transition
        heroSection.style.opacity = '0.9';
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Change background every 4 seconds
    setInterval(changeBackgroundImage, 4000);
    
    // Preload images for smoother transitions
    function preloadImages() {
        backgroundImages.forEach((imageSrc, index) => {
            const img = new Image();
            img.onload = function() {
                console.log(`Image ${index + 1} loaded: ${imageSrc}`);
            };
            img.onerror = function() {
                console.error(`Failed to load image: ${imageSrc}`);
            };
            img.src = imageSrc;
        });
    }
    
    // Preload images on page load
    preloadImages();
    
    // Test image loading
    console.log('Background images array:', backgroundImages);
    
    // Test first image immediately
    const testImg = new Image();
    testImg.onload = function() {
        console.log('First image loaded successfully:', backgroundImages[0]);
        // Set initial background
        const gradient = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
        heroSection.style.backgroundImage = `${gradient}, url('${backgroundImages[0]}')`;
    };
    testImg.onerror = function() {
        console.error('Failed to load first image:', backgroundImages[0]);
        // Try different path formats
        const paths = [
            backgroundImages[0],
            backgroundImages[0].replace('./', ''),
            backgroundImages[0].replace('./images/', 'images/'),
            backgroundImages[0].replace('./images/', '../images/')
        ];
        
        let pathIndex = 0;
        const tryNextPath = () => {
            if (pathIndex < paths.length) {
                const testPathImg = new Image();
                testPathImg.onload = function() {
                    console.log('Image loaded with path:', paths[pathIndex]);
                    const gradient = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
                    heroSection.style.backgroundImage = `${gradient}, url('${paths[pathIndex]}')`;
                };
                testPathImg.onerror = function() {
                    pathIndex++;
                    tryNextPath();
                };
                testPathImg.src = paths[pathIndex];
            } else {
                console.error('All image paths failed');
            }
        };
        tryNextPath();
    };
    testImg.src = backgroundImages[0];
    
    // Add smooth transition effect
    heroSection.style.transition = 'background-image 1s ease-in-out';
    
    // Add click to change background functionality
    heroSection.addEventListener('click', function(e) {
        if (e.target === heroSection || e.target.closest('.hero-content')) {
            changeBackgroundImage();
        }
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            
            // Filter restaurant cards
            restaurantCards.forEach(card => {
                const cuisine = card.querySelector('.cuisine').textContent.toLowerCase();
                
                if (filter === 'all' || cuisine.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        restaurantCards.forEach(card => {
            const restaurantName = card.querySelector('h3').textContent.toLowerCase();
            const cuisine = card.querySelector('.cuisine').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            
            if (restaurantName.includes(searchTerm) || 
                cuisine.includes(searchTerm) || 
                location.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Search button click
    searchBtn.addEventListener('click', performSearch);
    
    // Search input enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Real-time search as user types
    searchInput.addEventListener('input', function() {
        if (this.value.length > 2) {
            performSearch();
        } else if (this.value.length === 0) {
            // Show all restaurants when search is cleared
            restaurantCards.forEach(card => {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            });
        }
    });
    
    // Add hover effects to restaurant cards
    restaurantCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        restaurantCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe filter section
    const filtersSection = document.querySelector('.filters-section');
    if (filtersSection) {
        observer.observe(filtersSection);
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .restaurant-card {
        transition: all 0.3s ease;
    }
    
    .filter-btn {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
