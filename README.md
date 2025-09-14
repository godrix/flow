# @godrix/flow

> **Context-Driven Development: Estrutura Inteligente para Desenvolvimento com IA**

O `@godrix/flow` implementa uma metodologia de desenvolvimento baseada em contexto que estrutura cada tarefa em três fases distintas: **Requisitos** (Business Context), **Design** (Approach), e **Implementação** (Completion Report). Este processo garante alinhamento, rastreabilidade e foco constante na entrega de valor.

Este workflow cria um ecossistema onde humanos e IA podem colaborar com precisão e propósito.

## 🎯 Princípios Fundamentais

### A - Approach: O Blueprint Técnico Imutável
Uma vez que os requisitos estão claros, um plano técnico sólido é criado. O `APPROACH.md` serve como o blueprint de engenharia. Ele detalha a arquitetura, design e um plano de implementação definido. Este documento é nossa referência; não muda durante a execução, garantindo que o plano permaneça como fonte única da verdade.

### B - Business Context: Definindo o "Porquê" com Precisão
Toda tarefa começa com uma compreensão profunda de seu propósito. O arquivo `BUSINESS_CONTEXT.md` é nossa fonte de verdade para requisitos, usando uma estrutura simplificada e IA-friendly com tags delimitadas para criar especificações comportamentais que são claras, testáveis e compreendidas por todos.

### C - Completion Report: A Evidência do Trabalho Realizado
O progresso deve ser documentado. O `COMPLETION_REPORT.md` é o registro formal e cronológico do trabalho realizado. Ele conecta as ações tomadas de volta às tarefas planejadas, documenta desvios e serve como prova final de que os objetivos no `BUSINESS_CONTEXT.md` foram atendidos.

## 🚀 Instalação

```bash
npm install -g @godrix/flow
```

## 💻 Uso

### Comandos Básicos
```bash
# Criar uma task (com geração automática de conteúdo)
npx @godrix/flow <nome-da-tarefa>

# Criar uma task com tipo específico
npx @godrix/flow FEATURE_AUTH --type feature
npx @godrix/flow BUG_LOGIN_ISSUE --type bug
npx @godrix/flow IMPROVE_PERFORMANCE --type improvement
npx @godrix/flow RESEARCH_AI_INTEGRATION --type research

# Criar task com templates tradicionais (sem geração automática)
npx @godrix/flow FEATURE_AUTH --type feature --no-auto-generate

# Listar todas as tasks
npx @godrix/flow list

# Validar estrutura de uma task
npx @godrix/flow validate FEATURE_AUTH

# Inicializar projeto Flow
npx @godrix/flow init --name "Meu Projeto" --mission "Resolver problema X"

# Iniciar servidor MCP para integração com IA
npx @godrix/flow mcp
```

### Exemplos
```bash
# Criar uma tarefa com nome task-1234
npx @godrix/flow task-1234

# Criar uma tarefa de feature
npx @godrix/flow FEATURE_AUTH --type feature

# Criar uma tarefa de correção de bug
npx @godrix/flow BUG_LOGIN_ISSUE --type bug

# Criar uma tarefa de melhoria
npx @godrix/flow IMPROVE_PERFORMANCE --type improvement
```

## 📁 Estrutura Criada

O comando cria uma estrutura organizada no diretório atual:

### Arquivos Globais
- `AGENTS.md` - Instruções para IA (criado na raiz do projeto por padrão)
- `.flow/PROJECT_CONTEXT.md` - Contexto do projeto (criado na primeira execução)

### Pasta da Tarefa (.flow/XX_nome-da-tarefa)
- `APPROACH.md` - O blueprint técnico imutável
- `BUSINESS_CONTEXT.md` - Os requisitos de negócio e critérios de aceitação
- `COMPLETION_REPORT.md` - O relatório formal do trabalho realizado

## 🏗️ Estrutura de Pastas

```
seu-projeto/
├── AGENTS.md                           # Arquivo global - instruções para IA (raiz)
└── .flow/
    ├── PROJECT_CONTEXT.md              # Arquivo global - contexto do projeto
    ├── 00_task-1234/                  # Tarefa específica
    │   ├── APPROACH.md
    │   ├── BUSINESS_CONTEXT.md
    │   └── COMPLETION_REPORT.md
    ├── 01_FEATURE_AUTH/                # Outra tarefa
    │   ├── APPROACH.md
    │   ├── BUSINESS_CONTEXT.md
    │   └── COMPLETION_REPORT.md
    └── 02_BUG_LOGIN_ISSUE/             # Mais uma tarefa
        ├── APPROACH.md
        ├── BUSINESS_CONTEXT.md
        └── COMPLETION_REPORT.md
```

