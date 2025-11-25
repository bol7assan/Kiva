// Default website data structure with bilingual support
const defaultData = {
    currentLanguage: 'en',
    // Animation toggle
    animationsEnabled: true,

    // Hero Section
    hero: {
        en: {
            slogan1: "We don't create ads…",
            slogan2: "We create moments.",
            subtitle: "Transforming brands into unforgettable experiences"
        },
        ar: {
            slogan1: "نحن لا نصنع إعلانات…",
            slogan2: "نحن نصنع لحظات.",
            subtitle: "نحول العلامات التجارية إلى تجارب لا تُنسى"
        }
    },

    // About Section
    about: {
        en: {
            sectionTag: "Who We Are",
            sectionTitle: "About Kiva",
            cards: [
                {
                    icon: "fa-lightbulb",
                    title: "Our Vision",
                    description: "At Kiva, we believe in the power of storytelling. Every brand has a unique story, and we're here to tell it in the most compelling way possible. We don't just market products—we create emotional connections that last."
                },
                {
                    icon: "fa-rocket",
                    title: "Our Mission",
                    description: "To revolutionize the marketing landscape by crafting moments that resonate, inspire, and drive action. We combine creativity with data-driven strategies to deliver results that exceed expectations."
                },
                {
                    icon: "fa-trophy",
                    title: "Our Promise",
                    description: "Excellence in every detail. From concept to execution, we ensure your brand stands out in a crowded marketplace with authenticity, innovation, and measurable impact."
                }
            ]
        },
        ar: {
            sectionTag: "من نحن",
            sectionTitle: "عن كيفا",
            cards: [
                {
                    icon: "fa-lightbulb",
                    title: "رؤيتنا",
                    description: "في كيفا، نؤمن بقوة سرد القصص. كل علامة تجارية لديها قصة فريدة، ونحن هنا لنرويها بأكثر الطرق إقناعاً. نحن لا نسوق المنتجات فقط - بل نخلق روابط عاطفية تدوم."
                },
                {
                    icon: "fa-rocket",
                    title: "مهمتنا",
                    description: "إحداث ثورة في مشهد التسويق من خلال صياغة لحظات تلقى صدى وتلهم وتدفع إلى العمل. نجمع بين الإبداع والاستراتيجيات القائمة على البيانات لتقديم نتائج تفوق التوقعات."
                },
                {
                    icon: "fa-trophy",
                    title: "وعدنا",
                    description: "التميز في كل التفاصيل. من المفهوم إلى التنفيذ، نضمن أن تبرز علامتك التجارية في سوق مزدحم بالأصالة والابتكار والتأثير القابل للقياس."
                }
            ]
        }
    },

    // Services Section
    services: {
        en: {
            sectionTag: "What We Do",
            sectionTitle: "Our Services",
            items: [
                {
                    icon: "fa-palette",
                    title: "Brand Identity",
                    description: "Crafting unique visual identities that capture your brand's essence and resonate with your audience."
                },
                {
                    icon: "fa-bullhorn",
                    title: "Digital Marketing",
                    description: "Strategic campaigns across all digital channels to maximize reach and engagement."
                },
                {
                    icon: "fa-video",
                    title: "Content Creation",
                    description: "Compelling visual and written content that tells your story and drives conversions."
                },
                {
                    icon: "fa-chart-line",
                    title: "Analytics & Strategy",
                    description: "Data-driven insights and strategic planning to optimize your marketing performance."
                },
                {
                    icon: "fa-mobile-alt",
                    title: "Social Media",
                    description: "Building engaged communities and managing your brand presence across social platforms."
                },
                {
                    icon: "fa-pen-fancy",
                    title: "Creative Consulting",
                    description: "Expert guidance to elevate your creative vision and bring innovative ideas to life."
                }
            ]
        },
        ar: {
            sectionTag: "ما نقدمه",
            sectionTitle: "خدماتنا",
            items: [
                {
                    icon: "fa-palette",
                    title: "الهوية التجارية",
                    description: "صياغة هويات بصرية فريدة تلتقط جوهر علامتك التجارية وتلقى صدى لدى جمهورك."
                },
                {
                    icon: "fa-bullhorn",
                    title: "التسويق الرقمي",
                    description: "حملات استراتيجية عبر جميع القنوات الرقمية لتعظيم الوصول والمشاركة."
                },
                {
                    icon: "fa-video",
                    title: "إنشاء المحتوى",
                    description: "محتوى مرئي ومكتوب مقنع يروي قصتك ويحفز التحويلات."
                },
                {
                    icon: "fa-chart-line",
                    title: "التحليلات والاستراتيجية",
                    description: "رؤى قائمة على البيانات وتخطيط استراتيجي لتحسين أداء التسويق الخاص بك."
                },
                {
                    icon: "fa-mobile-alt",
                    title: "وسائل التواصل الاجتماعي",
                    description: "بناء مجتمعات متفاعلة وإدارة تواجد علامتك التجارية عبر المنصات الاجتماعية."
                },
                {
                    icon: "fa-pen-fancy",
                    title: "الاستشارات الإبداعية",
                    description: "إرشادات الخبراء لرفع مستوى رؤيتك الإبداعية وإحياء الأفكار المبتكرة."
                }
            ]
        }
    },

    // Portfolio Section
    portfolio: {
        en: {
            sectionTag: "Our Work",
            sectionTitle: "Portfolio",
            items: []
        },
        ar: {
            sectionTag: "أعمالنا",
            sectionTitle: "معرض الأعمال",
            items: []
        }
    },

    // Contact Section
    contact: {
        en: {
            sectionTag: "Get In Touch",
            sectionTitle: "Contact Us",
            heading: "Let's Create Something Amazing",
            description: "Ready to transform your brand? We're here to help you create moments that matter.",
            email: "hello@kiva.com",
            phone: "+1 (555) 123-4567",
            location: "123 Creative Street, Marketing City",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                linkedin: "#"
            }
        },
        ar: {
            sectionTag: "تواصل معنا",
            sectionTitle: "اتصل بنا",
            heading: "لنصنع شيئاً مذهلاً معاً",
            description: "هل أنت مستعد لتحويل علامتك التجارية؟ نحن هنا لمساعدتك في خلق لحظات مهمة.",
            email: "hello@kiva.com",
            phone: "+1 (555) 123-4567",
            location: "123 شارع الإبداع، مدينة التسويق",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                linkedin: "#"
            }
        }
    },

    // Navbar
    navbar: {
        en: {
            home: "Home",
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            contact: "Contact"
        },
        ar: {
            home: "الرئيسية",
            about: "من نحن",
            services: "الخدمات",
            portfolio: "الأعمال",
            contact: "اتصل بنا"
        }
    },

    // Footer
    footer: {
        en: {
            text: "© 2025 Kiva. We create moments. All rights reserved."
        },
        ar: {
            text: "© 2025 كيفا. نحن نصنع لحظات. جميع الحقوق محفوظة."
        }
    }
};

// Initialize data from localStorage or use defaults
function initializeData() {
    const savedData = localStorage.getItem('kivaWebsiteData');
    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (e) {
            console.error('Error parsing saved data:', e);
            return defaultData;
        }
    }
    return defaultData;
}

// Save data to localStorage
function saveData(data) {
    try {
        localStorage.setItem('kivaWebsiteData', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving data:', e);
        return false;
    }
}

// Get current website data
function getWebsiteData() {
    return initializeData();
}

// Reset to default data
function resetToDefaults() {
    localStorage.removeItem('kivaWebsiteData');
    return defaultData;
}

// Export data as JSON file
function exportData() {
    const data = getWebsiteData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kiva-website-data.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Import data from JSON file
function importData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                saveData(data);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
