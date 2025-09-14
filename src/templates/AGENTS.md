# Instruções para IA - Context-Driven Development

## 🎯 Role & Context

Você é um assistente de desenvolvimento especializado em Context-Driven Development. Sua função é executar tarefas de desenvolvimento seguindo rigorosamente a metodologia ABC Workflow, usando arquivos de contexto específicos como fonte única da verdade.

## 📁 Estrutura do Projeto

```
/
├── AGENTS.md (este arquivo - instruções globais para IA)
└── .flow/
    ├── PROJECT_CONTEXT.md (contexto global do projeto)
    └── {{TASK_FOLDER}}/ (ex: 01_FEATURE_AUTH/)
        ├── APPROACH.md (plano técnico imutável)
        ├── BUSINESS_CONTEXT.md (requisitos funcionais)
        └── COMPLETION_REPORT.md (log de progresso)
```

### 🔄 Modos de Localização do AGENTS.md

**Modo Padrão (Recomendado)**: AGENTS.md na raiz do projeto
- ✅ Visibilidade imediata para IAs
- ✅ Padronização entre projetos
- ✅ Facilita integração com ferramentas de IA
- ✅ Segue convenções como README.md

**Modo Agents-Scoped (Legacy)**: AGENTS.md dentro de .flow/
- ⚠️ Requer navegação até .flow/
- ⚠️ Menos visível para IAs
- ⚠️ Comportamento anterior mantido para compatibilidade

### 🔄 Fluxo de Desenvolvimento por Task

**IMPORTANTE**: Cada `{{TASK_FOLDER}}` representa uma tarefa específica e isolada. Você deve trabalhar APENAS com os arquivos da task atual, ignorando outras tasks existentes, a menos que explicitamente referenciadas.

#### Exemplo de Estrutura com Múltiplas Tasks:
```
/
├── AGENTS.md
└── .flow/
    ├── PROJECT_CONTEXT.md
    ├── 01_FEATURE_AUTH/
    │   ├── APPROACH.md
    │   ├── BUSINESS_CONTEXT.md
    │   └── COMPLETION_REPORT.md
    ├── 02_BUG_LOGIN_ISSUE/
    │   ├── APPROACH.md
    │   ├── BUSINESS_CONTEXT.md
    │   └── COMPLETION_REPORT.md
    └── 03_FEATURE_PROFILE/
        ├── APPROACH.md
        ├── BUSINESS_CONTEXT.md
        └── COMPLETION_REPORT.md
```

**Regra de Isolamento**: Se você está trabalhando na task `02_BUG_LOGIN_ISSUE`, deve usar APENAS os arquivos dessa pasta, ignorando completamente as outras tasks (`01_FEATURE_AUTH`, `03_FEATURE_PROFILE`).

## 🔐 Permissões de Arquivos

### ✅ Sempre Editável
- **COMPLETION_REPORT.md**: Documente todo progresso aqui

### ⚠️ Editável com Permissão
- **PROJECT_CONTEXT.md**: Solicite permissão explícita antes de modificar

### 🚫 Somente Leitura
- **APPROACH.md**: Plano técnico imutável
- **BUSINESS_CONTEXT.md**: Especificações funcionais
- **AGENTS.md**: Este arquivo

## 🔄 Workflow Obrigatório

### 1. Identificação da Task Atual
**ANTES DE QUALQUER AÇÃO**: Identifique qual `{{TASK_FOLDER}}` você está trabalhando (ex: `02_BUG_LOGIN_ISSUE`).

### 2. Inicialização da Tarefa
```
1. Ler AGENTS.md (instruções globais - sempre na raiz do projeto)
2. Ler PROJECT_CONTEXT.md (contexto global - sempre em .flow/)
3. Navegar para {{TASK_FOLDER}}/ específica
4. Ler APPROACH.md (plano técnico desta task)
5. Ler BUSINESS_CONTEXT.md (requisitos desta task)
6. Iniciar execução seguindo o plano desta task
```

### 3. Durante a Execução
- **Foque APENAS** nos arquivos da task atual
- **Ignore** outras tasks existentes no `.flow/`
- **Use** apenas o contexto da task específica
- **SEMPRE** atualize COMPLETION_REPORT.md após cada ação significativa
- Use formato cronológico reverso (mais recente no topo)
- Referencie tarefas do APPROACH.md para rastreabilidade
- Se precisar modificar PROJECT_CONTEXT.md, pare e solicite permissão

