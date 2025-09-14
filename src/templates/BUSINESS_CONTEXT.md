# Contexto de Negócio: {{TASK_NAME}}

## 🎯 Visão Geral da Feature

### User Story Principal
**Como** [tipo de usuário]  
**Eu quero** [funcionalidade específica]  
**Para que** [valor/benefício obtido]

### Descrição da Feature
*Breve descrição do que a feature faz e por que é importante para o negócio.*

### Valor de Negócio
- **Impacto**: Como esta feature impacta os usuários/negócio
- **Métricas**: KPIs que serão afetados positivamente
- **Prioridade**: Justificativa da prioridade desta feature

## 📋 Especificações Comportamentais (Gherkin)

### Cenário 1: {{Nome do Cenário Principal}}
*Descrição breve do cenário de sucesso*

**Given** [estado inicial do sistema]  
**And** [condições adicionais necessárias]  
**When** [ação específica do usuário]  
**Then** [resultado esperado]  
**And** [resultado adicional esperado]

### Cenário 2: {{Nome do Cenário de Erro}}
*Descrição breve do cenário de erro*

**Given** [estado inicial do sistema]  
**And** [condições que levam ao erro]  
**When** [ação específica do usuário]  
**Then** [mensagem de erro esperada]  
**And** [comportamento esperado do sistema]

### Cenário 3: {{Nome do Cenário Edge Case}}
*Descrição breve do cenário de caso limite*

**Given** [estado inicial específico]  
**When** [ação em condições especiais]  
**Then** [comportamento esperado]  
**And** [validação específica]

## ✅ Critérios de Aceitação

### Funcionais
- [ ] **AC1**: Descrição específica do critério funcional
- [ ] **AC2**: Descrição específica do critério funcional
- [ ] **AC3**: Descrição específica do critério funcional

### Não-Funcionais
- [ ] **Performance**: Tempo de resposta < X segundos
- [ ] **Usabilidade**: Interface intuitiva e responsiva
- [ ] **Segurança**: Validação adequada de dados
- [ ] **Compatibilidade**: Funciona em browsers X, Y, Z

### Validação
- [ ] **Testes Unitários**: Coverage > 80%
- [ ] **Testes de Integração**: Cenários principais cobertos
- [ ] **Testes E2E**: Fluxos críticos validados
- [ ] **Code Review**: Aprovado por pelo menos 2 desenvolvedores

## 🎨 Requisitos de Interface

### Design & UX
- **Layout**: Descrição do layout esperado
- **Interações**: Comportamentos de UI específicos
- **Responsividade**: Breakpoints e comportamentos mobile
- **Acessibilidade**: Requisitos de acessibilidade (WCAG)

### Estados da Interface
- **Loading**: Como mostrar estados de carregamento
- **Success**: Feedback visual de sucesso
- **Error**: Tratamento e exibição de erros
- **Empty**: Estados vazios e placeholders

## 🔒 Regras de Negócio

### Validações
- **Input Validation**: Regras de validação de entrada
- **Business Rules**: Regras específicas do domínio
- **Data Constraints**: Limitações de dados e formatos
- **Permission Rules**: Regras de permissão e acesso

### Integrações
- **APIs**: Endpoints necessários e contratos
- **External Services**: Serviços externos utilizados
- **Data Sources**: Fontes de dados e sincronização
- **Notifications**: Sistema de notificações

## 📊 Métricas de Sucesso

### Métricas Técnicas
- **Performance**: Tempo de carregamento < Xms
- **Reliability**: Taxa de erro < Y%
- **Availability**: Uptime > Z%

### Métricas de Negócio
- **Adoption**: % de usuários que utilizam a feature
- **Engagement**: Tempo médio de uso
- **Satisfaction**: Score de satisfação do usuário
- **Conversion**: Taxa de conversão relacionada

## 🚀 Definição de Pronto (DoD)

### Desenvolvimento
- [ ] Código implementado conforme APPROACH.md
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Code review aprovado

### Qualidade
- [ ] Todos os cenários Gherkin validados
- [ ] Critérios de aceitação atendidos
- [ ] Performance dentro dos limites
- [ ] Acessibilidade validada

### Deploy
- [ ] Feature flag configurada
- [ ] Monitoramento implementado
- [ ] Documentação atualizada
- [ ] Stakeholders notificados

---

**Prioridade**: {{PRIORITY}}  
**Estimativa**: {{ESTIMATE}}  
**Stakeholder**: {{STAKEHOLDER}}  
**Data Limite**: {{DEADLINE}}