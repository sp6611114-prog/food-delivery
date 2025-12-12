document.addEventListener('DOMContentLoaded', function() {
    // Animated counters for metrics
    const metricValues = document.querySelectorAll('.metric-value');
    const presentationStats = document.querySelectorAll('.stat-number');
    
    // Animation observer
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all metric values
    metricValues.forEach(value => observer.observe(value));
    presentationStats.forEach(stat => observer.observe(stat));
    
    // Animate numeric values
    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasCurrency = text.includes('₹') || text.includes('Cr');
        const hasK = text.includes('K');
        const hasM = text.includes('M');
        
        let numericValue = parseFloat(text.replace(/[^\d.]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let startValue = 0;
        let endValue = numericValue;
        let duration = 2000;
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const currentValue = startValue + (endValue - startValue) * easeOutQuart(progress);
            
            let displayValue = Math.floor(currentValue);
            let suffix = '';
            
            if (hasK) suffix = 'K+';
            else if (hasM) suffix = 'M+';
            else if (hasPlus && !hasPercent) suffix = '+';
            else if (hasPercent) suffix = '%';
            else if (hasCurrency && text.includes('Cr')) suffix = ' Cr';
            
            if (hasCurrency && text.includes('₹')) {
                element.textContent = `₹${displayValue}${suffix}`;
            } else {
                element.textContent = `${displayValue}${suffix}`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Easing function
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Scroll animations for cards
    const cards = document.querySelectorAll('.presentation-card, .event-item, .metric-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Interactive hover effects for presentation cards
    const presentationCards = document.querySelectorAll('.presentation-card');
    
    presentationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    console.log('Investor Presentations page loaded successfully!');
});

