// ===================================
// Load Dynamic Content from Admin Panel
// ===================================
let websiteData = null;
let currentLang = 'en';

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
    websiteData = getWebsiteData();
    currentLang = websiteData.currentLanguage || 'en';
    renderWebsite();
});

// Initialize animations based on flag
function initAnimations() {
    if (!websiteData.animationsEnabled) {
        // Remove any animation classes if disabled
        document.querySelectorAll('.animate').forEach(el => el.classList.remove('animate', 'visible'));
        return;
    }
    // Add animate class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => el.classList.add('animate'));
    // Trigger visibility on scroll
    const onScroll = () => {
        const triggerPoint = window.innerHeight * 0.8;
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    // Initial check
    onScroll();
}

// Parallax effect for hero background if enabled
function initParallax() {
    if (!websiteData.animationsEnabled) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = `${offset * 0.5}px`;
    });
}

// Call after rendering website
function afterRender() {
    initAnimations();
    initParallax();
}

// Modify renderWebsite to call afterRender
function renderWebsite() {
    renderHero();
    renderAbout();
    renderServices();
    renderPortfolio();
    renderContact();
    renderNavbar();
    renderFooter();

    // Ensure afterRender is called at the end
    afterRender();
}



// Re-observe elements for animations after rendering
setTimeout(() => {
    const fadeElements = document.querySelectorAll('.about-card, .service-card, .portfolio-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        if (observer) observer.observe(el);
    });
}, 100);


function renderHero() {
    const hero = websiteData.hero[currentLang];
    const slogan1 = document.querySelector('.title-line:first-child');
    const slogan2 = document.querySelector('.title-line.highlight');
    const subtitle = document.querySelector('.hero-subtitle');

    if (slogan1) slogan1.textContent = hero.slogan1;
    if (slogan2) slogan2.textContent = hero.slogan2;
    if (subtitle) subtitle.textContent = hero.subtitle;
}

function renderAbout() {
    const about = websiteData.about[currentLang];
    const sectionTag = document.querySelector('#about .section-tag');
    const sectionTitle = document.querySelector('#about .section-title');

    if (sectionTag) sectionTag.textContent = about.sectionTag;
    if (sectionTitle) sectionTitle.textContent = about.sectionTitle;

    const cardsContainer = document.querySelector('.about-content');
    if (cardsContainer && about.cards) {
        cardsContainer.innerHTML = '';
        about.cards.forEach(card => {
            const cardHtml = `
                <div class="about-card glass-card">
                    <div class="card-icon">
                        <i class="fas ${card.icon}"></i>
                    </div>
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            `;
            cardsContainer.innerHTML += cardHtml;
        });
    }
}

function renderServices() {
    const services = websiteData.services[currentLang];
    const sectionTag = document.querySelector('#services .section-tag');
    const sectionTitle = document.querySelector('#services .section-title');

    if (sectionTag) sectionTag.textContent = services.sectionTag;
    if (sectionTitle) sectionTitle.textContent = services.sectionTitle;

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && services.items) {
        servicesGrid.innerHTML = '';
        services.items.forEach(service => {
            const serviceHtml = `
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas ${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="service-hover-line"></div>
                </div>
            `;
            servicesGrid.innerHTML += serviceHtml;
        });
    }
}

function renderPortfolio() {
    const portfolio = websiteData.portfolio[currentLang];
    const sectionTag = document.querySelector('#portfolio .section-tag');
    const sectionTitle = document.querySelector('#portfolio .section-title');

    if (sectionTag) sectionTag.textContent = portfolio.sectionTag;
    if (sectionTitle) sectionTitle.textContent = portfolio.sectionTitle;

    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';

        if (portfolio.items && portfolio.items.length > 0) {
            portfolio.items.forEach(item => {
                const itemHtml = `
                    <div class="portfolio-item">
                        ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
                        <div class="portfolio-overlay">
                            <h4>${item.title || ''}</h4>
                            <p>${item.description || ''}</p>
                        </div>
                    </div>
                `;
                portfolioGrid.innerHTML += itemHtml;
            });
        } else {
            // Show placeholders if no items
            for (let i = 0; i < 6; i++) {
                const placeholderHtml = `
                    <div class="portfolio-item placeholder">
                        <div class="portfolio-overlay">
                            <i class="fas fa-plus"></i>
                            <p>Project Coming Soon</p>
                        </div>
                    </div>
                `;
                portfolioGrid.innerHTML += placeholderHtml;
            }
        }
    }
}

function renderContact() {
    const contact = websiteData.contact[currentLang];
    const sectionTag = document.querySelector('#contact .section-tag');
    const sectionTitle = document.querySelector('#contact .section-title');
    const heading = document.querySelector('.contact-info h3');
    const description = document.querySelector('.contact-info > p');

    if (sectionTag) sectionTag.textContent = contact.sectionTag;
    if (sectionTitle) sectionTitle.textContent = contact.sectionTitle;
    if (heading) heading.textContent = contact.heading;
    if (description) description.textContent = contact.description;

    // Update contact details
    const emailEl = document.querySelector('.info-item:nth-child(3) p');
    const phoneEl = document.querySelector('.info-item:nth-child(4) p');
    const locationEl = document.querySelector('.info-item:nth-child(5) p');

    if (emailEl) emailEl.textContent = contact.email;
    if (phoneEl) phoneEl.textContent = contact.phone;
    if (locationEl) locationEl.textContent = contact.location;

    // Update social links
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks.length >= 4 && contact.socialLinks) {
        socialLinks[0].href = contact.socialLinks.facebook;
        socialLinks[1].href = contact.socialLinks.instagram;
        socialLinks[2].href = contact.socialLinks.twitter;
        socialLinks[3].href = contact.socialLinks.linkedin;
    }
}

function renderNavbar() {
    const navbar = websiteData.navbar[currentLang];
    const navLinks = document.querySelectorAll('.nav-link');

    if (navLinks.length >= 5 && navbar) {
        navLinks[0].textContent = navbar.home;
        navLinks[1].textContent = navbar.about;
        navLinks[2].textContent = navbar.services;
        navLinks[3].textContent = navbar.portfolio;
        navLinks[4].textContent = navbar.contact;
    }
}

function renderFooter() {
    const footer = websiteData.footer[currentLang];
    const footerText = document.querySelector('.footer p');

    if (footerText && footer) {
        footerText.innerHTML = footer.text;
    }
}

// ===================================
// Smooth Scroll Navigation
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');

                // Update active link
                updateActiveLink(this);
            }
        });
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Active Link Update on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink(clickedLink = null) {
    if (clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
        return;
    }

    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateActiveLink();
});

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'rgba(242, 195, 74, 0.95)' : 'rgba(220, 53, 69, 0.95)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===================================
// Parallax Effect for Hero
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Language Switching
// ===================================
const langSwitch = document.getElementById('langSwitch');
const langText = document.getElementById('langText');

// Initialize language from saved preference or default to English
if (websiteData && websiteData.currentLanguage) {
    currentLang = websiteData.currentLanguage;
    updateLanguageUI();
}

// Language switch button click handler
if (langSwitch) {
    langSwitch.addEventListener('click', () => {
        // Toggle language
        currentLang = currentLang === 'en' ? 'ar' : 'en';

        // Update UI
        updateLanguageUI();

        // Re-render website with new language
        renderWebsite();

        // Save language preference
        websiteData.currentLanguage = currentLang;
        saveData(websiteData);

        // Show notification
        showNotification(
            currentLang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English',
            'success'
        );
    });
}

function updateLanguageUI() {
    // Update button text
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }

    // Update HTML direction for RTL support
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
}
