# MCP Integration - Flow AI Assistant

## 🤖 O que é MCP?

O Model Context Protocol (MCP) é um protocolo que permite que assistentes de IA se conectem diretamente com ferramentas e sistemas externos. O Flow implementa um servidor MCP que expõe todas as funcionalidades de gerenciamento de tasks para assistentes de IA.

## 🚀 Configuração

### 1. Instalar Flow
```bash
npm install -g @godrix/flow
```

### 2. Configurar MCP no seu assistente de IA

#### Para Claude Desktop (Anthropic)
Adicione ao arquivo `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "flow": {
      "command": "npx",
      "args": ["@godrix/flow", "mcp"],
      "env": {}
    }
  }
}
```

#### Para Cursor IDE
Adicione ao arquivo de configuração do Cursor:

```json
{
  "mcpServers": {
    "flow": {
      "command": "npx",
      "args": ["@godrix/flow", "mcp"],
      "env": {}
    }
  }
}
```

### 3. Reiniciar o assistente de IA
Após configurar, reinicie seu assistente de IA para que ele reconheça o servidor MCP do Flow.

## 🛠️ Ferramentas Disponíveis

### **Fase 1 - Core Features**

#### 1. `create_task`
Cria uma nova task com templates estruturados.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task (ex: "FEATURE_AUTH")
- `taskType` (opcional): Tipo da task ("feature", "bug", "improvement", "research")

**Exemplo de uso:**
```
Crie uma task para implementar autenticação de usuários
```

#### 2. `list_tasks`
Lista todas as tasks existentes no projeto.

**Parâmetros:** Nenhum

**Exemplo de uso:**
```
Mostre-me todas as tasks do projeto
```

#### 3. `validate_task`
Valida a estrutura de uma task específica.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task para validar

**Exemplo de uso:**
```
Valide a estrutura da task FEATURE_AUTH
```

#### 4. `get_task_info`
Obtém informações detalhadas sobre uma task específica.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task

**Exemplo de uso:**
```
Me mostre os detalhes da task BUG_LOGIN_ISSUE
```

#### 5. `get_project_status`
Obtém estatísticas gerais do projeto.

**Parâmetros:** Nenhum

**Exemplo de uso:**
```
Qual é o status geral do projeto?
```

### **Fase 2 - AI Integration**

#### 6. `generate_business_context`
Gera automaticamente o conteúdo do BUSINESS_CONTEXT.md com preenchimento inteligente de tags específicas.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task
- `description` (obrigatório): Descrição detalhada do que precisa ser implementado
- `taskType` (opcional): Tipo da task ("feature", "bug", "improvement", "research")

**Parâmetros específicos para preenchimento de tags (opcionais):**
- `context`: Descrição do problema atual → `<context>`
- `businessValue`: Valor de negócio → `<business_value>`
- `validationRules`: Regras de validação → `<validation_rules>`
- `businessLogic`: Lógica de negócio → `<business_logic>`
- `dataConstraints`: Limitações de dados → `<data_constraints>`
- `positiveScenario`: Cenário positivo → `<positive_scenario>`
- `negativeScenario`: Cenário negativo → `<negative_scenario>`
- `edgeCaseScenario`: Caso limite → `<edge_case_scenario>`
- `functionalCriteria`: Critérios funcionais → `<functional_criteria>`
- `nonFunctionalCriteria`: Critérios não-funcionais → `<non_functional_criteria>`
- `apiEndpoints`: Endpoints de API → `<api_endpoints>`
- `externalServices`: Serviços externos → `<external_services>`
- `loggingRequirements`: Requisitos de log → `<logging_requirements>`
- `analyticsRequirements`: Requisitos de analytics → `<analytics_requirements>`

**Metadados (opcionais):**
- `priority`: Prioridade da task → `{{PRIORITY}}`
- `estimate`: Estimativa de tempo → `{{ESTIMATE}}`
- `stakeholder`: Stakeholder responsável → `{{STAKEHOLDER}}`
- `deadline`: Data limite → `{{DEADLINE}}`
- `responsible`: Responsável pela implementação → `{{RESPONSIBLE}}`

**Exemplo de uso:**
```
Gere o BUSINESS_CONTEXT para autenticação com contexto específico sobre segurança e cenários de teste detalhados
```

#### 7. `generate_approach`
Gera automaticamente o conteúdo do APPROACH.md baseado no contexto de negócio e análise do codebase.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task
- `businessContext` (obrigatório): Conteúdo do business context para basear a abordagem
- `techStack` (opcional): Tecnologias usadas no projeto
- `architecture` (opcional): Descrição da arquitetura atual

**Exemplo de uso:**
```
Gere o APPROACH para a task FEATURE_AUTH baseado no business context fornecido
```

#### 8. `generate_completion_report`
Gera automaticamente o conteúdo do COMPLETION_REPORT.md baseado no trabalho realizado.

