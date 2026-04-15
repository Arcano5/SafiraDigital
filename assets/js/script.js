// ==================== MENU HAMBÚRGUER ====================
// ABRE E FECHA O MENU NO CELULAR
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ==================== ROLAGEM SUAVE ====================
// FAZ OS LINKS DO MENU ROLAREM SUAVEMENTE ATÉ A SEÇÃO
// COMPENSA O HEADER FIXO (OFFSET DINÂMICO)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        // VERIFICA SE O ID É VÁLIDO
        if (!targetId || targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // FECHA O MENU HAMBÚRGUER APÓS CLICAR (CELULAR)
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==================== CARROSSEL DO PORTFÓLIO ====================
// CONTROLA A NAVEGAÇÃO ENTRE OS PROJETOS
const track = document.querySelector('.carousel-track');

// SÓ EXECUTA O CARROSSEL SE O ELEMENTO EXISTIR
if (track) {
    const cards = Array.from(track.children);
    
    // SÓ CONTINUA SE HOUVER CARDS
    if (cards.length > 0) {
        let cardWidth = cards[0].getBoundingClientRect().width;
        let currentIndex = 0;
        
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        // FUNÇÃO PARA MOVER O CARROSSEL
        function moveToSlide(index) {
            // GARANTE QUE O ÍNDICE ESTEJA DENTRO DOS LIMITES
            if (index < 0) index = 0;
            if (index >= cards.length) index = cards.length - 1;
            
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            currentIndex = index;
            
            // ATUALIZA OS INDICADORES (BOLINHAS)
            if (indicators && indicators.length) {
                indicators.forEach((indicator, i) => {
                    if (i === index) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }
        
        // FUNÇÃO PARA PRÓXIMO SLIDE (COM LOOP)
        function nextSlide() {
            if (currentIndex === cards.length - 1) {
                moveToSlide(0); // VOLTA PARA O PRIMEIRO
            } else {
                moveToSlide(currentIndex + 1);
            }
        }
        
        // FUNÇÃO PARA SLIDE ANTERIOR (COM LOOP)
        function prevSlide() {
            if (currentIndex === 0) {
                moveToSlide(cards.length - 1); // VAI PARA O ÚLTIMO
            } else {
                moveToSlide(currentIndex - 1);
            }
        }
        
        // BOTÃO PRÓXIMO
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        // BOTÃO ANTERIOR
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // CLIQUE NAS BOLINHAS
        if (indicators && indicators.length) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    moveToSlide(index);
                });
            });
        }
        
        // ==================== AJUSTA CARROSSEL EM CASO DE REDIMENSIONAMENTO ====================
        // RECALCULA A POSIÇÃO E A LARGURA QUANDO A TELA MUDA DE TAMANHO
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // ATUALIZA A LARGURA DO CARD
                cardWidth = cards[0].getBoundingClientRect().width;
                // REPOSICIONA O SLIDE ATUAL
                moveToSlide(currentIndex);
            }, 100);
        });
    }
}