# Configuração do GitHub Pages para Flow

## Configuração do Repositório

1. **Habilitar GitHub Pages:**
   - Vá para Settings > Pages
   - Source: GitHub Actions
   - Branch: main

2. **Configurar domínio personalizado (opcional):**
   - Adicione um arquivo `CNAME` na raiz do repositório
   - Exemplo: `flow.godrix.dev`

## Estrutura de Arquivos

```
docs/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── README.md          # Documentação
└── assets/
    ├── logo.svg       # Logo principal
    └── favicon.svg    # Favicon
```

## Workflow de Deploy

O arquivo `.github/workflows/deploy.yml` está configurado para:

- Build automático em push para main
- Deploy para GitHub Pages
- Cache de dependências Node.js
- Permissões adequadas para Pages

## Comandos Úteis

```bash
# Testar localmente
cd docs
python -m http.server 8000

# Ou com Node.js
npx serve docs

# Verificar estrutura
ls -la docs/
```

## SEO e Meta Tags

A página inclui:
- Meta tags Open Graph para redes sociais
- Meta tags Twitter Card
- Structured data para SEO
- Sitemap automático

## Performance

- CSS e JS minificados
- Imagens otimizadas (SVG)
- Service Worker para cache
- Lazy loading de recursos
- Compressão gzip

## Acessibilidade

- Navegação por teclado
- ARIA labels
- Contraste adequado
- Suporte a leitores de tela
- Modo escuro automático
