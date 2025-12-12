document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const orderBtn = document.querySelector('.order-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const reviewCards = document.querySelectorAll('.review-card');
    
    // Order button functionality
    orderBtn.addEventListener('click', function() {
        // Add loading animation
        this.innerHTML = 'Processing...';
        this.style.opacity = '0.7';
        this.disabled = true;
        
        // Simulate order processing
        setTimeout(() => {
            this.innerHTML = 'Order Placed! 🎉';
            this.style.background = '#4CAF50';
            this.style.color = 'white';
            
            // Show success message
            showMessage('Order placed successfully! You will receive a confirmation shortly.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.innerHTML = 'Order Now';
                this.style.background = 'white';
                this.style.color = '#ff6b6b';
                this.style.opacity = '1';
                this.disabled = false;
            }, 3000);
        }, 2000);
    });
    
    // Menu item hover effects
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Review cards animation
    reviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
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
    
    // Observe sections
    const sections = document.querySelectorAll('.info-section, .menu-section, .reviews-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.restaurant-hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add floating animation to menu items
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('float-animation');
    });
    
    // Add spice particle animation
    createSpiceParticles();
});

// Message display function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.textContent = message;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 4000);
}

// Create spice particles animation
function createSpiceParticles() {
    const hero = document.querySelector('.restaurant-hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        hero.appendChild(particle);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes floatParticle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .float-animation {
        animation: floatUp 3s ease-in-out infinite;
    }
    
    @keyframes floatUp {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