**Parâmetros:**
- `taskName` (obrigatório): Nome da task
- `workDone` (obrigatório): Lista de itens de trabalho concluídos
- `issuesFound` (opcional): Lista de issues ou bugs encontrados
- `deviations` (opcional): Lista de desvios do plano original
- `metrics` (opcional): Métricas de implementação (duração, arquivos alterados, etc.)

**Exemplo de uso:**
```
Gere o COMPLETION_REPORT para a task FEATURE_AUTH com os itens de trabalho concluídos
```

#### 9. `analyze_codebase`
Analisa o codebase atual para entender estrutura e dependências.

**Parâmetros:**
- `path` (opcional): Caminho para analisar (padrão: diretório atual)
- `includePatterns` (opcional): Padrões de arquivos para incluir na análise
- `excludePatterns` (opcional): Padrões de arquivos para excluir da análise

**Exemplo de uso:**
```
Analise o codebase para entender a estrutura do projeto
```

#### 10. `update_project_context`
Atualiza o PROJECT_CONTEXT.md com novas informações ou cria se não existir.

**Parâmetros:**
- `mission` (opcional): Declaração de missão atualizada
- `goals` (opcional): Lista de objetivos de longo prazo
- `techStack` (opcional): Stack tecnológico atualizado
- `architecture` (opcional): Princípios e padrões arquiteturais
- `standards` (opcional): Padrões de desenvolvimento
- `tools` (opcional): Ferramentas e configurações
- `metrics` (opcional): Métricas de sucesso
- `notes` (opcional): Notas adicionais sobre o projeto

**Exemplo de uso:**
```
Atualize o contexto do projeto com as tecnologias React, Node.js e PostgreSQL
```

#### 11. `init_flow_project`
Inicializa um novo projeto Flow com diretório .flow e PROJECT_CONTEXT.md.

**Parâmetros:**
- `projectName` (opcional): Nome do projeto
- `mission` (opcional): Declaração de missão do projeto
- `goals` (opcional): Lista de objetivos de longo prazo
- `techStack` (opcional): Stack tecnológico do projeto
- `architecture` (opcional): Princípios e padrões arquiteturais
- `standards` (opcional): Padrões de desenvolvimento
- `tools` (opcional): Ferramentas e configurações
- `metrics` (opcional): Métricas de sucesso
- `notes` (opcional): Notas adicionais sobre o projeto

**Exemplo de uso:**
```
Inicialize um novo projeto Flow para e-commerce com React e Node.js
```

## 💡 Casos de Uso Práticos

### Cenário 0: Inicialização de Novo Projeto
```
IA: "Vou inicializar um novo projeto Flow para e-commerce"
→ Usa init_flow_project com projectName="E-commerce Platform"
→ Cria diretório .flow e PROJECT_CONTEXT.md completo

IA: "Agora vou criar a primeira task para autenticação"
→ Usa create_task com taskName="FEATURE_AUTH" e taskType="feature"
→ Cria estrutura completa com templates otimizados

IA: "Vou gerar o BUSINESS_CONTEXT baseado na descrição"
→ Usa generate_business_context com descrição detalhada
→ Gera BUSINESS_CONTEXT.md completo com cenários Gherkin
```

### Cenário 1: Desenvolvimento Completo de Feature
```
IA: "Vou criar uma task para implementar autenticação de usuários"
→ Usa create_task com taskName="FEATURE_AUTH" e taskType="feature"
→ Cria estrutura completa com templates otimizados

IA: "Agora vou gerar o BUSINESS_CONTEXT baseado na descrição"
→ Usa generate_business_context com descrição detalhada
→ Gera BUSINESS_CONTEXT.md completo com cenários Gherkin

IA: "Vou analisar o codebase para entender a arquitetura"
→ Usa analyze_codebase para entender estrutura do projeto
→ Retorna análise detalhada de dependências e estrutura

IA: "Agora vou gerar o APPROACH baseado no business context"
→ Usa generate_approach com business context e tech stack
→ Gera APPROACH.md completo com plano técnico

IA: "Após implementar, vou gerar o COMPLETION_REPORT"
→ Usa generate_completion_report com itens de trabalho
→ Gera COMPLETION_REPORT.md com métricas e validações
```

### Cenário 2: Correção de Bug
```
IA: "Preciso corrigir o bug de login"
→ Usa create_task com taskName="BUG_LOGIN_ISSUE" e taskType="bug"
→ Cria templates específicos para correção de bugs

IA: "Vou gerar o BUSINESS_CONTEXT para o bug"
→ Usa generate_business_context com descrição do problema
→ Gera contexto focado em correção e validação

IA: "Vou gerar o APPROACH para a correção"
→ Usa generate_approach com foco em debugging
→ Gera plano técnico para correção
```

### Cenário 3: Análise de Progresso
```
IA: "Como está o progresso do projeto?"
→ Usa get_project_status
→ Retorna estatísticas completas de tasks

IA: "Vou validar todas as tasks para garantir qualidade"
→ Para cada task: usa validate_task
→ Retorna análise detalhada da estrutura
```

