# 🔄 Atualização Inteligente do AGENTS.md

## Visão Geral

A ferramenta `update_agents_template` permite atualizar o template AGENTS.md preservando as personalizações do usuário. Esta funcionalidade é especialmente útil quando novas versões do Flow são lançadas com melhorias no template.

## 🎯 Características Principais

### ✅ **Preservação Inteligente**
- Mantém personalizações nas seções de Desenvolvimento e PR
- Detecta automaticamente conteúdo personalizado vs. placeholders
- Preserva instruções específicas do projeto

### 🔒 **Segurança**
- Cria backup automático antes da atualização
- Backup com timestamp para rastreabilidade
- Opção de forçar ou não a atualização

### 📋 **Detecção de Versão**
- Compara versão atual com template
- Só atualiza quando necessário
- Evita sobrescrever arquivos já atualizados

## 🔍 Verificação de Atualizações

### **Nova Ferramenta: `check_agents_update`**

Antes de aplicar atualizações, você pode verificar se há mudanças disponíveis:

```javascript
// Verificação simples
check_agents_update({
  workingDirectory: "/path/to/project"
})

// Verificação detalhada
check_agents_update({
  workingDirectory: "/path/to/project",
  showDetails: true
})
```

### **Como Funciona a Verificação**

1. **Comparação de Versões**: Compara versão atual com template
2. **Detecção de Personalizações**: Identifica customizações do usuário
3. **Análise de Diferenças**: Detecta novas regras, ferramentas e seções
4. **Recomendações**: Sugere próximos passos baseado no status

### **Tipos de Resposta**

**✅ Template Atualizado:**
```
✅ Status do AGENTS.md

📁 Arquivo: /path/to/project/AGENTS.md
📋 Versão atual: 1.9.0
📋 Versão do template: 1.9.0
🔍 Status: Template atualizado
🔒 Personalizações detectadas: Sim
```

**🔄 Atualização Disponível:**
```
🔄 Status do AGENTS.md

📁 Arquivo: /path/to/project/AGENTS.md
📋 Versão atual: 1.8.0
📋 Versão do template: 1.9.0
🔍 Status: Atualização disponível
🔒 Personalizações detectadas: Sim

📋 Principais diferenças detectadas:
- Novas regras críticas: 1 regra(s) adicionada(s)
- Novas ferramentas MCP: 1 ferramenta(s) adicionada(s)
- Novas seções: 🔍 Verificação de Atualizações

💡 Recomendação: Use update_agents_template com preserveCustomizations: true
```

## 🛠️ Como Usar

### Via MCP (Recomendado)

```javascript
// Atualização automática (só atualiza se necessário)
update_agents_template({
  workingDirectory: "/path/to/project"
})

// Atualização forçada
update_agents_template({
  workingDirectory: "/path/to/project",
  forceUpdate: true
})

// Sem backup (não recomendado)
update_agents_template({
  workingDirectory: "/path/to/project",
  backupOriginal: false
})

// Sem preservar customizações (cuidado!)
update_agents_template({
  workingDirectory: "/path/to/project",
  preserveCustomizations: false
})
```

### Via CLI (Futuro)

```bash
# Atualização automática
flow update-agents

# Atualização forçada
flow update-agents --force

# Sem backup
flow update-agents --no-backup
```

## 🔍 Como Funciona

### 1. **Detecção de Versão**
```javascript
// Extrai versão do template atual
const templateVersion = templateContent.match(/version: '(\d+\.\d+\.\d+)'/)[1];

// Extrai versão do arquivo atual
const currentVersion = currentContent.match(/version: '(\d+\.\d+\.\d+)'/)[1];

// Compara e decide se atualiza
if (templateVersion !== currentVersion || forceUpdate) {
  // Procede com atualização
}
```

### 2. **Preservação de Customizações**
```javascript
// Detecta seções personalizadas
const hasCustomizations = currentSection.includes('**Personalize**:') || 
                         currentSection.includes('**Exemplo**:') ||
                         currentSection.includes('**Regras específicas**:');

if (hasCustomizations) {
  // Preserva seção personalizada
  updatedContent = updatedContent.replace(templateSection, currentSection);
}
```

### 3. **Backup Automático**
```javascript
if (backupOriginal) {
  const backupPath = `${targetAgentsPath}.backup.${new Date().toISOString().split('T')[0]}`;
  await fs.writeFile(backupPath, currentContent);
}
```

## 📊 Exemplo Prático

### Cenário: Projeto com AGENTS.md Personalizado

**AGENTS.md Atual (v1.8.0):**
```markdown
## 🛠️ Instruções de Desenvolvimento

### Padrões de Código
- Use TypeScript strict mode
- **Personalize**: Sempre use ESLint com regras customizadas
- **Exemplo**: `npm run lint:fix` antes de commits
- **Regras específicas**: Não usar `any`, sempre tipar retornos

### Organização de Arquivos
- **Organização**: Estrutura por features, não por tipo
- **Padrões específicos**: Cada feature tem sua pasta com components/, hooks/, utils/
```

