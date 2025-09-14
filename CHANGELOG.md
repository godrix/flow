# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.3.2] - 2024-12-19

### 🐛 Corrigido
- **Diretório de Trabalho**: Adicionado parâmetro `workingDirectory` a todas as ferramentas MCP
- **Problema Crítico**: MCP criava arquivos no diretório do Flow em vez do projeto do usuário
- **Solução**: Todas as ferramentas agora aceitam `workingDirectory` para especificar o diretório correto
- **Impacto**: Comando `init_flow_project` agora cria `.flow` no diretório correto do projeto

### 📚 Documentação
- **AGENTS.md**: Adicionada seção explicativa sobre o uso do `workingDirectory`
- **Exemplos**: Incluídos exemplos de uso correto e incorreto do parâmetro
- **Workflow**: Atualizado workflow recomendado com uso do `workingDirectory`

## [1.3.1] - 2024-12-19

### 🐛 Corrigido
- **Comando MCP**: Corrigido problema com `__dirname` em ES modules
- **Compatibilidade**: Substituído `__dirname` por `import.meta.url` para ES modules
- **Inicialização**: Comando `flow mcp` agora funciona corretamente

## [1.3.0] - 2024-12-19

### 🚀 Adicionado
- **Nova ferramenta MCP**: `init_flow_project` - Inicializa projetos Flow completos
- **Nova ferramenta MCP**: `update_project_context` - Atualiza contexto global do projeto
- **Suporte completo a inicialização** de projetos via MCP
- **Workflows diferenciados** para projetos novos vs existentes
- **Documentação expandida** com casos de uso práticos
- **11 ferramentas MCP** disponíveis (6 Core + 5 AI Integration)

### 🔧 Melhorado
- **Templates otimizados** para IA com estrutura mais clara
- **Documentação MCP** completa com exemplos práticos
- **Workflow recomendado** atualizado para diferentes cenários
- **README.md** expandido com seções de integração IA
- **AGENTS.md** com instruções detalhadas para IA

### 📚 Documentação
- **MCP_INTEGRATION.md** - Guia completo de integração MCP
- **Casos de uso práticos** para diferentes cenários
- **Workflows recomendados** para projetos novos e existentes
- **Exemplos de uso** para todas as ferramentas MCP

### 🎯 Funcionalidades MCP
- **Fase 1 - Core Features**: init_flow_project, create_task, list_tasks, validate_task, get_task_info, get_project_status
- **Fase 2 - AI Integration**: generate_business_context, generate_approach, generate_completion_report, analyze_codebase, update_project_context

## [1.2.0] - 2024-12-19

### 🚀 Adicionado
- **Integração MCP** (Model Context Protocol) completa
- **9 ferramentas MCP** para automação de desenvolvimento
- **Comandos CLI** expandidos: list, validate, mcp
- **Suporte a tipos de task** com templates específicos
- **Templates otimizados** para IA com melhores práticas

### 🔧 Melhorado
- **Templates refatorados** para serem mais genéricos e eficientes
- **Estrutura de prompts** otimizada para IA
- **Correção de typo**: COMPLETION_REPOORT.md → COMPLETION_REPORT.md
- **Package.json** melhorado com metadados completos

### 📚 Documentação
- **README.md** completamente reescrito
- **AGENTS.md** com instruções detalhadas para IA
- **Templates** com estrutura clara e exemplos práticos

## [1.1.0] - 2024-12-19

### 🚀 Adicionado
- **Templates estruturados** para desenvolvimento baseado em contexto
- **CLI básico** para criação de tasks
- **Sistema de templates** com variáveis dinâmicas
- **Suporte a diferentes tipos** de task

### 🔧 Melhorado
- **Estrutura de projeto** organizada
- **Templates Markdown** otimizados
- **Sistema de build** com TypeScript

### 📚 Documentação
- **README.md** inicial
- **Templates** básicos para desenvolvimento

## [1.0.0] - 2024-12-19

### 🚀 Lançamento Inicial
- **Primeira versão** do Flow
- **Conceito base** de Context-Driven Development
- **Templates básicos** para tasks
- **CLI inicial** para criação de contexto
