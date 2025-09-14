# @godrix/flow

> **Context-Driven Development: Estrutura Inteligente para Desenvolvimento com IA**

O `@godrix/flow` implementa uma metodologia de desenvolvimento baseada em contexto que estrutura cada tarefa em três fases distintas: **Requisitos** (Business Context), **Design** (Approach), e **Implementação** (Completion Report). Este processo garante alinhamento, rastreabilidade e foco constante na entrega de valor.

Este workflow cria um ecossistema onde humanos e IA podem colaborar com precisão e propósito.

## 🎯 Princípios Fundamentais

### A - Approach: O Blueprint Técnico Imutável
Uma vez que os requisitos estão claros, um plano técnico sólido é criado. O `APPROACH.md` serve como o blueprint de engenharia. Ele detalha a arquitetura, design e um plano de implementação definido. Este documento é nossa referência; não muda durante a execução, garantindo que o plano permaneça como fonte única da verdade.

### B - Business Context: Definindo o "Porquê" com Precisão
Toda tarefa começa com uma compreensão profunda de seu propósito. O arquivo `BUSINESS_CONTEXT.md` é nossa fonte de verdade para requisitos, usando sintaxe Gherkin (Given/When/Then) para criar especificações comportamentais que são claras, testáveis e compreendidas por todos.

### C - Completion Report: A Evidência do Trabalho Realizado
O progresso deve ser documentado. O `COMPLETION_REPORT.md` é o registro formal e cronológico do trabalho realizado. Ele conecta as ações tomadas de volta às tarefas planejadas, documenta desvios e serve como prova final de que os objetivos no `BUSINESS_CONTEXT.md` foram atendidos.

## 🚀 Instalação

```bash
npm install -g @godrix/flow
```

## 💻 Uso

### Comandos Básicos
```bash
# Criar uma task
npx @godrix/flow <nome-da-tarefa>

# Criar uma task com tipo específico
npx @godrix/flow FEATURE_AUTH --type feature
npx @godrix/flow BUG_LOGIN_ISSUE --type bug
npx @godrix/flow IMPROVE_PERFORMANCE --type improvement
npx @godrix/flow RESEARCH_AI_INTEGRATION --type research

# Listar todas as tasks
npx @godrix/flow list

# Validar estrutura de uma task
npx @godrix/flow validate FEATURE_AUTH

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

### Arquivos Globais (na raiz .flow)
- `AGENTS.md` - Instruções para IA (criado na primeira execução)
- `PROJECT_CONTEXT.md` - Contexto do projeto (criado na primeira execução)

### Pasta da Tarefa (.flow/XX_nome-da-tarefa)
- `APPROACH.md` - O blueprint técnico imutável
- `BUSINESS_CONTEXT.md` - Os requisitos de negócio e critérios de aceitação
- `COMPLETION_REPORT.md` - O relatório formal do trabalho realizado

## 🏗️ Estrutura de Pastas

```
seu-projeto/
├── .flow/
│   ├── AGENTS.md                    # Arquivo global - instruções para IA
│   ├── PROJECT_CONTEXT.md           # Arquivo global - contexto do projeto
│   ├── 00_task-1234/               # Tarefa específica
│   │   ├── APPROACH.md
│   │   ├── BUSINESS_CONTEXT.md
│   │   └── COMPLETION_REPORT.md
│   ├── 01_FEATURE_AUTH/            # Outra tarefa
│   │   ├── APPROACH.md
│   │   ├── BUSINESS_CONTEXT.md
│   │   └── COMPLETION_REPORT.md
│   └── 02_BUG_LOGIN_ISSUE/         # Mais uma tarefa
│       ├── APPROACH.md
│       ├── BUSINESS_CONTEXT.md
│       └── COMPLETION_REPORT.md
└── ...
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

**Fase 2 - AI Integration:**
- **generate_business_context**: Gerar BUSINESS_CONTEXT.md automaticamente
- **generate_approach**: Gerar APPROACH.md baseado no contexto
- **generate_completion_report**: Gerar COMPLETION_REPORT.md automaticamente
- **analyze_codebase**: Analisar estrutura e dependências do projeto
- **update_project_context**: Atualizar PROJECT_CONTEXT.md com novas informações

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

### PROJECT_CONTEXT.md
Contexto global do projeto com:
- Missão e objetivos
- Stack tecnológico
- Padrões de desenvolvimento
- Métricas de sucesso

### BUSINESS_CONTEXT.md
Requisitos funcionais com:
- User stories
- Cenários Gherkin
- Critérios de aceitação
- Métricas de negócio

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