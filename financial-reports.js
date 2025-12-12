document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const reportCards = document.querySelectorAll('.report-card');
    const annualCards = document.querySelectorAll('.annual-card');
    const highlightCards = document.querySelectorAll('.highlight-card');
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
            }, index * 300);
        }
    });
    
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
                
                // Animate metric values
                if (entry.target.classList.contains('report-card') || entry.target.classList.contains('annual-card')) {
                    const metricValues = entry.target.querySelectorAll('.metric-value');
                    metricValues.forEach((value, index) => {
                        setTimeout(() => {
                            animateMetricValue(value);
                        }, index * 200);
                    });
                }
                
                // Animate highlight values
                if (entry.target.classList.contains('highlight-card')) {
                    const highlightValue = entry.target.querySelector('.highlight-value');
                    if (highlightValue) {
                        animateHighlightValue(highlightValue);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards
    [...reportCards, ...annualCards, ...highlightCards].forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effects to cards
    reportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    annualCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animations to buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const summaryBtns = document.querySelectorAll('.summary-btn');
    
    [...downloadBtns, ...viewBtns, ...summaryBtns].forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading animation
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            // Simulate download/view
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                showMessage('Document opened successfully!', 'success');
            }, 1500);
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Create floating data particles
    createDataParticles();
    
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
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        
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
            animateNumber(element, 0, number, unit, 1200);
        }, 200);
    }
}

// Animate highlight values
function animateHighlightValue(element) {
    const text = element.textContent;
    const match = text.match(/([0-9.]+)([A-Za-z%+]*)/);
    
    if (match) {
        const number = parseFloat(match[1]);
        const unit = match[2];
        
        element.textContent = '0' + unit;
        
        setTimeout(() => {
            animateNumber(element, 0, number, unit, 1500);
        }, 300);
    }
}

// Create floating data particles
function createDataParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(52, 211, 153, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: floatDataParticle ${12 + Math.random() * 18}s linear infinite;
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
    }, 80);
}

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
        background-color: ${type === 'success' ? '#34d399' : '#ef4444'};
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

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInFromRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutToRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes floatDataParticle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .report-card {
        transition: all 0.3s ease;
    }
    
    .annual-card {
        transition: all 0.3s ease;
    }
    
    .highlight-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

