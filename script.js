// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Language Switcher
const langSwitch = document.getElementById('langSwitch');
const langText = document.getElementById('langText');
const htmlTag = document.documentElement;
let currentLang = 'en';

langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    switchLanguage(currentLang);
});

function switchLanguage(lang) {
    // Update HTML attributes
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update button text
    langText.textContent = lang === 'en' ? 'العربية' : 'English';

    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
        } else {
            element.innerHTML = element.getAttribute(`data-${lang}`);
        }
    });

    // Update placeholders separately
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
    });

    // Save preference
    localStorage.setItem('preferredLanguage', lang);

    // Re-initialize Lucide icons after DOM changes
    lucide.createIcons();
}

// Projects See More Functionality
function initProjectsSeeMore() {
    const projectsPerView = 3;

    function setupGrid(gridId, buttonWrapperId) {
        const grid = document.getElementById(gridId);
        const buttonWrapper = document.getElementById(buttonWrapperId);
        if (!grid || !buttonWrapper) return;

        const cards = grid.querySelectorAll('.project-card');
        const seeMoreBtn = buttonWrapper.querySelector('.see-more-btn');

        // اخفي المشاريع اللي بعد التالت
        if (cards.length > projectsPerView) {
            cards.forEach((card, index) => {
                if (index >= projectsPerView) {
                    card.classList.add('hidden-project');
                }
            });
            buttonWrapper.style.display = 'flex';

            // زرار See More
            seeMoreBtn.addEventListener('click', function () {
                const hiddenCards = grid.querySelectorAll('.project-card.hidden-project');
                const btnSpan = this.querySelector('span');
                const btnIcon = this.querySelector('i');

                if (hiddenCards.length > 0) {
                    // اعرض الباقي
                    hiddenCards.forEach(card => card.classList.remove('hidden-project'));
                    btnSpan.setAttribute('data-en', 'Show Less');
                    btnSpan.setAttribute('data-ar', 'عرض أقل');
                    btnSpan.textContent = currentLang === 'en' ? 'Show Less' : 'عرض أقل';
                    btnIcon.setAttribute('data-lucide', 'chevron-up');
                } else {
                    // اخفي تاني
                    cards.forEach((card, index) => {
                        if (index >= projectsPerView) {
                            card.classList.add('hidden-project');
                        }
                    });
                    btnSpan.setAttribute('data-en', 'See More');
                    btnSpan.setAttribute('data-ar', 'عرض المزيد');
                    btnSpan.textContent = currentLang === 'en' ? 'See More' : 'عرض المزيد';
                    btnIcon.setAttribute('data-lucide', 'chevron-down');

                    // Scroll للقسم
                    grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                lucide.createIcons();
            });
        }
    }

    // اعمل Setup للقسمين
    setupGrid('designGrid', 'designSeeMore');
    setupGrid('detailingGrid', 'detailingSeeMore');
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
        currentLang = savedLang;
        switchLanguage(savedLang);
    }
    initProjectsSeeMore();
});