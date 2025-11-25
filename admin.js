// ===================================
// Admin Panel JavaScript
// ===================================

let currentData = getWebsiteData();
let currentLanguage = 'en';
const ADMIN_PASSWORD = localStorage.getItem('adminPassword') || 'kiva2025';

// ===================================
// Login System
// ===================================
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;

    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAllData();
        showToast('Welcome to Kiva Admin Panel!', 'success');
    } else {
        showToast('Incorrect password!', 'error');
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
});

// ===================================
// Navigation
// ===================================
const navButtons = document.querySelectorAll('.nav-btn');
const editorSections = document.querySelectorAll('.editor-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;

        // Update active button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding section
        editorSections.forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}Editor`).classList.add('active');
    });
});

// ===================================
// Language Switching
// ===================================
document.getElementById('languageSelect').addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    loadAllData();
    showToast(`Switched to ${currentLanguage === 'en' ? 'English' : 'Arabic'}`, 'success');
});

// ===================================
// Load All Data
// ===================================
function loadAllData() {
    currentData = getWebsiteData();
    loadHeroData();
    loadAboutData();
    loadServicesData();
    loadPortfolioData();
    loadContactData();
    loadNavbarData();
}

// ===================================
// Hero Section
// ===================================
function loadHeroData() {
    const hero = currentData.hero[currentLanguage];
    document.getElementById('heroSlogan1').value = hero.slogan1;
    document.getElementById('heroSlogan2').value = hero.slogan2;
    document.getElementById('heroSubtitle').value = hero.subtitle;
}

function saveHeroData() {
    currentData.hero[currentLanguage] = {
        slogan1: document.getElementById('heroSlogan1').value,
        slogan2: document.getElementById('heroSlogan2').value,
        subtitle: document.getElementById('heroSubtitle').value
    };
}

// ===================================
// About Section
// ===================================
function loadAboutData() {
    const about = currentData.about[currentLanguage];
    document.getElementById('aboutTag').value = about.sectionTag;
    document.getElementById('aboutTitle').value = about.sectionTitle;

    const container = document.getElementById('aboutCards');
    container.innerHTML = '';

    about.cards.forEach((card, index) => {
        const cardHtml = `
            <div class="edit-card">
                <h3>Card ${index + 1}</h3>
                <div class="form-group">
                    <label>Icon (Font Awesome class)</label>
                    <div class="icon-selector">
                        <div class="icon-preview">
                            <i class="fas ${card.icon}"></i>
                        </div>
                        <input type="text" class="form-control about-icon" data-index="${index}" 
                               value="${card.icon}" placeholder="fa-lightbulb">
                    </div>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control about-title" data-index="${index}" 
                           value="${card.title}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control about-desc" data-index="${index}" 
                              rows="4">${card.description}</textarea>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });

    // Add icon preview update
    document.querySelectorAll('.about-icon').forEach(input => {
        input.addEventListener('input', (e) => {
            const preview = e.target.closest('.icon-selector').querySelector('.icon-preview i');
            preview.className = `fas ${e.target.value}`;
        });
    });
}

function saveAboutData() {
    currentData.about[currentLanguage].sectionTag = document.getElementById('aboutTag').value;
    currentData.about[currentLanguage].sectionTitle = document.getElementById('aboutTitle').value;

    const cards = [];
    document.querySelectorAll('.about-icon').forEach((input, index) => {
        cards.push({
            icon: document.querySelector(`.about-icon[data-index="${index}"]`).value,
            title: document.querySelector(`.about-title[data-index="${index}"]`).value,
            description: document.querySelector(`.about-desc[data-index="${index}"]`).value
        });
    });

    currentData.about[currentLanguage].cards = cards;
}

// ===================================
// Services Section
// ===================================
function loadServicesData() {
    const services = currentData.services[currentLanguage];
    document.getElementById('servicesTag').value = services.sectionTag;
    document.getElementById('servicesTitle').value = services.sectionTitle;

    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';

    services.items.forEach((service, index) => {
        container.appendChild(createServiceCard(service, index));
    });
}