## 🔄 Fluxo de Desenvolvimento

### 1. **Isolamento por Tarefa**
Cada `XX_nome-da-tarefa` representa uma tarefa específica e isolada. A IA trabalha APENAS com os arquivos da tarefa atual, ignorando outras tarefas existentes, a menos que explicitamente referenciadas.

### 2. **Context-Driven Development**
- **Contexto Global**: `PROJECT_CONTEXT.md` fornece contexto geral do projeto
- **Contexto Específico**: Cada tarefa tem seu próprio contexto isolado
- **Rastreabilidade**: Todas as ações são documentadas e rastreáveis

### 3. **Metodologia ABC**
- **A**pproach: Plano técnico imutável
- **B**usiness Context: Requisitos funcionais claros
- **C**ompletion Report: Evidência do trabalho realizado

## 🤖 Integração com IA

### 🎯 Geração Automática de Conteúdo
O Flow agora gera automaticamente conteúdo inteligente para todos os arquivos de task:

- **Conteúdo Contextualizado**: Baseado no nome da task, descrição e tipo
- **Templates IA-Friendly**: Estrutura com tags delimitadas para fácil compreensão
- **Preenchimento Inteligente**: Parâmetros específicos preenchem tags correspondentes
- **Flexibilidade**: Use geração automática ou templates tradicionais

### 🚀 MCP Integration (Model Context Protocol)
O Flow implementa um servidor MCP que permite integração direta com assistentes de IA:

#### Ferramentas Disponíveis via MCP:

**Fase 1 - Core Features:**
- **init_flow_project**: Inicializar novo projeto Flow
- **create_task**: Criar tasks com templates estruturados
- **list_tasks**: Listar todas as tasks do projeto
- **validate_task**: Validar estrutura de tasks específicas
- **get_task_info**: Obter informações detalhadas de tasks
- **get_project_status**: Estatísticas gerais do projeto
- **customize_agents**: Personalizar AGENTS.md automaticamente baseado na análise do projeto
- **add_tech_instruction**: Adicionar instruções técnicas personalizadas nas seções de desenvolvimento e PR

**Fase 2 - AI Integration:**
- **generate_business_context**: Gerar BUSINESS_CONTEXT.md com preenchimento automático de tags
- **generate_approach**: Gerar APPROACH.md baseado no contexto
- **generate_completion_report**: Gerar COMPLETION_REPORT.md automaticamente
- **analyze_codebase**: Analisar estrutura e dependências do projeto
- **update_project_context**: Atualizar PROJECT_CONTEXT.md com novas informações

#### Parâmetros Específicos para `generate_business_context`:
```typescript
{
  taskName: string,           // Nome da task
  description: string,        // Descrição geral
  
  // Tags específicas (opcionais):
  context: string,            // → <context>
  businessValue: string,      // → <business_value>
  validationRules: string,     // → <validation_rules>
  businessLogic: string,       // → <business_logic>
  dataConstraints: string,      // → <data_constraints>
  positiveScenario: string,     // → <positive_scenario>
  negativeScenario: string,     // → <negative_scenario>
  edgeCaseScenario: string,     // → <edge_case_scenario>
  functionalCriteria: string,   // → <functional_criteria>
  nonFunctionalCriteria: string, // → <non_functional_criteria>
  apiEndpoints: string,       // → <api_endpoints>
  externalServices: string,    // → <external_services>
  loggingRequirements: string, // → <logging_requirements>
  analyticsRequirements: string, // → <analytics_requirements>
  
  // Metadados:
  priority: string,           // → {{PRIORITY}}
  estimate: string,           // → {{ESTIMATE}}
  stakeholder: string,         // → {{STAKEHOLDER}}
  deadline: string,           // → {{DEADLINE}}
  responsible: string,         // → {{RESPONSIBLE}}
}
```

#### Configuração Rápida:
```json
{
  "mcpServers": {
    "flow": {
      "command": "npx",
      "args": ["@godrix/flow", "mcp"]
    }
  }
}
```

#### Exemplo de Workflow Completo com IA:

**Para Novos Projetos:**
```
1. IA: "Inicialize um novo projeto Flow para e-commerce"
   → init_flow_project() - Cria estrutura completa

2. IA: "Crie uma task para implementar autenticação"
   → create_task("FEATURE_AUTH", "feature") - Cria estrutura

3. IA: "Gere o BUSINESS_CONTEXT baseado na descrição"
   → generate_business_context() - Cria requisitos estruturados

4. IA: "Gere o APPROACH baseado no contexto"
   → generate_approach() - Cria plano técnico

5. IA: "Após implementar, gere o COMPLETION_REPORT"
   → generate_completion_report() - Documenta conclusão

6. IA: "Valide a qualidade da task"
   → validate_task() - Verifica estrutura
```