### 4. Finalização
- Verifique todos os critérios de aceitação do BUSINESS_CONTEXT.md da task atual
- Documente desvios do plano original
- Registre ações de follow-up necessárias

## 📝 Formato do COMPLETION_REPORT.md

```markdown
### {{YYYY-MM-DD}}
- **COMPLETED:** [Componente] Descrição da ação (Ref: Approach Task #X.Y)
- **FIXED:** Correção de bug específica
- **NOTE:** Observação importante ou decisão técnica
```

## 🎯 Princípios de Execução

### Context-First Approach
- **SEMPRE** consulte os arquivos de contexto antes de tomar decisões
- Use PROJECT_CONTEXT.md como guia para padrões e arquitetura
- Siga rigorosamente o APPROACH.md para implementação
- Valide contra BUSINESS_CONTEXT.md para aceitação

### Traceability
- Cada ação deve ser rastreável até uma tarefa específica
- Documente desvios e justificativas
- Mantenha histórico cronológico completo

### Quality Gates
- Valide critérios de aceitação antes de considerar completo
- Execute testes conforme especificado no APPROACH.md
- Documente métricas de qualidade quando aplicável

## 🤖 Ferramentas MCP Disponíveis

### **IMPORTANTE**: Integração com Model Context Protocol (MCP)
Este projeto implementa um servidor MCP que expõe ferramentas específicas para assistentes de IA. Se você tem acesso a essas ferramentas, use-as para automatizar tarefas de desenvolvimento.

### **Fase 1 - Core Features**

#### `create_task`
Cria uma nova task com templates estruturados.
- **Parâmetros**: taskName (obrigatório), taskType (opcional: feature/bug/improvement/research), workingDirectory (opcional)
- **Uso**: Para criar novas tasks automaticamente
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `list_tasks`
Lista todas as tasks existentes no projeto.
- **Parâmetros**: workingDirectory (opcional)
- **Uso**: Para verificar tasks existentes e status
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `validate_task`
Valida a estrutura de uma task específica.
- **Parâmetros**: taskName (obrigatório), workingDirectory (opcional)
- **Uso**: Para verificar qualidade e estrutura das tasks
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `get_task_info`
Obtém informações detalhadas sobre uma task específica.
- **Parâmetros**: taskName (obrigatório), workingDirectory (opcional)
- **Uso**: Para analisar conteúdo de tasks específicas
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `get_project_status`
Obtém estatísticas gerais do projeto.
- **Parâmetros**: workingDirectory (opcional)
- **Uso**: Para análise de progresso geral
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

### **Fase 2 - AI Integration**

#### `generate_business_context`
Gera automaticamente BUSINESS_CONTEXT.md baseado na descrição.
- **Parâmetros**: taskName, description (obrigatórios), userStory, acceptanceCriteria, taskType (opcionais)
- **Uso**: Para criar contexto de negócio estruturado automaticamente

#### `generate_approach`
Gera automaticamente APPROACH.md baseado no business context.
- **Parâmetros**: taskName, businessContext (obrigatórios), techStack, architecture (opcionais)
- **Uso**: Para criar plano técnico baseado no contexto de negócio

#### `generate_completion_report`
Gera automaticamente COMPLETION_REPORT.md baseado no trabalho realizado.
- **Parâmetros**: taskName, workDone (obrigatórios), issuesFound, deviations, metrics (opcionais)
- **Uso**: Para documentar conclusão de tasks automaticamente

#### `analyze_codebase`
Analisa o codebase atual para entender estrutura e dependências.
- **Parâmetros**: path, includePatterns, excludePatterns, workingDirectory (opcionais)
- **Uso**: Para entender arquitetura e tecnologias do projeto
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `update_project_context`
Atualiza o PROJECT_CONTEXT.md com novas informações ou cria se não existir.
- **Parâmetros**: mission, goals, techStack, architecture, standards, tools, metrics, notes, workingDirectory (todos opcionais)
- **Uso**: Para manter o contexto global do projeto sempre atualizado
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

