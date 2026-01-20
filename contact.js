document.addEventListener('DOMContentLoaded', ()=>{
    setupMobileMenu();
    setupThemeToggle();
    setupCurrentPage();
    setupContactForm();
});

function setupMobileMenu(){
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML= nav.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        });

        document.addEventListener('click', (e) => {
    if (
        nav.classList.contains('active') &&
        !menuToggle.contains(e.target) &&
        !nav.contains(e.target)
    ) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
})}};
    // ===== TEMA CLARO/ESCURO =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const THEME_KEY = 'safira-theme';

    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            updateThemeButton(newTheme);
        });
    }
    }
function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i> Modo claro' 
            : '<i class="fas fa-moon"></i> Modo escuro';
    }
}
// ===== PÁGINA ATUAL NO MENU =====
function setupCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remover ../ ou ./ dos links
        const cleanLink = linkHref.replace('../', '').replace('./', '');
        const cleanCurrent = currentPage.replace('../', '').replace('./', '');
        
        if (cleanCurrent === cleanLink || 
            (cleanCurrent === '' && cleanLink === 'index.html') ||
            (cleanCurrent === 'index.html' && cleanLink === '') ||
            (cleanCurrent.includes(cleanLink) && cleanLink !== '')) {
            link.classList.add('active');
        }
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitBtn.style.background = '#10b981';
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            submitBtn.innerHTML = 'Erro ao enviar';
            submitBtn.style.background = '#ef4444';
        }

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    });
}


// ===== EXPORT =====
window.Safira = window.Safira || {};
window.Safira.setupThemeToggle = setupThemeToggle;