**Para Projetos Existentes:**
```
1. IA: "Analise o codebase do projeto"
   → analyze_codebase() - Entende estrutura e tecnologias

2. IA: "Atualize o contexto do projeto com as tecnologias encontradas"
   → update_project_context() - Mantém contexto global atualizado

3. IA: "Crie uma task para implementar autenticação"
   → create_task("FEATURE_AUTH", "feature") - Cria estrutura

4. IA: "Gere o BUSINESS_CONTEXT baseado na descrição"
   → generate_business_context() - Cria requisitos estruturados

5. IA: "Gere o APPROACH baseado no contexto"
   → generate_approach() - Cria plano técnico

6. IA: "Após implementar, gere o COMPLETION_REPORT"
   → generate_completion_report() - Documenta conclusão

7. IA: "Valide a qualidade da task"
   → validate_task() - Verifica estrutura
```

#### Benefícios da Integração MCP:
- **Automação completa** do ciclo de desenvolvimento
- **Documentação automática** de alta qualidade
- **Análise inteligente** do codebase
- **Templates personalizados** baseados em contexto
- **Validação automática** de qualidade

### Templates Otimizados para IA
- **Prompts estruturados** seguindo melhores práticas
- **Contexto claro** para cada tipo de arquivo
- **Instruções específicas** para diferentes cenários
- **Rastreabilidade completa** de todas as ações

### Boas Práticas Implementadas
- **Role-based prompts** com contexto específico
- **Constraints claras** sobre permissões de arquivos
- **Examples práticos** para diferentes situações
- **Quality gates** para validação de entregas

## 🚀 Comandos CLI

### Comandos Básicos
```bash
# Criar uma nova task
flow <task-name> [--type feature|bug|improvement|research]

# Listar todas as tasks
flow list

# Validar estrutura de uma task
flow validate <task-name>

# Inicializar projeto Flow
flow init [--name <name>] [--mission <mission>] [--agents-scoped]

# Iniciar servidor MCP para IA
flow mcp
```

### Comando `init` - Inicialização de Projeto

**Modo Padrão (Recomendado):**
```bash
# Cria AGENTS.md na raiz do projeto
flow init --name "Meu Projeto" --mission "Resolver problema X"
```

**Modo Agents-Scoped (Legacy):**
```bash
# Cria AGENTS.md dentro de .flow/ (comportamento anterior)
flow init --agents-scoped
```

### Opções do `init`:
- `--name <name>`: Nome do projeto
- `--mission <mission>`: Declaração de missão
- `--agents-scoped`: Cria AGENTS.md dentro de .flow/ (modo legacy)

### Vantagens do Modo Padrão:
- ✅ **Visibilidade imediata**: IAs encontram instruções na raiz
- ✅ **Padronização**: Todos os projetos Flow seguem a mesma estrutura
- ✅ **Facilidade**: Não precisa navegar até .flow/
- ✅ **Convenção**: Segue padrões como README.md, CONTRIBUTING.md

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar projeto
npm run build

# Testar localmente
npm run dev task-1234
```

## 📋 Templates Incluídos

### AGENTS.md
Instruções completas para IA com:
- Workflow obrigatório
- Permissões de arquivos
- Regras de isolamento por tarefa
- Boas práticas de desenvolvimento

#### 🔧 Configuração Personalizada do AGENTS.md

O arquivo `AGENTS.md` inclui seções que devem ser personalizadas pelos desenvolvedores com informações específicas do projeto:

**Seções a Personalizar:**

1. **🛠️ Instruções de Desenvolvimento**
   - Substitua `[COMANDO_DEV]`, `[COMANDO_BUILD]`, `[COMANDO_TEST]`, `[COMANDO_LINT]` pelos comandos reais do projeto
   - Adicione regras específicas de organização de arquivos
   - Inclua padrões de código específicos (ESLint, Prettier, etc.)
   - Defina critérios de qualidade específicos do projeto

2. **📋 Instruções de PR**
   - Personalize o formato de título de PR
   - Adicione verificações específicas ao checklist de commit
   - Inclua critérios específicos de review do projeto

**Exemplo de Personalização:**

```markdown
## 🛠️ Instruções de Desenvolvimento

### Ambiente de Desenvolvimento
- Use `npm run dev` para iniciar o servidor de desenvolvimento
- Use `npm run build` para compilar o projeto
- Use `npm run test` para executar testes
- Use `npm run lint` para verificar qualidade do código