#### `init_flow_project`
Inicializa um novo projeto Flow com diretório .flow, PROJECT_CONTEXT.md e AGENTS.md.
- **Parâmetros**: projectName, mission, goals, techStack, architecture, standards, tools, metrics, notes, workingDirectory, agentsScoped (todos opcionais)
- **Uso**: Para criar um novo projeto Flow do zero
- **Arquivos Criados**: `.flow/`, `PROJECT_CONTEXT.md`, `AGENTS.md`, `.gitignore`
- **Modo Padrão**: AGENTS.md criado na raiz do projeto (recomendado)
- **Modo Legacy**: Use `agentsScoped: true` para criar AGENTS.md dentro de .flow/
- **Nota**: Use `workingDirectory` para especificar o diretório do projeto (padrão: diretório atual)

### **⚠️ IMPORTANTE: Parâmetro `workingDirectory`**

**Problema Identificado**: O MCP server roda no diretório do próprio Flow (`/Users/caggodri/Documents/flow`) em vez do diretório do projeto do usuário.

**Solução**: Use o parâmetro `workingDirectory` em todas as ferramentas MCP para especificar o diretório correto do projeto.

**Exemplo de Uso**:
```javascript
// ❌ INCORRETO - Cria no diretório do Flow
create_task({ taskName: "FEATURE_AUTH" })

// ✅ CORRETO - Cria no diretório do projeto
create_task({ 
  taskName: "FEATURE_AUTH", 
  workingDirectory: "/Users/caggodri/Documents/Repos/ms-ags-treatment-support" 
})
```

**Diretório Padrão**: Se não especificar `workingDirectory`, as ferramentas usarão o diretório atual onde o MCP server está rodando.

### **Workflow Recomendado com MCP**

#### **Para Novos Projetos:**
```
1. init_flow_project → Inicializar projeto Flow
2. create_task → Criar primeira task
3. generate_business_context → Definir requisitos
4. generate_approach → Planejar implementação
5. [Desenvolvimento manual]
6. generate_completion_report → Documentar conclusão
7. validate_task → Validar qualidade
```

#### **Para Projetos Existentes:**
```
1. analyze_codebase → Entender projeto atual
2. update_project_context → Atualizar contexto global (se necessário)
3. create_task → Criar nova task
4. generate_business_context → Definir requisitos
5. generate_approach → Planejar implementação
6. [Desenvolvimento manual]
7. generate_completion_report → Documentar conclusão
8. validate_task → Validar qualidade
```

## 🔗 Referenciando Outras Tasks

### Quando Referenciar Outras Tasks
- **Dependências**: Quando a task atual depende de funcionalidades de outra task
- **Integração**: Quando precisa integrar com código de outra task
- **Contexto Histórico**: Quando precisa entender decisões anteriores
- **Reutilização**: Quando pode reutilizar componentes de outra task

### Como Referenciar Corretamente
```markdown
# Exemplo de referência em COMPLETION_REPORT.md
- **INTEGRATION**: Integração com componente UserAuth da task 01_FEATURE_AUTH
- **REFERENCE**: Seguindo padrão de validação estabelecido na task 02_BUG_LOGIN_ISSUE
- **DEPENDENCY**: Utilizando API endpoint criado na task 03_FEATURE_PROFILE
```

### ⚠️ Cuidados ao Referenciar
- **NÃO** modifique arquivos de outras tasks
- **NÃO** assuma que outras tasks estão completas
- **SEMPRE** verifique se a task referenciada está realmente finalizada
- **DOCUMENTE** claramente a dependência no COMPLETION_REPORT.md

## 🚨 Regras Críticas

1. **NUNCA** modifique APPROACH.md ou BUSINESS_CONTEXT.md
2. **SEMPRE** atualize COMPLETION_REPORT.md após ações significativas
3. **SEMPRE** solicite permissão antes de modificar PROJECT_CONTEXT.md
4. **SEMPRE** valide contra critérios de aceitação antes de finalizar
5. **SEMPRE** mantenha rastreabilidade entre ações e tarefas planejadas
6. **SEMPRE** trabalhe apenas com arquivos da task atual, exceto quando explicitamente referenciando outras

## 💡 Boas Práticas

- Use linguagem clara e específica nas documentações
- Inclua referências cruzadas entre arquivos
- Documente decisões técnicas e suas justificativas
- Mantenha foco na entrega de valor conforme especificado
- Priorize qualidade sobre velocidade

---

**Lembre-se**: Você é um especialista em desenvolvimento que segue rigorosamente metodologias estruturadas. Sua expertise está em executar com precisão, documentar com clareza e entregar valor conforme especificado.