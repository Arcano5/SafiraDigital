Primeira versão do meu site profissional

Tecnologias usadas:
    HTML5: Estrutura;
    CSS3: Aparência;
    JavaScript ECMAScript: Funcionalidades;e
    Formspree: EndPoint dos formulários.


Segunda versão

    Google Analytics para monitorar índices



Terceira versão
20/01

## Análise de Performance

A performance do site foi analisada utilizando o Lighthouse do Chrome DevTools, com foco na categoria Performance em modo mobile.

### Resultados iniciais
- Performance: 80
- Principais gargalos identificados:
  - Imagens não otimizadas
  - Recursos CSS bloqueando a renderização
  - JavaScript e CSS não utilizados
  - Ausência de dimensões explícitas em imagens

### Otimizações aplicadas
- Conversão de imagens para o formato `.webp`, com uso de `loading="lazy"` e definição de `width` e `height`
- Redução de recursos bloqueantes utilizando preload de CSS
- Separação de JavaScript por página, evitando carregamento desnecessário
- Organização do CSS em arquivos distintos para homepage e páginas internas

### Resultados após otimização
- Performance: 88 (após otimizações)
- Redução do tempo de First Contentful Paint e Largest Contentful Paint

### Conclusão
As melhorias com maior impacto foram a otimização das imagens e a redução de recursos bloqueantes, resultando em uma experiência mais rápida e estável para o usuário.


Durante as otimizações iniciais, observou-se uma piora na pontuação de Performance devido ao aumento do Cumulative Layout Shift (CLS), causado principalmente por lazy loading aplicado indevidamente e animações não otimizadas. Após a correção desses pontos, houve estabilização do layout e melhoria significativa da experiência do usuário.


04/02
Resolvi enxugar tudo e fazer um site one page