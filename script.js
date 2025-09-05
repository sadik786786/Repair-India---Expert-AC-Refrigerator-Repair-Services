// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', function() {
        const visibility = navLinks.getAttribute('data-visible');
        
        if (visibility === 'false') {
            navLinks.setAttribute('data-visible', 'true');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navLinks.setAttribute('data-visible', 'false');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            
            // Toggle active class on FAQ item
            faqItem.classList.toggle('active');
            
            // Toggle icon
            const icon = question.querySelector('i');
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                faqAnswer.style.maxHeight = 0;
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile nav if open
                if (navLinks.getAttribute('data-visible') === 'true') {
                    navLinks.setAttribute('data-visible', 'false');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Scroll to target
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Initialize FAQ answers to be closed
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = 0;
    });
    
    // Form validation for newsletter (if needed)
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && isValidEmail(emailInput.value)) {
                // Here you would typically send the data to a server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Animation on scroll (basic implementation)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .feature, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation check on scroll and load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});