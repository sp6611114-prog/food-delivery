document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const orderBtn = document.querySelector('.order-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const reviewCards = document.querySelectorAll('.review-card');
    
    // Order button functionality with Italian flair
    orderBtn.addEventListener('click', function() {
        // Add loading animation with Italian text
        this.innerHTML = 'Preparando...';
        this.style.opacity = '0.7';
        this.disabled = true;
        
        // Simulate order processing
        setTimeout(() => {
            this.innerHTML = 'Ordine Confermato! 🍕';
            this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            this.style.color = 'white';
            
            // Show success message
            showMessage('Your pizza order has been confirmed! Buon appetito! 🍕', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.innerHTML = 'Order Now';
                this.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                this.style.color = 'white';
                this.style.opacity = '1';
                this.disabled = false;
            }, 3000);
        }, 2000);
    });
    
    // Menu item hover effects with rotation
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(3deg) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
        
        // Add click animation with pizza spin
        item.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
    });
    
    // Review cards animation with staggered effect
    reviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
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
                entry.target.style.animation = 'slideInFromLeft 0.6s ease-out';
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
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add floating animation to menu items
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('float-pizza');
    });
    
    // Create pizza slice particles
    createPizzaParticles();
    
    // Add typing effect to restaurant name
    typeWriterEffect();
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
        animation: slideInFromRight 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 4000);
}

// Create pizza slice particles animation
function createPizzaParticles() {
    const hero = document.querySelector('.restaurant-hero');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '🍕';
        particle.style.cssText = `
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            animation: floatPizzaSlice ${8 + Math.random() * 12}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.6;
        `;
        
        hero.appendChild(particle);
    }
}

// Typing effect for restaurant name
function typeWriterEffect() {
    const nameElement = document.querySelector('.restaurant-name');
    const text = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutToRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInFromLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes floatPizzaSlice {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .float-pizza {
        animation: floatPizza 4s ease-in-out infinite;
    }
    
    @keyframes floatPizza {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-8px) rotate(1deg); }
        50% { transform: translateY(-12px) rotate(0deg); }
        75% { transform: translateY(-8px) rotate(-1deg); }
    }
    
    .menu-item {
        transition: all 0.3s ease;
    }
    
    .review-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

