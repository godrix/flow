# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.7.0] - 2024-12-19

### 🚀 Adicionado
- **Nova ferramenta MCP**: `customize_agents` - Personalização automática do AGENTS.md
- **Análise inteligente de projeto**: Detecta package manager, frameworks e ferramentas automaticamente
- **Personalização técnica seletiva**: Altera apenas seções técnicas, preserva regras do Flow
- **Detecção automática**: Identifica npm/yarn/pnpm, React/Vue/Angular, TypeScript/ESLint/Jest, etc.
- **Preservação de regras**: Mantém intactas as regras do fluxo Flow, altera apenas seções técnicas

### 🔧 Melhorado
- **AGENTS.md Template**: Transformado em template personalizável para desenvolvedores
- **Instruções de Desenvolvimento**: Seção com placeholders para comandos específicos do projeto
- **Instruções de PR**: Template personalizável para processos de review específicos
- **Flexibilidade**: Desenvolvedores podem personalizar comandos, regras e critérios específicos

### 📚 Documentação
- **README.md**: Adicionada seção completa sobre configuração personalizada do AGENTS.md
- **Exemplos Práticos**: Incluídos exemplos de personalização para diferentes tipos de projeto
- **Guia de Configuração**: Instruções passo-a-passo para personalizar o template
- **Boas Práticas**: Orientações sobre como manter compatibilidade com IA
- **Nova Ferramenta**: Documentação completa da ferramenta `customize_agents`

### ✅ Melhorias
- **Personalização Automática**: IA pode personalizar AGENTS.md baseado na análise do projeto
- **Preservação de Regras**: Mantém intactas as regras do fluxo Flow, altera apenas seções técnicas
- **Detecção Inteligente**: Identifica automaticamente tecnologias e padrões do projeto
- **Flexibilidade**: Suporte a diferentes ferramentas (npm, yarn, pnpm, etc.)
- **Clareza**: Placeholders claros indicam onde personalizar
- **Compatibilidade**: Estrutura base mantida para funcionamento com IA

## [1.6.0] - 2024-12-19

### 🚀 Adicionado
- **Nova ferramenta MCP**: `customize_agents` - Personalização automática do AGENTS.md
- **Análise inteligente de projeto**: Detecta package manager, frameworks e ferramentas automaticamente
- **Personalização técnica seletiva**: Altera apenas seções técnicas, preserva regras do Flow
- **Detecção automática**: Identifica npm/yarn/pnpm, React/Vue/Angular, TypeScript/ESLint/Jest, etc.

### 🔧 Melhorado
- **AGENTS.md Template**: Transformado em template personalizável para desenvolvedores
- **Instruções de Desenvolvimento**: Seção com placeholders para comandos específicos do projeto
- **Instruções de PR**: Template personalizável para processos de review específicos
- **Flexibilidade**: Desenvolvedores podem personalizar comandos, regras e critérios específicos

### 📚 Documentação
- **README.md**: Adicionada seção completa sobre configuração personalizada do AGENTS.md
- **Exemplos Práticos**: Incluídos exemplos de personalização para diferentes tipos de projeto
- **Guia de Configuração**: Instruções passo-a-passo para personalizar o template
- **Boas Práticas**: Orientações sobre como manter compatibilidade com IA
- **Nova Ferramenta**: Documentação completa da ferramenta `customize_agents`

### ✅ Melhorias
- **Personalização Automática**: IA pode personalizar AGENTS.md baseado na análise do projeto
- **Preservação de Regras**: Mantém intactas as regras do fluxo Flow, altera apenas seções técnicas
- **Detecção Inteligente**: Identifica automaticamente tecnologias e padrões do projeto
- **Flexibilidade**: Suporte a diferentes ferramentas (npm, yarn, pnpm, etc.)
- **Clareza**: Placeholders claros indicam onde personalizar
- **Compatibilidade**: Estrutura base mantida para funcionamento com IA

## [1.5.0] - 2024-12-19