### Estrutura de Arquivos
- Mantenha a estrutura `.flow/` para organização de tasks
- Use nomes descritivos para tasks (ex: `01_FEATURE_AUTH`, `02_BUG_LOGIN_ISSUE`)
- Siga o padrão de templates IA-friendly com tags delimitadas
- **Regras específicas**: Use TypeScript para todos os arquivos .ts
- **Organização**: Mantenha componentes em `/src/components/`

### Boas Práticas de Código
- Sempre documente mudanças no COMPLETION_REPORT.md
- Mantenha rastreabilidade entre código e documentação
- Valide critérios de aceitação antes de considerar completo
- **Padrões específicos**: Use ESLint com regras Airbnb, Prettier para formatação

### Testes e Qualidade
- Execute testes antes de cada commit
- Mantenha cobertura de testes mínima de 80%
- Use linting para manter consistência de código
- Valide funcionalidades contra BUSINESS_CONTEXT.md
- **Critérios específicos**: Todos os componentes devem ter testes unitários
```

**Como Personalizar:**

### Opção 1: Personalização Automática (Recomendada)
Use a ferramenta MCP `customize_agents` para personalização automática:

```bash
# Via MCP (recomendado)
customize_agents({
  workingDirectory: "/path/to/your/project",
  forceUpdate: false,
  preserveCustomizations: true
})
```

**O que a ferramenta faz automaticamente:**
- 🔍 **Analisa o projeto** (package.json, lock files, configs)
- 📦 **Detecta package manager** (npm, yarn, pnpm)
- 🛠️ **Identifica frameworks** (React, Vue, Angular, etc.)
- 🔧 **Detecta ferramentas** (TypeScript, ESLint, Jest, etc.)
- ⚙️ **Personaliza comandos** baseado no package manager
- 📝 **Mantém regras do Flow** intactas (só altera seções técnicas)

### Opção 2: Adicionar Instruções Específicas

Use a ferramenta MCP `add_tech_instruction` para adicionar instruções técnicas específicas:

```bash
# Via MCP
add_tech_instruction({
  instruction: "Use 'pnpm dlx turbo run dev' para iniciar o servidor de desenvolvimento",
  section: "development", // ou "pr" ou "both"
  workingDirectory: "/path/to/your/project"
})
```

**O que esta ferramenta faz:**
- 📝 **Adiciona instruções personalizadas** com timestamp
- 🎯 **Permite especificar seção** (desenvolvimento, PR, ou ambas)
- 📊 **Mantém rastreabilidade** das instruções adicionadas
- 🔒 **Não modifica as regras** do fluxo Flow

### Opção 3: Personalização Manual
1. **Edite o arquivo `AGENTS.md`** na raiz do seu projeto
2. **Substitua os placeholders** pelos comandos e regras específicos
3. **Adicione seções personalizadas** conforme necessário
4. **Mantenha a estrutura base** para compatibilidade com IA
5. **Teste a configuração** criando uma task de exemplo

### PROJECT_CONTEXT.md
Contexto global do projeto com:
- Missão e objetivos
- Stack tecnológico
- Padrões de desenvolvimento
- Métricas de sucesso

### BUSINESS_CONTEXT.md
Requisitos funcionais com:
- User stories
- Cenários de teste simplificados
- Critérios de aceitação
- Regras de negócio
- Integrações e APIs
- Logs e Analytics

### APPROACH.md
Plano técnico com:
- Arquitetura da solução
- Modelos de dados
- Contratos de API
- Estratégia de testes

### COMPLETION_REPORT.md
Relatório de conclusão com:
- Resumo executivo
- Log cronológico
- Validação de critérios
- Métricas de qualidade

## 🎯 Benefícios

### Para Desenvolvedores
- **Estrutura clara** para organizar tarefas
- **Contexto preservado** entre sessões
- **Rastreabilidade completa** do progresso
- **Padrões consistentes** em todo o projeto

### Para IA
- **Instruções claras** e específicas
- **Contexto isolado** por tarefa
- **Prompts otimizados** para melhor compreensão
- **Workflow estruturado** para execução eficiente

### Para Equipes
- **Colaboração eficiente** entre humanos e IA
- **Documentação automática** do progresso
- **Padrões uniformes** de desenvolvimento
- **Qualidade consistente** nas entregas

## 🔗 Links Úteis

- [Documentação Completa](./docs/)
- [Exemplos de Uso](./examples/)
- [Contribuindo](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para melhorar a colaboração entre humanos e IA no desenvolvimento de software.**

👨‍💻🤝🤖 *"A humanidade é uma coisa boa; a IA é apenas uma extensão dela."*