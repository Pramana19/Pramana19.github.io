window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('opacity-0');
        setTimeout(() => {
            preloader.style.display = 'none';
            const bapakAnimasi = document.getElementById('bapak-joget');
            if(bapakAnimasi) {
                bapakAnimasi.classList.replace('opacity-0', 'opacity-90');
                bapakAnimasi.classList.add('hover:opacity-100');
            }
        }, 700);
    }, 2000);
});
const lottieAnim = document.getElementById('lottie-animation');
if (lottieAnim) {
    lottieAnim.addEventListener('error', (err) => {
        console.warn('Gagal load Lottie:', err);
        document.getElementById('bapak-joget').style.display = 'none';
    });
    lottieAnim.addEventListener('load', () => {
        console.log('Lottie sukses');
        const bapak = document.getElementById('bapak-joget');
        if (bapak && bapak.classList.contains('opacity-0')) {
            bapak.classList.remove('opacity-0');
            bapak.classList.add('opacity-90');
        }
    });
}

const navLinks = document.querySelectorAll(".nav-link");
const sections = [
    document.getElementById('about'), 
    document.getElementById('projects'), 
    document.getElementById('certifications'), 
    document.getElementById('contact')
].filter(s => s);

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset + 200;

    if (sections.length === 0) return;

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i+1];
        if (scrollPos >= section.offsetTop && (!nextSection || scrollPos < nextSection.offsetTop)) {
            current = "nav-" + section.id;
            break;
        }
    }

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
        current = "nav-contact";
    }

    navLinks.forEach((link) => {
        link.classList.remove("text-cyan-400", "font-bold");
        link.classList.add("text-white");
        if (link.id === current) {
            link.classList.add("text-cyan-400", "font-bold");
            link.classList.remove("text-white");
        }
    });
});

const texts = [
    "Game Developer",
    "EdTech Creator",
    "Cloud & Cybersecurity Enthusiast"
];
let count = 0;
let index = 0;
let isDeleting = false;

function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    
    if (isDeleting) {
        index--;
    } else {
        index++;
    }
    
    let letter = currentText.substring(0, index);
    const typedElement = document.getElementById("typed-text");
    if(typedElement) typedElement.innerHTML = letter;
    
    if (!isDeleting && letter.length === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
type();

(function() {
    emailjs.init("AASQ8JEpWaWMr7ACA");
})();

const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if(sendBtn && contactForm) {
    sendBtn.addEventListener('click', function() {
        const btn = this;
        const originalText = btn.innerHTML;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('❌ Semua field harus diisi!');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('❌ Format email tidak valid!');
            document.getElementById('email').focus(); 
            return;
        }

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        emailjs.send('service_n0w7sqd', 'template_rote2ls', formData)
            .then(function() {
                alert('✅ Pesan berhasil dikirim!');
                contactForm.reset();
            }, function(error) {
                alert('❌ Gagal mengirim pesan.');
                console.error(error);
            })
            .finally(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}

const htmlElement = document.documentElement;
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const placeholderElements = document.querySelectorAll('.placeholder-lang');

if(langToggleBtn) {
    langToggleBtn.addEventListener('click', function() {
        htmlElement.classList.toggle('en-mode');
        const isEnglish = htmlElement.classList.contains('en-mode');

        if (isEnglish) {
            langText.innerText = 'EN';
            langText.classList.add('text-cyan-400');
        } else {
            langText.innerText = 'ID';
            langText.classList.remove('text-cyan-400');
        }

        placeholderElements.forEach(function(el) {
            el.setAttribute('placeholder', isEnglish ? el.getAttribute('data-lang-en') : el.getAttribute('data-lang-id'));
        });
    });
}

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if(themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        htmlElement.classList.toggle('krem-mode');
        if (htmlElement.classList.contains('krem-mode')) {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
            themeToggleBtn.classList.add('text-amber-500');
            themeToggleBtn.classList.remove('text-gray-400');
        } else {
            themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
            themeToggleBtn.classList.remove('text-amber-500');
            themeToggleBtn.classList.add('text-gray-400');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if(mobileMenuBtn && mobileMenu) {      
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
                        
            if(mobileMenu.classList.contains('hidden')) {
                hamburgerIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); 
            } else {
                hamburgerIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); 
            }
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }
    
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    const langToggleBtnDesktop = document.getElementById('lang-toggle');
    if(mobileLangToggle && langToggleBtnDesktop) {
        mobileLangToggle.addEventListener('click', () => {
            langToggleBtnDesktop.click(); // Numpang fungsi tombol desktop
        });
    }

    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const themeToggleBtnDesktop = document.getElementById('theme-toggle');
    if(mobileThemeToggle && themeToggleBtnDesktop) {
        mobileThemeToggle.addEventListener('click', () => {
            themeToggleBtnDesktop.click(); // Numpang fungsi tombol desktop
        });
    }
});
