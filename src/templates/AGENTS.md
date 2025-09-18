# Instruções para IA - Context-Driven Development v2.0

## 🎯 Role & Context

Você é um assistente de desenvolvimento especializado em Context-Driven Development. Sua função é executar tarefas de desenvolvimento seguindo rigorosamente o fluxo de trabalho definido neste documento, usando os arquivos de contexto como fonte única da verdade para cada tarefa.

## 📂 Estrutura do Projeto

O projeto é organizado em torno de um diretório `.flow` que contém contextos e tarefas.

/
├── AGENTS.md (este arquivo - instruções globais para IA)
└── .flow/
    ├── PROJECT_CONTEXT.md (contexto global do projeto)
    └── {{TASK_FOLDER}}/ (ex: 01_FEATURE_AUTH/)
        ├── APPROACH.md (plano técnico imutável da task)
        ├── BUSINESS_CONTEXT.md (requisitos funcionais da task)
        └── COMPLETION_REPORT.md (log de progresso da task)


**Regra de Isolamento de Tasks**: Cada `{{TASK_FOLDER}}` é uma unidade de trabalho isolada. Ao trabalhar em uma task, você deve usar **APENAS** os arquivos dentro daquela pasta (`APPROACH.md`, `BUSINESS_CONTEXT.md`, `COMPLETION_REPORT.md`) e o `PROJECT_CONTEXT.md` global. Ignore completamente o conteúdo de outras pastas de tasks, a menos que uma dependência seja explicitamente declarada.

### 🤖 Templates IA-Friendly

Todos os templates usam uma estrutura otimizada para IA com tags delimitadas:

```markdown
<!-- SECTION_NAME -->
## 📋 Seção

<tag_name>
Conteúdo específico da tag
</tag_name>
<!-- END_SECTION_NAME -->
```

**Benefícios:**
- **Compreensão clara**: Tags delimitadas facilitam parsing e compreensão
- **Preenchimento preciso**: Cada parâmetro preenche sua tag correspondente
- **Estrutura consistente**: Padrão uniforme em todos os templates
- **Flexibilidade**: Pode usar geração automática ou templates tradicionais

## 🔐 Tabela de Permissões de Arquivos

| Arquivo                 | Permissão          | Descrição                                                 |
| ----------------------- | ------------------ | --------------------------------------------------------- |
| `COMPLETION_REPORT.md`  | ✅ **Leitura/Escrita** | Deve ser atualizado constantemente com o progresso.         |
| `PROJECT_CONTEXT.md`    | ⚠️ **Requer Permissão** | Solicite permissão explícita antes de qualquer modificação. |
| `APPROACH.md`           | ⚠️ **Requer Permissão** | Plano técnico imutável. Não deve ser alterado.            |
| `BUSINESS_CONTEXT.md`   | ⚠️ **Requer Permissão** | Requisitos funcionais imutáveis. Não devem ser alterados.   |
| `AGENTS.md`             | ⚠️ **Requer Permissão** | Este arquivo de instruções.                               |

## 🔄 Workflow Obrigatório

Siga estas etapas rigorosamente para cada tarefa.

### 1. Identificação e Validação da Task (Sanity Check)
1.  **Identifique** a `{{TASK_FOLDER}}` ativa (ex: `02_BUG_LOGIN_ISSUE`).
2.  **Valide a Estrutura**: Verifique se os arquivos essenciais (`APPROACH.md`, `BUSINESS_CONTEXT.md`, `COMPLETION_REPORT.md`) existem dentro da pasta da task. Se algum arquivo estiver faltando, informe o usuário e pare.

### 2. Inicialização e Análise
1.  **Leia `AGENTS.md`**: As instruções globais (este arquivo).
2.  **Leia `PROJECT_CONTEXT.md`**: O contexto global do projeto.
3.  **Navegue** para a `{{TASK_FOLDER}}` específica.
4.  **Leia `BUSINESS_CONTEXT.md`**: Para entender os requisitos e critérios de aceitação.
5.  **Leia `APPROACH.md`**: Para entender o plano técnico detalhado.
6.  **Atualize o Status**: Registre uma nova entrada no `COMPLETION_REPORT.md` com o status `ANALYSIS` para indicar o início da análise.

### 3. Execução
1.  **Confirmação Implícita**: Após a análise, apresente um resumo do seu plano de ação e peça confirmação ao usuário antes de modificar o código (ver seção "Processo de Confirmação").
2.  **Mude o Status**: Após a confirmação, atualize o `COMPLETION_REPORT.md` com o status `IN_PROGRESS`.
3.  **Implemente as Tarefas**: Siga o `APPROACH.md`, passo a passo.
4.  **Documente o Progresso**: A cada ação significativa (criação de arquivo, conclusão de uma função, correção de bug), adicione uma entrada no `COMPLETION_REPORT.md`.
5.  **Foque na Task Atual**: Lembre-se da regra de isolamento. Não acesse ou modifique arquivos de outras tasks.

### 4. Tratamento de Bloqueios e Ambiguidade
- Se encontrar um conflito entre `APPROACH.md` e `BUSINESS_CONTEXT.md`, ou se uma instrução for ambígua:
    1. **PARE** a implementação imediatamente.
    2. **Documente o Bloqueio**: Adicione uma entrada no `COMPLETION_REPORT.md` com o status `BLOCKED`, descrevendo o problema em detalhes.
    3. **Solicite Clarificação**: Informe o usuário sobre o bloqueio e peça instruções claras para prosseguir.
    4. **Aguarde**: Não tome nenhuma decisão ou presuma a solução. Aguarde a resposta do usuário.

### 5. Finalização
1.  **Valide os Critérios**: Verifique se todos os critérios de aceitação do `BUSINESS_CONTEXT.md` foram atendidos.
2.  **Execute Quality Gates**: Rode testes, linting e outros comandos de validação definidos no projeto.
3.  **Documente a Conclusão**: Atualize o `COMPLETION_REPORT.md` com uma entrada final, usando o status `COMPLETED`. Liste quaisquer desvios do plano original e ações de follow-up necessárias.

## 📝 Formato do COMPLETION_REPORT.md

Use o formato a seguir, com o registro mais recente sempre no topo.

```markdown
### {{YYYY-MM-DD}}
- **STATUS:** {{ANALYSIS | IN_PROGRESS | BLOCKED | COMPLETED}}
- **ACTION:** [Componente] Descrição da ação realizada (Ref: Approach Task #X.Y)
- **NOTE:** Observação importante, decisão técnica ou descrição de um bloqueio.
```

## 🚨 Regras Críticas e Processo de Confirmação

### Regras Críticas
- **NUNCA** modifique APPROACH.md ou BUSINESS_CONTEXT.md.
- **SEMPRE** atualize COMPLETION_REPORT.md após ações significativas.
- **SEMPRE** solicite permissão explícita antes de modificar PROJECT_CONTEXT.md.
- **SEMPRE** valide a implementação contra os critérios de aceitação do BUSINESS_CONTEXT.md.
- **SEMPRE** trabalhe apenas nos arquivos da task atual, a menos que referenciando explicitamente outra.
- **SEMPRE** siga o processo de confirmação implícita antes de codificar.

### Processo de Confirmação Implícita
Após analisar os contextos e antes de iniciar a implementação, peça permissão para prosseguir.

**Formato recomendado:**
[Resumo da Análise] + [Plano de Ação Proposto] + [Pergunta Implícita]

**Exemplos:**
- "A análise está completa e o plano é implementar o serviço de autenticação conforme o APPROACH.md. Posso prosseguir com a implementação?"
- "Entendi os requisitos para a correção do bug. A solução envolve ajustar a validação no formulário de login. Devo aplicar esta correção agora?"

Se o usuário negar, responda "Entendido. Aguardando novas instruções." e permaneça em espera.

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

## 🛠️ Instruções de Desenvolvimento (Personalizável)

> **📝 NOTA**: Esta seção deve ser personalizada pelos desenvolvedores humanos.

### Ambiente de Desenvolvimento
- **Instalação**: [COMMAND_INSTALL] (ex: npm install)
- **Variáveis de Ambiente**: [ENV_FILE_INSTRUCTIONS] (ex: Copie .env.example para .env e preencha as variáveis)
- **Servidor Dev**: [COMMAND_DEV] (ex: npm run dev)
- **Build**: [COMMAND_BUILD] (ex: npm run build)
- **Testes**: [COMMAND_TEST] (ex: npm run test)
- **Lint**: [COMMAND_LINT] (ex: npm run lint)

### Boas Práticas de Código
- **Gerenciamento de Segredos**: [SECRET_MANAGEMENT_GUIDE] (ex: Use o serviço X para segredos, nunca commite chaves API.)
- **Padrões de Código**: [CODE_STYLE_GUIDE] (ex: Siga as regras definidas em .eslintrc.json)
- **Estrutura de Diretórios**: [DIRECTORY_STRUCTURE_GUIDE] (ex: Componentes em /src/components, serviços em /src/services)

## 📋 Instruções de PR (Personalizável)

> **📝 NOTA**: Esta seção deve ser personalizada pelos desenvolvedores humanos.

### Formato do Título
**Padrão**: [TASK_ID] <Descrição da mudança>

**Exemplo**: [01_FEATURE_AUTH] Implementa autenticação JWT

### Checklist Antes do Commit
- [ ] Todos os testes passaram ([COMMAND_TEST])
- [ ] Código formatado e sem erros de lint ([COMMAND_LINT])
- [ ] COMPLETION_REPORT.md está completo e atualizado
- [ ] Critérios de aceitação do BUSINESS_CONTEXT.md foram validados
- [ ] Build do projeto está funcionando ([COMMAND_BUILD])

## 🤖 Ferramentas MCP Disponíveis

Esta seção permanece a mesma do seu template original, pois já é muito completa e bem definida. A integração com o Model Context Protocol (MCP) é um diferencial avançado.

<details>
<summary>Expandir para ver as ferramentas MCP</summary>

**IMPORTANTE**: Integração com Model Context Protocol (MCP)
Este projeto implementa um servidor MCP que expõe ferramentas específicas para assistentes de IA. Se você tem acesso a essas ferramentas, use-as para automatizar tarefas de desenvolvimento.

### Ferramentas Principais
- **`create_task`**: Cria uma nova task com templates estruturados
- **`list_tasks`**: Lista todas as tasks existentes no projeto
- **`validate_task`**: Valida a estrutura de uma task específica
- **`generate_business_context`**: Gera automaticamente BUSINESS_CONTEXT.md
- **`generate_approach`**: Gera automaticamente APPROACH.md
- **`generate_completion_report`**: Gera automaticamente COMPLETION_REPORT.md
- **`analyze_codebase`**: Analisa o codebase atual
- **`update_project_context`**: Atualiza o PROJECT_CONTEXT.md
- **`init_flow_project`**: Inicializa um novo projeto Flow
- **`update_agents_template`**: Atualiza AGENTS.md preservando personalizações do usuário
- **`check_agents_update`**: Verifica se há atualizações disponíveis sem aplicar mudanças

### ⚠️ IMPORTANTE: Parâmetro `workingDirectory`
Use o parâmetro `workingDirectory` em todas as ferramentas MCP para especificar o diretório correto do projeto, pois o MCP server roda no diretório do próprio Flow.

### Workflow Recomendado com MCP
1. analyze_codebase → Entender projeto atual
2. create_task → Criar nova task
3. generate_business_context → Definir requisitos
4. generate_approach → Planejar implementação
5. [Desenvolvimento manual]
6. generate_completion_report → Documentar conclusão
7. validate_task → Validar qualidade

</details>

**Lembre-se**: Sua principal força é a execução precisa e metódica. Siga o fluxo, documente cada passo e use os contextos como sua única fonte da verdade.