function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'edit-item';
    card.innerHTML = `
        <div class="card-header">
            <h3>Service ${index + 1}</h3>
            <button class="delete-btn" onclick="deleteService(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
        <div class="form-group">
            <label>Icon (Font Awesome class)</label>
            <div class="icon-selector">
                <div class="icon-preview">
                    <i class="fas ${service.icon}"></i>
                </div>
                <input type="text" class="form-control service-icon" data-index="${index}" 
                       value="${service.icon}" placeholder="fa-palette">
            </div>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control service-title" data-index="${index}" 
                   value="${service.title}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control service-desc" data-index="${index}" 
                      rows="3">${service.description}</textarea>
        </div>
    `;

    // Icon preview update
    const iconInput = card.querySelector('.service-icon');
    iconInput.addEventListener('input', (e) => {
        const preview = e.target.closest('.icon-selector').querySelector('.icon-preview i');
        preview.className = `fas ${e.target.value}`;
    });

    return card;
}

function saveServicesData() {
    currentData.services[currentLanguage].sectionTag = document.getElementById('servicesTag').value;
    currentData.services[currentLanguage].sectionTitle = document.getElementById('servicesTitle').value;

    const items = [];
    document.querySelectorAll('.service-icon').forEach((input, index) => {
        items.push({
            icon: document.querySelector(`.service-icon[data-index="${index}"]`).value,
            title: document.querySelector(`.service-title[data-index="${index}"]`).value,
            description: document.querySelector(`.service-desc[data-index="${index}"]`).value
        });
    });

    currentData.services[currentLanguage].items = items;
}

document.getElementById('addServiceBtn').addEventListener('click', () => {
    const newService = {
        icon: 'fa-star',
        title: 'New Service',
        description: 'Service description here'
    };

    currentData.services[currentLanguage].items.push(newService);
    loadServicesData();
    showToast('Service added!', 'success');
});

function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        currentData.services[currentLanguage].items.splice(index, 1);
        loadServicesData();
        showToast('Service deleted!', 'success');
    }
}

// ===================================
// Portfolio Section
// ===================================
function loadPortfolioData() {
    const portfolio = currentData.portfolio[currentLanguage];
    document.getElementById('portfolioTag').value = portfolio.sectionTag;
    document.getElementById('portfolioTitle').value = portfolio.sectionTitle;

    const container = document.getElementById('portfolioContainer');
    container.innerHTML = '';

    portfolio.items.forEach((item, index) => {
        container.appendChild(createPortfolioCard(item, index));
    });
}

function createPortfolioCard(item, index) {
    const card = document.createElement('div');
    card.className = 'edit-item';
    card.innerHTML = `
        <div class="card-header">
            <h3>Project ${index + 1}</h3>
            <button class="delete-btn" onclick="deletePortfolio(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
        <div class="image-upload">
            <div class="image-preview" id="portfolioPreview${index}">
                ${item.image ? `<img src="${item.image}" alt="Preview">` : `
                    <div class="image-placeholder">
                        <i class="fas fa-image"></i>
                        <p>No image uploaded</p>
                    </div>
                `}
            </div>
            <input type="file" id="portfolioFile${index}" accept="image/*" style="display: none;">
            <button class="upload-btn" onclick="document.getElementById('portfolioFile${index}').click()">
                <i class="fas fa-upload"></i> Upload Image
            </button>
        </div>
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="form-control portfolio-title" data-index="${index}" 
                   value="${item.title || ''}">
        </div>
        <div class="form-group">
            <label>Project Description</label>
            <textarea class="form-control portfolio-desc" data-index="${index}" 
                      rows="3">${item.description || ''}</textarea>
        </div>
    `;

    // Image upload handler
    const fileInput = card.querySelector(`#portfolioFile${index}`);
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById(`portfolioPreview${index}`);
                preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                currentData.portfolio[currentLanguage].items[index].image = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    return card;
}

function savePortfolioData() {
    currentData.portfolio[currentLanguage].sectionTag = document.getElementById('portfolioTag').value;
    currentData.portfolio[currentLanguage].sectionTitle = document.getElementById('portfolioTitle').value;

    const items = [];
    document.querySelectorAll('.portfolio-title').forEach((input, index) => {
        const existingItem = currentData.portfolio[currentLanguage].items[index] || {};
        items.push({
            title: document.querySelector(`.portfolio-title[data-index="${index}"]`).value,
            description: document.querySelector(`.portfolio-desc[data-index="${index}"]`).value,
            image: existingItem.image || ''
        });
    });

    currentData.portfolio[currentLanguage].items = items;
}

