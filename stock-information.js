document.addEventListener('DOMContentLoaded', function() {
    // Animated counters for stock metrics
    const metricValues = document.querySelectorAll('.metric-value, .current-price, .stat-value, .target-value');
    
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
    
    // Animate numeric values
    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasCurrency = text.includes('₹') || text.includes('Cr');
        const hasM = text.includes('M');
        const hasX = text.includes('x');
        
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
            
            let displayValue = Math.floor(currentValue * 100) / 100;
            let suffix = '';
            
            if (hasM) suffix = 'M';
            else if (hasX) suffix = 'x';
            else if (hasPlus && hasPercent) suffix = '%)';
            else if (hasPercent) suffix = '%';
            else if (hasCurrency && text.includes('Cr')) suffix = ' Cr';
            else if (hasPlus && !hasPercent) suffix = '';
            
            if (hasCurrency && text.includes('₹')) {
                element.textContent = `₹${displayValue}${suffix}`;
            } else if (hasPlus && hasPercent) {
                element.textContent = `+${displayValue}${suffix}`;
            } else if (hasPlus) {
                element.textContent = `+${displayValue} (+${suffix}`;
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
    
    // Chart button interactions
    const chartButtons = document.querySelectorAll('.chart-btn');
    
    chartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            chartButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Animate chart points
            animateChartPoints();
        });
    });
    
    // Animate chart points
    function animateChartPoints() {
        const points = document.querySelectorAll('.point');
        
        points.forEach((point, index) => {
            // Generate random positions for animation
            const randomBottom = Math.random() * 60 + 20; // 20% to 80%
            const randomLeft = (index * 15) + 10 + (Math.random() * 10); // Spread across chart
            
            setTimeout(() => {
                point.style.transition = 'all 1s ease-in-out';
                point.style.bottom = randomBottom + '%';
                point.style.left = randomLeft + '%';
            }, index * 200);
        });
    }
    
    // Real-time price simulation
    function simulateRealTimePrice() {
        const currentPriceElement = document.querySelector('.current-price');
        const priceChangeElement = document.querySelector('.price-change');
        
        if (!currentPriceElement || !priceChangeElement) return;
        
        let basePrice = 185.50;
        
        setInterval(() => {
            // Generate random price change (-2% to +2%)
            const changePercent = (Math.random() - 0.5) * 4;
            const changeAmount = basePrice * (changePercent / 100);
            const newPrice = basePrice + changeAmount;
            
            // Update price
            currentPriceElement.textContent = `₹${newPrice.toFixed(2)}`;
            
            // Update change
            const totalChange = newPrice - 173.00; // Original price
            const totalChangePercent = (totalChange / 173.00) * 100;
            
            priceChangeElement.textContent = `${totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)} (${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%)`;
            priceChangeElement.className = `price-change ${totalChange >= 0 ? 'positive' : 'negative'}`;
            
            basePrice = newPrice;
        }, 3000); // Update every 3 seconds
    }
    
    // Start real-time simulation
    setTimeout(simulateRealTimePrice, 2000);
    
    // Animate rating progress bars
    function animateRatingBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = targetWidth;
            }, index * 200);
        });
    }
    
    // Observe rating section
    const ratingSection = document.querySelector('.analyst-section');
    if (ratingSection) {
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRatingBars();
                }
            });
        }, { threshold: 0.3 });
        
        ratingObserver.observe(ratingSection);
    }
    
    // Card hover effects
    const cards = document.querySelectorAll('.stat-card, .news-item, .analyst-summary, .price-targets');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Scroll animations for cards
    const animatedCards = document.querySelectorAll('.stock-overview, .chart-container, .stat-card, .news-item');
    
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
    animatedCards.forEach(card => {
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
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
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
    
    console.log('Stock Information page loaded successfully!');
});

