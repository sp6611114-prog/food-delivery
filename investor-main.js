document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navCards = document.querySelectorAll('.nav-card');
    const metricCards = document.querySelectorAll('.metric-card');
    const newsCards = document.querySelectorAll('.news-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    // Animate stat numbers on load
    statItems.forEach((item, index) => {
        const numberElement = item.querySelector('.stat-number');
        const finalNumber = numberElement.textContent;
        
        // Extract number and unit
        const match = finalNumber.match(/([0-9.]+)([A-Za-z%+]*)/);
        if (match) {
            const number = parseFloat(match[1]);
            const unit = match[2];
            
            numberElement.textContent = '0' + unit;
            
            setTimeout(() => {
                animateNumber(numberElement, 0, number, unit, 2000);
            }, index * 200);
        }
    });
    
    // Animate metric cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
                
                // Animate metric values
                if (entry.target.classList.contains('metric-card')) {
                    const valueElement = entry.target.querySelector('.metric-value');
                    if (valueElement) {
                        animateMetricValue(valueElement);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards
    [...metricCards, ...newsCards].forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effects to navigation cards
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add floating animation to cards
    metricCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('float-card');
    });
    
    // Create floating particles
    createFloatingParticles();
    
    // Add typing effect to hero title
    typeWriterEffect();
});

// Animate number counting
function animateNumber(element, start, end, unit, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        element.textContent = formatNumber(current) + unit;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Format number for display
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toFixed(1);
    }
}

// Animate metric values
function animateMetricValue(element) {
    const text = element.textContent;
    const match = text.match(/([0-9.]+)([A-Za-z%+]*)/);
    
    if (match) {
        const number = parseFloat(match[1]);
        const unit = match[2];
        
        element.textContent = '0' + unit;
        
        setTimeout(() => {
            animateNumber(element, 0, number, unit, 1500);
        }, 200);
    }
}

// Create floating particles
function createFloatingParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        hero.appendChild(particle);
    }
}

// Typing effect for hero title
function typeWriterEffect() {
    const titleElement = document.querySelector('.hero-title');
    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes floatParticle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .float-card {
        animation: floatCard 6s ease-in-out infinite;
    }
    
    @keyframes floatCard {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .nav-card {
        transition: all 0.3s ease;
    }
    
    .metric-card {
        transition: all 0.3s ease;
    }
    
    .news-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