**Template Novo (v1.9.0):**
```markdown
## 🛠️ Instruções de Desenvolvimento

### Padrões de Código
- Use TypeScript strict mode
- **Personalize**: Adicione padrões específicos do projeto
- **Exemplo**: Exemplo de comando ou prática
- **Regras específicas**: Regras adicionais do projeto

### Organização de Arquivos
- **Organização**: Estrutura de pastas do projeto
- **Padrões específicos**: Convenções de nomenclatura
```

**Resultado da Atualização:**
```markdown
## 🛠️ Instruções de Desenvolvimento

### Padrões de Código
- Use TypeScript strict mode
- **Personalize**: Sempre use ESLint com regras customizadas
- **Exemplo**: `npm run lint:fix` antes de commits
- **Regras específicas**: Não usar `any`, sempre tipar retornos

### Organização de Arquivos
- **Organização**: Estrutura por features, não por tipo
- **Padrões específicos**: Cada feature tem sua pasta com components/, hooks/, utils/
```

## ⚠️ Cuidados e Limitações

### **O que é Preservado**
- ✅ Seções com `**Personalize**:`
- ✅ Seções com `**Exemplo**:`
- ✅ Seções com `**Regras específicas**:`
- ✅ Seções com `**Organização**:`
- ✅ Seções com `**Padrões específicos**:`
- ✅ Seções com `**Critérios específicos**:`

### **O que é Atualizado**
- 🔄 Regras críticas
- 🔄 Processo de confirmação implícita
- 🔄 Ferramentas MCP disponíveis
- 🔄 Boas práticas gerais
- 🔄 Estrutura do documento

### **Limitações**
- ❌ Não preserva mudanças em seções não personalizadas
- ❌ Não detecta personalizações em formato diferente
- ❌ Não mescla conteúdo, apenas substitui seções inteiras

## 🔄 Workflow Recomendado

### **Sequência Ideal de Atualização**
```
1. check_agents_update → Verificar atualizações do template
2. [Se necessário] update_agents_template → Aplicar atualizações
3. analyze_codebase → Entender projeto atual
4. create_task → Criar nova task
5. generate_business_context → Definir requisitos
6. generate_approach → Planejar implementação
7. [Desenvolvimento manual]
8. generate_completion_report → Documentar conclusão
9. validate_task → Validar qualidade
```

### **Integração com Desenvolvimento**
- **Antes de iniciar**: Sempre verifique atualizações
- **Durante desenvolvimento**: Use ferramentas MCP atualizadas
- **Após conclusão**: Valide com template mais recente

## 🚀 Casos de Uso

### 1. **Atualização de Versão**
```javascript
// Quando nova versão do Flow é lançada
update_agents_template({
  workingDirectory: "/path/to/project"
})
```

### 2. **Sincronização de Equipe**
```javascript
// Garantir que todos tenham template atualizado
update_agents_template({
  workingDirectory: "/path/to/project",
  forceUpdate: true
})
```

### 3. **Recuperação de Template**
```javascript
// Restaurar template limpo (perde customizações)
update_agents_template({
  workingDirectory: "/path/to/project",
  preserveCustomizations: false
})
```

## 🔧 Configuração Avançada

### **Detecção de Customizações**
```javascript
const customizationMarkers = [
  '**Personalize**:',
  '**Exemplo**:',
  '**Regras específicas**:',
  '**Organização**:',
  '**Padrões específicos**:',
  '**Critérios específicos**:'
];

const hasCustomizations = customizationMarkers.some(marker => 
  currentSection.includes(marker)
);
```

### **Backup com Versionamento**
```javascript
const backupPath = `${targetAgentsPath}.backup.${new Date().toISOString().split('T')[0]}`;
// Resultado: AGENTS.md.backup.2024-01-15
```

## 📈 Benefícios

### **Para Desenvolvedores**
- ✅ Mantém personalizações importantes
- ✅ Recebe atualizações do template automaticamente
- ✅ Backup seguro antes de mudanças
- ✅ Controle sobre quando atualizar

### **Para Equipes**
- ✅ Sincronização fácil de templates
- ✅ Preservação de padrões específicos do projeto
- ✅ Rastreabilidade de mudanças
- ✅ Redução de conflitos

### **Para Manutenção**
- ✅ Atualizações automáticas quando necessário
- ✅ Preservação de configurações importantes
- ✅ Backup automático para recuperação
- ✅ Logs detalhados de mudanças

## 🎯 Próximos Passos

1. **Teste a funcionalidade** em projetos existentes
2. **Configure atualizações automáticas** via CI/CD
3. **Documente padrões específicos** do projeto
4. **Monitore logs de atualização** para melhorias

---

**Última Atualização**: 2024-01-15  
**Versão**: 1.9.0  
**Status**: ✅ Implementado e Testado
