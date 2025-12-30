# Portfolio Roadmap

Este documento contém os próximos passos planejados para evolução do portfolio.

## 📊 Imediatos (Alta Prioridade)

### 1. Atualizar Dados Reais
- [ ] Substituir certificações placeholder em `src/data/certifications.ts`
- [ ] Adicionar mais projetos reais em `src/data/projects.ts`
- [ ] Verificar se todos os dados em `src/data/` estão corretos e atualizados

### 2. Otimização de Performance
- [ ] Rodar Lighthouse audit
- [ ] Otimizar imagens dos projetos (converter para WebP/AVIF)
- [ ] Implementar lazy loading para seções abaixo do fold
- [ ] Melhorar Core Web Vitals (LCP, FID, CLS)

## 🚀 Curto Prazo (Melhorias Incrementais)

### 3. Sistema de Blog
*Link já existe no nav mas não implementado*
- [ ] Usar MDX para posts em Markdown
- [ ] Sistema de tags/categorias
- [ ] Listagem de posts bilíngue
- [ ] Páginas individuais de artigos

### 4. Melhorias na Navegação
- [ ] Adicionar indicador visual de seção ativa no scroll
- [ ] Smooth scroll entre seções
- [ ] Breadcrumbs para SEO

### 5. Projetos em Destaque
- [ ] Página individual para cada projeto com mais detalhes
- [ ] Gallery de screenshots
- [ ] Filtros por tecnologia
- [ ] Case studies completos dos principais projetos

## 🎨 Médio Prazo (Features Adicionais)

### 6. Acessibilidade
- [ ] Audit de acessibilidade (WCAG 2.1)
- [ ] Melhorar navegação por teclado
- [ ] Adicionar ARIA labels onde necessário
- [ ] Testar com screen readers

### 7. Analytics Avançado
- [ ] Event tracking (cliques em projetos, downloads de CV, etc)
- [ ] Heatmaps (Hotjar ou similar)
- [ ] Conversion tracking

### 8. Otimizações Técnicas
- [ ] Implementar PWA (Service Worker, manifest)
- [ ] Adicionar página offline
- [ ] Melhorar caching strategy
- [ ] Implementar ISR (Incremental Static Regeneration) se necessário

## 🔧 Longo Prazo (Opcional)

### 9. Sistema CMS Simples
*Apenas se crescer muito*
- [ ] Sanity.io ou Contentful (leve e fácil)
- [ ] Apenas para blog posts inicialmente
- [ ] Manter dados principais nos arquivos TypeScript

### 10. Testes Automatizados
- [ ] Unit tests (Vitest/Jest)
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests

### 11. Features Interativas
- [ ] Dark/light mode preview nos cards de projeto
- [ ] Filtro interativo de skills
- [ ] Timeline interativa de experiência
- [ ] Calculadora de disponibilidade/timezone

## 🎯 Recomendação de Sequência

Ordem sugerida de implementação:

1. ✅ **Atualizar todos os dados reais** (certifications, projects)
2. ✅ **Rodar Lighthouse e corrigir issues críticos**
3. ✅ **Implementar sistema de blog básico** (já tem o link no nav)
4. ✅ **Adicionar páginas individuais dos principais projetos**
5. ✅ **Melhorias de acessibilidade**
6. ✅ **Analytics avançado com event tracking**

---

*Última atualização: 2025-01-24*