### 🚀 Adicionado
- **Geração Automática de Conteúdo**: Todos os arquivos de task agora são gerados automaticamente com conteúdo inteligente
- **Templates IA-Friendly**: Estrutura com tags delimitadas para melhor compreensão por IAs
- **Preenchimento Inteligente de Tags**: Parâmetros específicos preenchem tags correspondentes nos templates
- **Função `fillTemplateTags()`**: Nova função para preencher templates com valores específicos
- **Parâmetros Específicos MCP**: Novos parâmetros para `generate_business_context` com tags específicas
- **Opção `--no-auto-generate`**: CLI permite usar templates tradicionais ao invés de geração automática

### 🔄 Mudado
- **BUSINESS_CONTEXT.md**: Simplificado, removido Gherkin complexo, adicionada estrutura mais prática
- **Cenários de Teste**: Substituídos por estrutura mais simples e direta
- **Templates**: Todos os templates agora usam estrutura IA-friendly com tags delimitadas
- **Geração de Conteúdo**: Baseada em contexto, descrição e tipo de task
- **MCP Schema**: Atualizado com parâmetros específicos para cada tag

### 📚 Documentação
- **README.md**: Atualizado com informações sobre geração automática e templates IA-friendly
- **MCP_INTEGRATION.md**: Adicionada seção sobre templates IA-friendly e novos parâmetros
- **AGENTS.md**: Atualizado com informações sobre estrutura IA-friendly
- **Exemplos**: Incluídos exemplos de preenchimento automático de tags

### ✅ Melhorias
- **Compreensão IA**: Tags delimitadas facilitam parsing e compreensão por IAs
- **Flexibilidade**: Suporte tanto para geração automática quanto templates tradicionais
- **Precisão**: Preenchimento específico de tags baseado em parâmetros fornecidos
- **Consistência**: Estrutura uniforme em todos os templates

## [1.4.0] - 2024-12-19

### 🚀 Adicionado
- **Comando `flow init`**: Novo comando CLI para inicializar projetos Flow
- **Modo Padrão**: AGENTS.md agora é criado na raiz do projeto por padrão
- **Modo Agents-Scoped**: Opção `--agents-scoped` para comportamento legacy
- **Parâmetro `agentsScoped`**: Suporte no MCP para escolher localização do AGENTS.md
- **CLI Options**: `--name`, `--mission`, `--agents-scoped` no comando init

### 🔄 Mudado
- **Comportamento Padrão**: AGENTS.md criado na raiz do projeto (não mais em .flow/)
- **Estrutura de Projeto**: AGENTS.md agora fica visível na raiz para melhor integração com IA
- **taskService**: Verifica AGENTS.md na raiz primeiro, só cria em .flow/ se não existir
- **Gitignore**: Atualizado para refletir nova localização do AGENTS.md
- **Templates**: AGENTS.md atualizado com nova estrutura e modos de localização

### 📚 Documentação
- **README.md**: Adicionada seção completa de comandos CLI
- **AGENTS.md**: Atualizada estrutura do projeto e modos de localização
- **Exemplos**: Incluídos exemplos de uso dos novos comandos
- **Workflow**: Atualizado workflow recomendado com nova estrutura

### ✅ Melhorias
- **Visibilidade**: IAs encontram instruções imediatamente na raiz
- **Padronização**: Estrutura consistente entre todos os projetos Flow
- **Compatibilidade**: Modo legacy mantido para projetos existentes
- **UX**: Comando init mais intuitivo e completo

## [1.3.3] - 2024-12-19

### 🐛 Corrigido
- **AGENTS.md**: `init_flow_project` agora cria o arquivo AGENTS.md automaticamente
- **Template**: Copia o template completo de AGENTS.md para o projeto
- **Fallback**: Se template não encontrado, cria versão básica do AGENTS.md
- **Gitignore**: Atualizado para incluir AGENTS.md no controle de versão

### 📚 Documentação
- **AGENTS.md**: Atualizada descrição do `init_flow_project` para mencionar AGENTS.md
- **Arquivos Criados**: Documentados todos os arquivos criados pelo `init_flow_project`

### ✅ Testado
- **Funcionalidade**: Testado criação completa do AGENTS.md
- **Template**: Verificado que template completo é copiado corretamente
- **Estrutura**: Confirmado que todos os arquivos são criados no diretório correto

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
