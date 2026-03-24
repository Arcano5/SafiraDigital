// ==================== MENU HAMBÚRGUER ====================
// ABRE E FECHA O MENU NO CELULAR
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ==================== ROLAGEM SUAVE ====================
// FAZ OS LINKS DO MENU ROLAREM SUAVEMENTE ATÉ A SEÇÃO
// COMPENSA O HEADER FIXO (60px DE OFFSET)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // FECHA O MENU HAMBÚRGUER APÓS CLICAR (CELULAR)
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==================== CARROSSEL DO PORTFÓLIO ====================
// CONTROLA A NAVEGAÇÃO ENTRE OS PROJETOS
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentIndex = 0;
const cardWidth = cards[0].getBoundingClientRect().width;

// FUNÇÃO PARA MOVER O CARROSSEL
function moveToSlide(index) {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    currentIndex = index;
    
    // ATUALIZA OS INDICADORES (BOLINHAS)
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// BOTÃO PRÓXIMO
if (nextButton) {
    nextButton.addEventListener('click', () => {
        if (currentIndex === cards.length - 1) {
            moveToSlide(0); // VOLTA PARA O PRIMEIRO
        } else {
            moveToSlide(currentIndex + 1);
        }
    });
}

// BOTÃO ANTERIOR
if (prevButton) {
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            moveToSlide(cards.length - 1); // VAI PARA O ÚLTIMO
        } else {
            moveToSlide(currentIndex - 1);
        }
    });
}

// CLIQUE NAS BOLINHAS
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        moveToSlide(index);
    });
});

// ==================== AJUSTA CARROSSEL EM CASO DE REDIMENSIONAMENTO ====================
// RECALCULA A POSIÇÃO QUANDO A TELA MUDA DE TAMANHO
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newCardWidth = cards[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
    }, 100);
});