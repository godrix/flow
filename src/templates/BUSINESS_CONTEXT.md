# Contexto de Negócio: {{TASK_NAME}}

<!-- TASK_OVERVIEW -->
## 🎯 Visão Geral da Task

<user_story>
**Como** [tipo de usuário]  
**Eu quero** [funcionalidade específica]  
**Para que** [valor/benefício obtido]
</user_story>

<context>
### Contexto
*Descrição do problema atual ou situação que motivou esta funcionalidade.*
</context>

<description>
### Descrição
*Descrição detalhada da funcionalidade e como ela resolve o problema.*
</description>

<business_value>
### Valor de Negócio
- **Impacto**: Como esta funcionalidade impacta os usuários/negócio
- **Métricas**: KPIs que serão afetados positivamente
- **Prioridade**: Justificativa da prioridade desta funcionalidade
- **ROI**: Retorno esperado do investimento
</business_value>
<!-- END_TASK_OVERVIEW -->

<!-- BUSINESS_RULES -->
## 🔒 Regras de Negócio

<validation_rules>
### Validações e Restrições
- **Regra 1**: Descrição específica da regra de validação
- **Regra 2**: Descrição específica da regra de validação
- **Regra 3**: Descrição específica da regra de validação
</validation_rules>

<business_logic>
### Lógica de Negócio
- **Comportamento 1**: Descrição do comportamento esperado
- **Comportamento 2**: Descrição do comportamento esperado
- **Comportamento 3**: Descrição do comportamento esperado
</business_logic>

<data_constraints>
### Limitações de Dados
- **Campo 1**: Limite de caracteres, formato, validação
- **Campo 2**: Limite de caracteres, formato, validação
- **Campo 3**: Limite de caracteres, formato, validação
</data_constraints>
<!-- END_BUSINESS_RULES -->

<!-- TEST_SCENARIOS -->
## 🧪 Cenários de Teste

<positive_scenario>
### Cenário Positivo: [Nome do Cenário]
**Pré-condições**: [Condições necessárias]

**Etapas**:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Resultado Esperado**: [O que deve acontecer]
</positive_scenario>

<negative_scenario>
### Cenário Negativo: [Nome do Cenário]
**Pré-condições**: [Condições necessárias]

**Etapas**:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Resultado Esperado**: [O que deve acontecer]
</negative_scenario>

<edge_case_scenario>
### Caso Limite: [Nome do Cenário]
**Pré-condições**: [Condições especiais]

**Etapas**:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Resultado Esperado**: [O que deve acontecer]
</edge_case_scenario>
<!-- END_TEST_SCENARIOS -->

<!-- ACCEPTANCE_CRITERIA -->
## ✅ Critérios de Aceite

<functional_criteria>
### Funcionais
- [ ] **AC1**: Descrição específica do critério funcional
- [ ] **AC2**: Descrição específica do critério funcional
- [ ] **AC3**: Descrição específica do critério funcional
</functional_criteria>

<non_functional_criteria>
### Não-Funcionais
- [ ] **Performance**: Tempo de resposta < X segundos
- [ ] **Usabilidade**: Interface intuitiva e responsiva
- [ ] **Segurança**: Validação adequada de dados
- [ ] **Compatibilidade**: Funciona em browsers X, Y, Z
</non_functional_criteria>

<validation_criteria>
### Validação
- [ ] **Testes Unitários**: Coverage > 80%
- [ ] **Testes de Integração**: Cenários principais cobertos
- [ ] **Testes E2E**: Fluxos críticos validados
- [ ] **Code Review**: Aprovado por pelo menos 2 desenvolvedores
</validation_criteria>
<!-- END_ACCEPTANCE_CRITERIA -->

<!-- UI_REQUIREMENTS -->
## 🎨 Requisitos de Interface

<design_ux>
### Design & UX
- **Layout**: Descrição do layout esperado
- **Interações**: Comportamentos de UI específicos
- **Responsividade**: Breakpoints e comportamentos mobile
- **Acessibilidade**: Requisitos de acessibilidade (WCAG)
</design_ux>

<ui_states>
### Estados da Interface
- **Loading**: Como mostrar estados de carregamento
- **Success**: Feedback visual de sucesso
- **Error**: Tratamento e exibição de erros
- **Empty**: Estados vazios e placeholders
</ui_states>
<!-- END_UI_REQUIREMENTS -->

<!-- INTEGRATIONS -->
## 🔗 Integrações

<api_endpoints>
### Endpoints de Integração
- **POST** `/api/{{resource}}` - Descrição do endpoint
- **GET** `/api/{{resource}}/:id` - Descrição do endpoint
- **PUT** `/api/{{resource}}/:id` - Descrição do endpoint
- **DELETE** `/api/{{resource}}/:id` - Descrição do endpoint
</api_endpoints>

<external_services>
### Serviços Externos
- **Serviço 1**: Descrição da integração
- **Serviço 2**: Descrição da integração
- **Serviço 3**: Descrição da integração
</external_services>

<data_sources>
### Fontes de Dados
- **Fonte 1**: Descrição da fonte de dados
- **Fonte 2**: Descrição da fonte de dados
- **Fonte 3**: Descrição da fonte de dados
</data_sources>
<!-- END_INTEGRATIONS -->

<!-- LOGGING_ANALYTICS -->
## 📊 Logs e Analytics

<logging_requirements>
### Requisitos de Log
- **Evento 1**: Descrição do que deve ser logado
- **Evento 2**: Descrição do que deve ser logado
- **Evento 3**: Descrição do que deve ser logado
</logging_requirements>

<analytics_requirements>
### Requisitos de Analytics
- **Métrica 1**: Descrição da métrica a ser coletada
- **Métrica 2**: Descrição da métrica a ser coletada
- **Métrica 3**: Descrição da métrica a ser coletada
</analytics_requirements>
<!-- END_LOGGING_ANALYTICS -->

<!-- SUCCESS_METRICS -->
## 📈 Métricas de Sucesso

<technical_metrics>
### Métricas Técnicas
- **Performance**: Tempo de carregamento < Xms
- **Reliability**: Taxa de erro < Y%
- **Availability**: Uptime > Z%
</technical_metrics>

<business_metrics>
### Métricas de Negócio
- **Adoption**: % de usuários que utilizam a funcionalidade
- **Engagement**: Tempo médio de uso
- **Satisfaction**: Score de satisfação do usuário
- **Conversion**: Taxa de conversão relacionada
</business_metrics>
<!-- END_SUCCESS_METRICS -->

<!-- DEFINITION_OF_DONE -->
## 🚀 Definição de Pronto (DoD)

<development_dod>
### Desenvolvimento
- [ ] Código implementado conforme APPROACH.md
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Code review aprovado
</development_dod>

<quality_dod>
### Qualidade
- [ ] Todos os cenários de teste validados
- [ ] Critérios de aceitação atendidos
- [ ] Performance dentro dos limites
- [ ] Acessibilidade validada
</quality_dod>

<deploy_dod>
### Deploy
- [ ] Feature flag configurada
- [ ] Monitoramento implementado
- [ ] Documentação atualizada
- [ ] Stakeholders notificados
</deploy_dod>
<!-- END_DEFINITION_OF_DONE -->

<!-- ADDITIONAL_INFO -->
## 📝 Informações Adicionais

<figma_links>
### Links do Figma
- **Design Principal**: [Link do Figma]({{FIGMA_URL}})
- **Protótipos**: [Link dos Protótipos]({{PROTOTYPE_URL}})
</figma_links>

<additional_notes>
### Notas Complementares
*Adicione todas as informações complementares aqui, como imagens, comentários e outros.*
</additional_notes>
<!-- END_ADDITIONAL_INFO -->

<!-- METADATA -->
---
**Prioridade**: {{PRIORITY}}  
**Estimativa**: {{ESTIMATE}}  
**Stakeholder**: {{STAKEHOLDER}}  
**Data Limite**: {{DEADLINE}}  
**Última Atualização**: {{LAST_UPDATE}}  
**Responsável**: {{RESPONSIBLE}}
<!-- END_METADATA -->