document.getElementById('addPortfolioBtn').addEventListener('click', () => {
    const newItem = {
        title: 'New Project',
        description: 'Project description',
        image: ''
    };

    currentData.portfolio[currentLanguage].items.push(newItem);
    loadPortfolioData();
    showToast('Portfolio item added!', 'success');
});

function deletePortfolio(index) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
        currentData.portfolio[currentLanguage].items.splice(index, 1);
        loadPortfolioData();
        showToast('Portfolio item deleted!', 'success');
    }
}

// ===================================
// Contact Section
// ===================================
function loadContactData() {
    const contact = currentData.contact[currentLanguage];
    document.getElementById('contactTag').value = contact.sectionTag;
    document.getElementById('contactTitle').value = contact.sectionTitle;
    document.getElementById('contactHeading').value = contact.heading;
    document.getElementById('contactDescription').value = contact.description;
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactLocation').value = contact.location;
    document.getElementById('socialFacebook').value = contact.socialLinks.facebook;
    document.getElementById('socialInstagram').value = contact.socialLinks.instagram;
    document.getElementById('socialTwitter').value = contact.socialLinks.twitter;
    document.getElementById('socialLinkedin').value = contact.socialLinks.linkedin;
}

function saveContactData() {
    currentData.contact[currentLanguage] = {
        sectionTag: document.getElementById('contactTag').value,
        sectionTitle: document.getElementById('contactTitle').value,
        heading: document.getElementById('contactHeading').value,
        description: document.getElementById('contactDescription').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        location: document.getElementById('contactLocation').value,
        socialLinks: {
            facebook: document.getElementById('socialFacebook').value,
            instagram: document.getElementById('socialInstagram').value,
            twitter: document.getElementById('socialTwitter').value,
            linkedin: document.getElementById('socialLinkedin').value
        }
    };
}

// ===================================
// Navbar Section
// ===================================
function loadNavbarData() {
    const navbar = currentData.navbar[currentLanguage];
    document.getElementById('navHome').value = navbar.home;
    document.getElementById('navAbout').value = navbar.about;
    document.getElementById('navServices').value = navbar.services;
    document.getElementById('navPortfolio').value = navbar.portfolio;
    document.getElementById('navContact').value = navbar.contact;
}

function saveNavbarData() {
    currentData.navbar[currentLanguage] = {
        home: document.getElementById('navHome').value,
        about: document.getElementById('navAbout').value,
        services: document.getElementById('navServices').value,
        portfolio: document.getElementById('navPortfolio').value,
        contact: document.getElementById('navContact').value
    };
}

// ===================================
// Save All Data
// ===================================
document.getElementById('saveBtn').addEventListener('click', () => {
    saveHeroData();
    saveAboutData();
    saveServicesData();
    savePortfolioData();
    saveContactData();
    saveNavbarData();

    if (saveData(currentData)) {
        showToast('All changes saved successfully!', 'success');
    } else {
        showToast('Error saving data!', 'error');
    }
});

// ===================================
// Preview Website
// ===================================
document.getElementById('previewBtn').addEventListener('click', () => {
    window.open('index.html', '_blank');
});

// ===================================
// Settings
// ===================================
document.getElementById('exportBtn').addEventListener('click', () => {
    exportData();
    showToast('Data exported successfully!', 'success');
});

document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            await importData(file);
            loadAllData();
            showToast('Data imported successfully!', 'success');
        } catch (error) {
            showToast('Error importing data!', 'error');
        }
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone!')) {
        currentData = resetToDefaults();
        saveData(currentData);
        loadAllData();
        showToast('Data reset to defaults!', 'success');
    }
});

document.getElementById('changePasswordBtn').addEventListener('click', () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 6) {
        localStorage.setItem('adminPassword', newPassword);
        showToast('Password changed successfully!', 'success');
    } else if (newPassword) {
        showToast('Password must be at least 6 characters!', 'error');
    }
});

// ===================================
// Toast Notification
// ===================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// Initialize
// ===================================
window.addEventListener('load', () => {
    // Check if already logged in (for development)
    // Remove this in production
    // document.getElementById('loginScreen').style.display = 'none';
    // document.getElementById('adminPanel').style.display = 'block';
    // loadAllData();
});
