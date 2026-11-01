# Roadmap do portfólio

Estado do projeto e próximos passos. A lista de funcionalidades fica no `CLAUDE.md` (Features);
aqui fica o que falta fazer e de quem depende.

*Última atualização: 2026-11-01*

## Feito

- Design terminal na home, nas páginas de experiência, projetos e formação, e nos cases
- Site bilíngue com o idioma na URL (`/en`, `/pt`), hreflang e troca de idioma
- Cases em MDX com screenshots, CTA de contato e link para o próximo case
- SEO: metadata por idioma, JSON-LD com breadcrumbs reais, sitemap, robots, imagens de
  compartilhamento geradas no build
- Acessibilidade: link "pular para o conteúdo", foco visível, movimento reduzido respeitado
- Performance: LCP sem esperar a digitação do hero, screenshot principal dos cases com
  prioridade, JS da home de 995 para 710 KB (zod removido, framer-motion com LazyMotion)
- Formulário de contato com validação; sem a chave do Web3Forms, abre o app de e-mail
- Eventos no Analytics (formulário, troca de idioma, cópia do e-mail)
- Testes e2e (Playwright) e CI no GitHub Actions em todo PR
- Node 24 e Next.js 16.4 (com as correções de segurança)

## Depende do Cleyton

### Configuração
- [ ] Cadastrar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` no Vercel (Production e Preview) e fazer redeploy
- [ ] Cadastrar `NEXT_PUBLIC_GA_ID`, se quiser Analytics
- [ ] Domínio próprio (depois, `NEXT_PUBLIC_SITE_URL` no Vercel)
- [ ] Enviar o sitemap no Google Search Console

### Conteúdo
- [ ] CV em inglês (`public/cleyton-mendes-en.pdf` hoje é o mesmo arquivo do português) e
      revisão do CV (GrupoQ vs QuestEdu, "PostgreeSQL", idiomas misturados, certificações)
- [ ] Decidir QuestEdu ou GrupoQ (site, CV e `worksFor` no JSON-LD) e o cargo na QuestEdu
- [ ] Destaques de experiência com resultados; stats mais fortes que "6 marcas / 3 plataformas"
- [ ] Fuso horário e nível de inglês no hero; prazo de resposta no contato; ano previsto da formatura
- [ ] Cases que provem "web apps, APIs e bots": bot de WhatsApp, um projeto Shopify, QuestEdu
- [ ] Ultrafeu: número para "aumento significativo nas vendas" ou tirar a frase; conferir as tags
- [ ] Tiffany: descrever a parte que foi sua; screenshot desktop (captura manual)
- [ ] Vitaminese: a loja está em manutenção; marcar como `[offline]`?
- [ ] Confirmar o perfil `@cleytonmendest` no X (usado no metadata)
- [ ] Seções "About" e serviços; recomendações do LinkedIn; repositórios públicos no GitHub

## Próximos passos de código

- [ ] Blog em `/blog` reaproveitando o pipeline de MDX
- [ ] Migrar `/tools` e as páginas do bot para o design terminal
- [ ] Atualizar o Playwright e, junto, voltar o CI para `ubuntu-latest` (fixado em 24.04)
