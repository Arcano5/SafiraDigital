// ==================== BLOG: CARREGAR ARTIGOS DO JSON ====================
// Esta função é chamada tanto no bindex.html quanto nos artigos individuais

function carregarDadosBlog() {
    // Detecta se está em bindex.html ou em um artigo
    const isHomeBlog = document.getElementById('blog-grid') !== null;
    
    fetch('../blog/artigos-data.json')
        .then(response => response.json())
        .then(artigos => {
            // Ordena por data (mais recente primeiro)
            artigos.sort((a, b) => new Date(b.data) - new Date(a.data));
            
            // 1. Monta a sidebar (categorias e últimos artigos) em qualquer página do blog
            montarSidebar(artigos);
            
            // 2. Se for a página principal do blog, monta os cards
            if (isHomeBlog) {
                montarGridArtigos(artigos);
            }
        })
        .catch(err => console.error('Erro ao carregar dados do blog:', err));
}

function montarSidebar(artigos) {
    // Categorias únicas
    const categorias = [...new Set(artigos.map(a => a.categoria))];
    const listaCat = document.getElementById('lista-categorias');
    if (listaCat) {
        listaCat.innerHTML = '';
        categorias.forEach(cat => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="bindex.html?categoria=${encodeURIComponent(cat)}">📁 ${cat}</a>`;
            listaCat.appendChild(li);
        });
    }
    
    // Últimos 5 artigos
    const ultimos = artigos.slice(0, 5);
    const listaUlt = document.getElementById('ultimos-artigos');
    if (listaUlt) {
        listaUlt.innerHTML = '';
        ultimos.forEach(art => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${art.arquivo}">📄 ${art.titulo_curto}</a>`;
            listaUlt.appendChild(li);
        });
    }
}

function montarGridArtigos(artigos) {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    
    // Verifica se tem filtro de categoria na URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaFiltro = urlParams.get('categoria');
    
    let artigosFiltrados = artigos;
    const filtroInfo = document.getElementById('filtro-info');
    
    if (categoriaFiltro) {
        artigosFiltrados = artigos.filter(a => a.categoria === categoriaFiltro);
        if (filtroInfo) {
            filtroInfo.innerHTML = `<div class="filtro-ativo">Filtrando por: ${categoriaFiltro} <a href="bindex.html">✕ Limpar</a></div>`;
        }
    } else {
        if (filtroInfo) filtroInfo.innerHTML = '';
    }
    
    if (artigosFiltrados.length === 0) {
        grid.innerHTML = '<div class="sem-artigos">Nenhum artigo encontrado nesta categoria. Volte em breve!</div>';
        return;
    }
    
    grid.innerHTML = '';
    artigosFiltrados.forEach(art => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        // Formata a data para exibição (dd/mm/aaaa)
        const dataObj = new Date(art.data);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        
        card.innerHTML = `
            <span class="blog-card-categoria">${art.categoria}</span>
            <h2 class="blog-card-titulo"><a href="${art.arquivo}">${art.titulo_curto}</a></h2>
            <div class="blog-card-data">${dataFormatada}</div>
            <p class="blog-card-resumo">${art.resumo_curto}</p>
            <a href="${art.arquivo}" class="blog-card-link">Ler artigo completo →</a>
        `;
        grid.appendChild(card);
    });
}

// Executa quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDadosBlog);