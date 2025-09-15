# GitHub Pages Configuration

## Settings Required

1. **Repository Settings > Pages:**
   - Source: GitHub Actions
   - Branch: main (or your default branch)

2. **Actions Permissions:**
   - Allow all actions and reusable workflows
   - Allow GitHub Actions to create and approve pull requests

## Custom Domain (Optional)

If you want to use a custom domain like `flow.godrix.dev`:

1. Add DNS records:
   ```
   Type: CNAME
   Name: flow (or subdomain of your choice)
   Value: godrix.github.io
   ```

2. The CNAME file in docs/ folder will be automatically used

## Environment Variables

No environment variables needed for basic GitHub Pages deployment.

## Workflow Triggers

The deployment workflow triggers on:
- Push to main branch
- Pull requests to main branch
- Manual workflow dispatch

## Build Process

1. Checkout repository
2. Setup Node.js 18
3. Install dependencies
4. Build project (if needed)
5. Configure Pages
6. Upload artifact
7. Deploy to GitHub Pages

## Troubleshooting

### Common Issues:

1. **Permission denied:**
   - Check repository settings > Actions > General
   - Ensure "Workflow permissions" is set to "Read and write permissions"

2. **Build fails:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

3. **Pages not updating:**
   - Check Actions tab for failed workflows
   - Verify Pages settings are correct

### Debug Commands:

```bash
# Test locally
cd docs
python -m http.server 8000

# Check file structure
ls -la docs/

# Validate HTML
npx html-validate docs/index.html
```

## Performance Optimization

- Images are SVG (scalable and lightweight)
- CSS is optimized for modern browsers
- JavaScript uses modern ES6+ features
- Service Worker provides offline functionality
- Assets are cached appropriately