### Cenário 4: Workflow Completo com IA
```
1. IA: "Vou criar uma task para implementar dashboard"
   → create_task("FEATURE_DASHBOARD", "feature")

2. IA: "Vou analisar o codebase para entender a estrutura"
   → analyze_codebase()

3. IA: "Agora vou gerar o BUSINESS_CONTEXT"
   → generate_business_context("FEATURE_DASHBOARD", "Dashboard com métricas...")

4. IA: "Vou gerar o APPROACH baseado no contexto"
   → generate_approach("FEATURE_DASHBOARD", businessContext)

5. IA: "Após implementar, vou gerar o COMPLETION_REPORT"
   → generate_completion_report("FEATURE_DASHBOARD", workDone)

6. IA: "Vou validar se tudo está correto"
   → validate_task("FEATURE_DASHBOARD")
```

## 🔧 Comandos CLI Disponíveis

Além do MCP, você também pode usar os comandos diretamente no terminal:

```bash
# Criar task
npx @godrix/flow FEATURE_AUTH --type feature

# Listar tasks
npx @godrix/flow list

# Validar task
npx @godrix/flow validate FEATURE_AUTH

# Iniciar servidor MCP
npx @godrix/flow mcp
```

## 🎯 Templates IA-Friendly

### Estrutura com Tags Delimitadas
Todos os templates agora usam uma estrutura IA-friendly com tags delimitadas:

```markdown
<!-- SECTION_NAME -->
## 📋 Seção

<tag_name>
Conteúdo específico da tag
</tag_name>
<!-- END_SECTION_NAME -->
```

### Benefícios para IA
- **Compreensão clara**: Tags delimitadas facilitam parsing e compreensão
- **Preenchimento preciso**: Cada parâmetro preenche sua tag correspondente
- **Estrutura consistente**: Padrão uniforme em todos os templates
- **Flexibilidade**: Pode usar geração automática ou templates tradicionais

### Exemplo de Preenchimento
```typescript
// Parâmetros fornecidos
{
  context: "Sistema atual não possui autenticação",
  businessValue: "Garantir segurança dos dados",
  positiveScenario: "Usuário faz login com sucesso"
}

// Resultado no template
<context>
Sistema atual não possui autenticação
</context>

<business_value>
Garantir segurança dos dados
</business_value>

<positive_scenario>
Usuário faz login com sucesso
</positive_scenario>
```

## 🎯 Benefícios da Integração MCP

### Para Desenvolvedores
- **Automação completa**: IA pode criar e gerenciar tasks automaticamente
- **Contexto preservado**: IA sempre tem acesso ao estado atual do projeto
- **Validação automática**: IA pode verificar qualidade das tasks
- **Relatórios inteligentes**: IA pode gerar análises detalhadas
- **Preenchimento inteligente**: Tags específicas são preenchidas automaticamente

### Para IA
- **Acesso direto**: Não precisa executar comandos externos
- **Contexto rico**: Acesso completo à estrutura do projeto
- **Operações atômicas**: Cada operação é bem definida e confiável
- **Feedback imediato**: Respostas estruturadas e claras
- **Templates otimizados**: Estrutura IA-friendly para melhor compreensão

## 🚨 Troubleshooting

### Problema: Servidor MCP não inicia
**Solução:**
```bash
# Verificar se Flow está instalado
npx @godrix/flow --version

# Testar servidor MCP manualmente
npx @godrix/flow mcp
```

### Problema: IA não reconhece as ferramentas
**Solução:**
1. Verificar configuração MCP no assistente
2. Reiniciar o assistente de IA
3. Verificar logs do servidor MCP

### Problema: Erro de permissões
**Solução:**
```bash
# Verificar permissões do diretório
ls -la .flow/

# Recriar estrutura se necessário
npx @godrix/flow init
```

## 📚 Exemplos Avançados

### Workflow Completo com IA
```
1. IA: "Vou criar uma task para implementar dashboard"
   → create_task("FEATURE_DASHBOARD", "feature")

2. IA: "Agora vou validar se foi criada corretamente"
   → validate_task("FEATURE_DASHBOARD")

3. IA: "Vou verificar o status geral do projeto"
   → get_project_status()

4. IA: "Vou listar todas as tasks para planejar o próximo passo"
   → list_tasks()
```

### Análise de Qualidade
```
IA: "Vou analisar a qualidade de todas as tasks"
→ Para cada task:
  1. get_task_info(taskName)
  2. validate_task(taskName)
  3. Gerar relatório de qualidade
```

## 🔮 Próximas Funcionalidades

- **Integração com Git**: Detectar commits relacionados a tasks
- **Métricas avançadas**: Análise de tempo e produtividade
- **Templates dinâmicos**: Geração automática baseada em contexto
- **Integração com PM tools**: Jira, Trello, Asana

---

**A integração MCP transforma o Flow em uma ferramenta verdadeiramente inteligente, permitindo que IA e desenvolvedores colaborem de forma natural e eficiente!** 🚀
