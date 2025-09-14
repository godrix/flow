import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Helper functions for auto-generating content (copied from mcp-server.ts)
function generateBusinessContextContent(taskName: string, description: string, taskType: string): string {
  const typeConfig = {
    feature: { icon: '✨', category: 'Feature', priority: 'Alta' },
    bug: { icon: '🐛', category: 'Bug Fix', priority: 'Crítica' },
    improvement: { icon: '🔧', category: 'Improvement', priority: 'Média' },
    research: { icon: '🔬', category: 'Research', priority: 'Baixa' }
  };

  const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;

  // Generate more specific content based on task name and description
  const specificScenarios = generateSpecificScenarios(taskName, description, taskType);
  const specificAcceptanceCriteria = generateSpecificAcceptanceCriteria(taskName, description, taskType);
  const specificBusinessValue = generateSpecificBusinessValue(taskName, description, taskType);

  return `# Contexto de Negócio: ${taskName}

## 🎯 Visão Geral da Feature

### User Story Principal
**Como** usuário do sistema  
**Eu quero** ${description.toLowerCase()}  
**Para que** possa ter uma melhor experiência e eficiência

### Descrição da Feature
${description}

### Valor de Negócio
${specificBusinessValue}
- **Prioridade**: ${config.priority} - ${config.category}

## 📋 Especificações Comportamentais (Gherkin)

${specificScenarios}

## ✅ Critérios de Aceitação

${specificAcceptanceCriteria}

## 📊 Métricas de Sucesso

### Técnicas
- **Performance**: Tempo de resposta < 2 segundos
- **Disponibilidade**: 99.9% de uptime
- **Taxa de Erro**: < 0.1%

### Negócio
- **Adoção**: 80% dos usuários utilizam a funcionalidade
- **Satisfação**: Score > 4.0/5.0
- **Eficiência**: Redução de 20% no tempo de execução

## 🔗 Dependências e Integrações

### Dependências Internas
- Sistema de autenticação
- Base de dados principal
- Sistema de logs

### Dependências Externas
- APIs de terceiros (se aplicável)
- Serviços de notificação (se aplicável)

## 📝 Notas Adicionais

### Considerações Especiais
- Esta funcionalidade deve ser compatível com versões anteriores
- Deve seguir os padrões de design estabelecidos
- Deve ser testada em ambiente de staging antes do deploy

### Riscos Identificados
- **Risco**: Possível impacto na performance
- **Mitigação**: Implementar cache e otimizações adequadas

---
**Última Atualização**: ${new Date().toISOString().split('T')[0]}  
**Responsável**: A definir  
**Status**: Em desenvolvimento`;
}

function generateApproachContent(taskName: string, businessContext: string, taskType: string): string {
  const typeConfig = {
    feature: { icon: '✨', focus: 'Nova funcionalidade', complexity: 'Média' },
    bug: { icon: '🐛', focus: 'Correção de problema', complexity: 'Baixa' },
    improvement: { icon: '🔧', focus: 'Melhoria existente', complexity: 'Média' },
    research: { icon: '🔬', focus: 'Investigação', complexity: 'Alta' }
  };

  const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;

  // Generate specific technical approach based on task type
  const specificImplementation = generateSpecificImplementation(taskName, taskType);
  const specificTesting = generateSpecificTesting(taskName, taskType);
  const specificArchitecture = generateSpecificArchitecture(taskName, taskType);

  return `# Abordagem Técnica: ${taskName}

## 🎯 Visão Geral da Solução

### Objetivo Técnico
${config.focus} para ${taskName.toLowerCase()}

### Complexidade Estimada
- **Nível**: ${config.complexity}
- **Tempo Estimado**: ${taskType === 'bug' ? '2-4 horas' : taskType === 'feature' ? '1-2 dias' : taskType === 'improvement' ? '4-8 horas' : '1-3 dias'}
- **Risco**: ${taskType === 'bug' ? 'Baixo' : 'Médio'}

## 🏗️ Arquitetura da Solução

${specificArchitecture}

## 🔧 Implementação Técnica

${specificImplementation}

## 🧪 Estratégia de Testes

${specificTesting}

## 📋 Checklist de Implementação

### Preparação
- [ ] Analisar requisitos detalhadamente
- [ ] Revisar arquitetura existente
- [ ] Identificar dependências
- [ ] Planejar estrutura de dados

### Desenvolvimento
- [ ] Implementar estrutura base
- [ ] Desenvolver lógica principal
- [ ] Implementar validações
- [ ] Adicionar tratamento de erros

### Testes
- [ ] Escrever testes unitários
- [ ] Executar testes de integração
- [ ] Validar cenários de aceitação
- [ ] Testar performance

### Deploy
- [ ] Revisar código
- [ ] Executar testes em staging
- [ ] Preparar documentação
- [ ] Deploy em produção

## 🔍 Validação e Qualidade

### Code Review
- [ ] Revisar lógica de implementação
- [ ] Verificar padrões de código
- [ ] Validar tratamento de erros
- [ ] Confirmar testes adequados

### Performance
- [ ] Medir tempo de resposta
- [ ] Verificar uso de memória
- [ ] Otimizar consultas se necessário
- [ ] Implementar cache se aplicável

### Segurança
- [ ] Validar entrada de dados
- [ ] Verificar permissões
- [ ] Implementar logging de auditoria
- [ ] Revisar vulnerabilidades

## 📚 Documentação

### Técnica
- [ ] Documentar APIs
- [ ] Explicar algoritmos complexos
- [ ] Criar diagramas de arquitetura
- [ ] Atualizar README se necessário

### Usuário
- [ ] Criar guia de uso
- [ ] Documentar funcionalidades
- [ ] Preparar exemplos práticos
- [ ] Atualizar documentação existente

## ⚠️ Riscos e Mitigações

### Riscos Técnicos
- **Risco**: Impacto na performance
- **Mitigação**: Implementar otimizações e monitoramento

- **Risco**: Quebra de funcionalidades existentes
- **Mitigação**: Testes extensivos e deploy gradual

### Riscos de Negócio
- **Risco**: Não atender expectativas do usuário
- **Mitigação**: Validação contínua e feedback

## 📈 Métricas de Sucesso

### Técnicas
- **Cobertura de Testes**: > 80%
- **Performance**: Tempo de resposta < 2s
- **Disponibilidade**: 99.9% uptime

### Qualidade
- **Bugs em Produção**: 0 bugs críticos
- **Code Review**: Aprovação de 2+ revisores
- **Documentação**: 100% das APIs documentadas

---
**Última Atualização**: ${new Date().toISOString().split('T')[0]}  
**Responsável**: A definir  
**Status**: Em desenvolvimento`;
}

function generateCompletionReportContent(taskName: string, taskType: string): string {
  const typeConfig = {
    feature: { icon: '✨', status: 'Em Desenvolvimento', phase: 'Implementação' },
    bug: { icon: '🐛', status: 'Em Correção', phase: 'Debug' },
    improvement: { icon: '🔧', status: 'Em Otimização', phase: 'Melhoria' },
    research: { icon: '🔬', status: 'Em Investigação', phase: 'Pesquisa' }
  };

  const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;
  const currentDate = new Date().toISOString().split('T')[0];

  return `# Relatório de Progresso: ${taskName}

## 📊 Status Atual

**Status**: ${config.status}  
**Fase**: ${config.phase}  
**Iniciado em**: ${currentDate}  
**Última Atualização**: ${currentDate}  
**Responsável**: A definir

## 🎯 Objetivos da Task

### Objetivo Principal
${taskType === 'bug' ? 'Corrigir o bug reportado e garantir que não há regressões' : 
  taskType === 'feature' ? 'Implementar nova funcionalidade conforme especificações' :
  taskType === 'improvement' ? 'Otimizar funcionalidade existente para melhor performance' :
  'Conduzir investigação e documentar achados'}

### Critérios de Sucesso
- [ ] Funcionalidade implementada/testada conforme especificações
- [ ] Todos os testes passando
- [ ] Documentação atualizada
- [ ] Code review aprovado
- [ ] Deploy realizado com sucesso

## 📋 Log de Atividades

### ${currentDate} - Início da Task
- [x] Task criada e contexto inicializado
- [x] Arquivos de documentação gerados
- [ ] Análise detalhada dos requisitos
- [ ] Planejamento técnico detalhado
- [ ] Início da implementação

### Próximas Atividades
- [ ] Implementar funcionalidade principal
- [ ] Escrever testes unitários
- [ ] Executar testes de integração
- [ ] Revisar código
- [ ] Preparar documentação
- [ ] Deploy em ambiente de staging
- [ ] Validação final
- [ ] Deploy em produção

## 🔍 Checkpoints de Qualidade

### Análise e Planejamento
- [ ] Requisitos claramente definidos
- [ ] Arquitetura planejada
- [ ] Dependências identificadas
- [ ] Riscos mapeados

### Desenvolvimento
- [ ] Código seguindo padrões estabelecidos
- [ ] Testes unitários implementados
- [ ] Tratamento de erros adequado
- [ ] Logs de auditoria implementados

### Testes
- [ ] Testes unitários passando
- [ ] Testes de integração executados
- [ ] Testes de aceitação validados
- [ ] Performance testada

### Deploy
- [ ] Ambiente de staging validado
- [ ] Documentação atualizada
- [ ] Rollback plan preparado
- [ ] Monitoramento configurado

## 📈 Métricas de Progresso

### Desenvolvimento
- **Progresso**: 0% (Iniciado)
- **Linhas de Código**: 0
- **Testes Escritos**: 0
- **Bugs Encontrados**: 0

### Qualidade
- **Cobertura de Testes**: 0%
- **Code Review**: Pendente
- **Performance**: A ser medida
- **Segurança**: A ser validada

## ⚠️ Riscos e Bloqueadores

### Riscos Identificados
- **Risco**: Complexidade técnica maior que esperada
- **Mitigação**: Revisar arquitetura e considerar simplificações

- **Risco**: Dependências externas não disponíveis
- **Mitigação**: Implementar mocks e fallbacks

### Bloqueadores Atuais
- Nenhum bloqueador identificado no momento

## 📝 Notas e Observações

### Decisões Técnicas
- A definir durante o desenvolvimento

### Lições Aprendidas
- A ser documentado durante o progresso

### Próximos Passos
1. Revisar documentação de requisitos
2. Implementar funcionalidade base
3. Escrever testes
4. Validar com stakeholders
5. Preparar para deploy

---
**Template gerado automaticamente em**: ${currentDate}  
**Versão do Flow**: 1.4.0  
**Próxima revisão**: A definir`;
}

// Helper functions for specific content generation
function generateSpecificScenarios(taskName: string, description: string, taskType: string): string {
  const scenarios = [];
  
  if (taskType === 'bug') {
    scenarios.push(`### Cenário 1: Reprodução do Bug
*Cenário que reproduz o problema*

**Given** o usuário está no sistema  
**And** tem as condições que causam o bug  
**When** executa a ação que desencadeia o problema  
**Then** o sistema deve apresentar o comportamento correto  
**And** não deve mais ocorrer o erro reportado`);
  } else if (taskType === 'feature') {
    scenarios.push(`### Cenário 1: Funcionalidade Principal
*Cenário de sucesso principal*

**Given** o usuário está no sistema  
**And** tem as permissões necessárias  
**When** executa a ação principal  
**Then** deve receber o resultado esperado  
**And** o sistema deve registrar a ação`);
  } else if (taskType === 'improvement') {
    scenarios.push(`### Cenário 1: Melhoria Implementada
*Cenário com a melhoria aplicada*

**Given** o usuário está no sistema  
**And** tem acesso à funcionalidade melhorada  
**When** utiliza a funcionalidade  
**Then** deve ter uma experiência melhorada  
**And** deve notar a diferença na performance/usabilidade`);
  } else {
    scenarios.push(`### Cenário 1: Investigação Principal
*Cenário de pesquisa principal*

**Given** o pesquisador está no sistema  
**And** tem acesso às ferramentas de análise  
**When** executa a investigação  
**Then** deve obter dados relevantes  
**And** deve poder documentar os achados`);
  }

  scenarios.push(`### Cenário 2: Caso de Erro
*Cenário quando algo dá errado*

**Given** o usuário está no sistema  
**And** não tem as permissões necessárias  
**When** tenta executar a ação  
**Then** deve receber uma mensagem de erro clara  
**And** a ação não deve ser executada`);

  scenarios.push(`### Cenário 3: Validação de Dados
*Cenário de validação de entrada*

**Given** o usuário está no sistema  
**And** tem dados inválidos  
**When** tenta executar a ação  
**Then** deve receber feedback sobre os dados inválidos  
**And** deve poder corrigir os dados`);

  return scenarios.join('\n\n');
}

function generateSpecificAcceptanceCriteria(taskName: string, description: string, taskType: string): string {
  const criteria = [];
  
  if (taskType === 'bug') {
    criteria.push(`### Correção do Bug
- [ ] O bug reportado foi corrigido
- [ ] Não há regressões em funcionalidades relacionadas
- [ ] O comportamento está conforme especificado
- [ ] Testes de regressão passaram`);
  } else if (taskType === 'feature') {
    criteria.push(`### Funcionalidade Principal
- [ ] A funcionalidade executa conforme especificado
- [ ] Retorna resultado esperado em tempo adequado
- [ ] Registra logs apropriados
- [ ] Funciona em diferentes navegadores/dispositivos`);
  } else if (taskType === 'improvement') {
    criteria.push(`### Melhoria Implementada
- [ ] A melhoria está funcionando conforme esperado
- [ ] Performance/usabilidade foi melhorada
- [ ] Não há impacto negativo em funcionalidades existentes
- [ ] Métricas de melhoria foram atingidas`);
  } else {
    criteria.push(`### Investigação Completa
- [ ] Pesquisa foi conduzida conforme metodologia
- [ ] Dados foram coletados e analisados
- [ ] Conclusões foram documentadas
- [ ] Recomendações foram formuladas`);
  }

  criteria.push(`### Segurança e Validação
- [ ] Valida permissões do usuário
- [ ] Sanitiza dados de entrada
- [ ] Trata erros graciosamente
- [ ] Segue padrões de segurança estabelecidos`);

  criteria.push(`### Performance e Usabilidade
- [ ] Responde em menos de 2 segundos
- [ ] Tem interface intuitiva
- [ ] Fornece feedback visual adequado
- [ ] É acessível conforme padrões WCAG`);

  return criteria.join('\n\n');
}

function generateSpecificBusinessValue(taskName: string, description: string, taskType: string): string {
  if (taskType === 'bug') {
    return `- **Impacto**: Correção deste bug melhora a estabilidade do sistema e a confiança dos usuários
- **Métricas**: Redução de tickets de suporte relacionados e aumento na satisfação do usuário
- **Urgência**: Bug crítico que afeta funcionalidade principal`;
  } else if (taskType === 'feature') {
    return `- **Impacto**: Esta funcionalidade melhora a experiência do usuário e aumenta a eficiência do sistema
- **Métricas**: Esperamos ver uma melhoria na satisfação do usuário e redução no tempo de execução
- **ROI**: Funcionalidade estratégica que agrega valor ao produto`;
  } else if (taskType === 'improvement') {
    return `- **Impacto**: Esta melhoria otimiza processos existentes e aumenta a produtividade
- **Métricas**: Melhoria na performance, redução de tempo de execução e aumento na satisfação
- **Benefício**: Otimização incremental que gera valor contínuo`;
  } else {
    return `- **Impacto**: Esta pesquisa fornece insights valiosos para tomada de decisões estratégicas
- **Métricas**: Qualidade dos dados coletados e relevância das conclusões obtidas
- **Valor**: Conhecimento que pode ser aplicado em futuras implementações`;
  }
}

function generateSpecificArchitecture(taskName: string, taskType: string): string {
  if (taskType === 'bug') {
    return `### Componentes Afetados
1. **Root Cause**: Identificar componente que causa o bug
2. **Impact Analysis**: Analisar componentes relacionados
3. **Fix Implementation**: Implementar correção mínima
4. **Regression Testing**: Validar que não quebrou outras funcionalidades

### Fluxo de Correção
\`\`\`
1. Reproduzir o bug
2. Identificar causa raiz
3. Implementar correção
4. Testar cenários afetados
5. Validar regressões
6. Deploy da correção
\`\`\``;
  } else if (taskType === 'feature') {
    return `### Componentes Principais
1. **Controller/Handler**: Gerencia requisições e validações
2. **Service Layer**: Contém lógica de negócio
3. **Repository/DAO**: Gerencia acesso a dados
4. **Model/Entity**: Representa estruturas de dados

### Fluxo de Execução
\`\`\`
1. Validação de entrada
2. Verificação de permissões
3. Processamento da lógica de negócio
4. Persistência de dados
5. Retorno de resposta
6. Logging de auditoria
\`\`\``;
  } else if (taskType === 'improvement') {
    return `### Componentes a Otimizar
1. **Performance Layer**: Otimizar consultas e algoritmos
2. **UI/UX Layer**: Melhorar interface e experiência
3. **Data Layer**: Otimizar estrutura de dados
4. **Integration Layer**: Melhorar integrações

### Fluxo de Melhoria
\`\`\`
1. Baseline de performance atual
2. Identificar gargalos
3. Implementar otimizações
4. Medir melhorias
5. Validar impacto
6. Deploy das melhorias
\`\`\``;
  } else {
    return `### Componentes de Pesquisa
1. **Data Collection**: Coleta de dados relevantes
2. **Analysis Layer**: Análise e processamento
3. **Reporting Layer**: Documentação de achados
4. **Recommendation Engine**: Geração de recomendações

### Fluxo de Investigação
\`\`\`
1. Definição de hipóteses
2. Coleta de dados
3. Análise estatística
4. Interpretação de resultados
5. Documentação de achados
6. Formulação de recomendações
\`\`\``;
  }
}

function generateSpecificImplementation(taskName: string, taskType: string): string {
  if (taskType === 'bug') {
    return `### 1. Análise do Problema
- **Reprodução**: Documentar passos para reproduzir o bug
- **Causa Raiz**: Identificar componente responsável
- **Impacto**: Avaliar funcionalidades afetadas
- **Priorização**: Definir urgência da correção

### 2. Correção Mínima
- **Fix**: Implementar correção com menor impacto
- **Validação**: Verificar que corrige o problema
- **Regressão**: Garantir que não quebra outras funcionalidades
- **Documentação**: Documentar a correção aplicada

### 3. Testes de Validação
- **Unit Tests**: Testar componente corrigido
- **Integration Tests**: Validar integração
- **Regression Tests**: Executar bateria de testes
- **Manual Testing**: Validação manual do cenário`;
  } else if (taskType === 'feature') {
    return `### 1. Estrutura de Dados
- **Entidades**: Definir modelos de dados necessários
- **Validações**: Implementar regras de validação
- **Relacionamentos**: Estabelecer conexões entre entidades

### 2. API/Interface
- **Endpoints**: Definir rotas e métodos HTTP
- **Parâmetros**: Especificar entrada e saída
- **Respostas**: Padronizar formato de retorno
- **Tratamento de Erros**: Implementar códigos de status apropriados

### 3. Lógica de Negócio
- **Algoritmos**: Implementar processamento principal
- **Validações**: Verificar regras de negócio
- **Transformações**: Converter dados conforme necessário
- **Integrações**: Conectar com serviços externos

### 4. Persistência
- **Database**: Estruturar tabelas/coleções
- **Queries**: Otimizar consultas de dados
- **Transações**: Garantir consistência
- **Backup**: Implementar estratégias de backup`;
  } else if (taskType === 'improvement') {
    return `### 1. Análise de Performance
- **Baseline**: Medir performance atual
- **Profiling**: Identificar gargalos
- **Bottlenecks**: Localizar pontos de melhoria
- **Targets**: Definir metas de melhoria

### 2. Otimizações
- **Algoritmos**: Otimizar lógica de processamento
- **Queries**: Melhorar consultas de banco
- **Cache**: Implementar estratégias de cache
- **UI/UX**: Melhorar experiência do usuário

### 3. Validação de Melhorias
- **Métricas**: Medir impacto das otimizações
- **Comparação**: Comparar antes/depois
- **A/B Testing**: Validar melhorias com usuários
- **Monitoring**: Implementar monitoramento contínuo`;
  } else {
    return `### 1. Metodologia de Pesquisa
- **Hipóteses**: Definir hipóteses a testar
- **Metodologia**: Escolher abordagem de pesquisa
- **Dados**: Identificar fontes de dados
- **Análise**: Definir métodos de análise

### 2. Coleta de Dados
- **Instrumentos**: Desenvolver ferramentas de coleta
- **Amostragem**: Definir estratégia de amostragem
- **Qualidade**: Garantir qualidade dos dados
- **Ética**: Seguir princípios éticos

### 3. Análise e Interpretação
- **Estatística**: Aplicar métodos estatísticos
- **Visualização**: Criar visualizações dos dados
- **Interpretação**: Interpretar resultados
- **Validação**: Validar conclusões`;
  }
}

function generateSpecificTesting(taskName: string, taskType: string): string {
  if (taskType === 'bug') {
    return `### Testes de Correção
- [ ] Testar cenário que reproduz o bug
- [ ] Validar que o bug foi corrigido
- [ ] Executar testes de regressão
- [ ] Verificar funcionalidades relacionadas

### Testes de Validação
- [ ] Testar casos extremos
- [ ] Validar diferentes cenários de entrada
- [ ] Verificar performance após correção
- [ ] Confirmar que não há regressões`;
  } else if (taskType === 'feature') {
    return `### Testes Unitários
- [ ] Testar funções individuais
- [ ] Validar lógica de negócio
- [ ] Verificar tratamento de erros
- [ ] Cobrir casos extremos

### Testes de Integração
- [ ] Testar comunicação entre componentes
- [ ] Validar fluxo completo
- [ ] Verificar integrações externas
- [ ] Testar cenários de falha

### Testes de Aceitação
- [ ] Implementar cenários Gherkin definidos
- [ ] Validar comportamento esperado
- [ ] Verificar interface do usuário
- [ ] Testar performance`;
  } else if (taskType === 'improvement') {
    return `### Testes de Performance
- [ ] Medir baseline de performance
- [ ] Testar melhorias implementadas
- [ ] Comparar métricas antes/depois
- [ ] Validar metas de melhoria

### Testes de Regressão
- [ ] Executar bateria completa de testes
- [ ] Verificar funcionalidades existentes
- [ ] Validar integrações
- [ ] Confirmar estabilidade`;
  } else {
    return `### Testes de Validação
- [ ] Validar metodologia de pesquisa
- [ ] Verificar qualidade dos dados
- [ ] Testar instrumentos de coleta
- [ ] Confirmar análise estatística

### Testes de Confiabilidade
- [ ] Repetir experimentos
- [ ] Validar resultados
- [ ] Verificar consistência
- [ ] Confirmar reprodutibilidade`;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TaskCreationResult {
  success: boolean;
  taskPath?: string;
  filesCreated?: string[];
  error?: string;
}

export async function createTaskContext(taskName: string, projectPath: string, taskType: string = 'feature', autoGenerate: boolean = false, description?: string): Promise<TaskCreationResult> {
  try {
    // Criar pasta .flow se não existir
    const flowDir = path.join(projectPath, '.flow');
    await fs.ensureDir(flowDir);
    
    // Verificar se AGENTS.md existe na raiz do projeto ou na raiz do .flow
    // Se não existir em nenhum lugar, criar na raiz do projeto (comportamento padrão)
    const agentsInRoot = path.join(projectPath, 'AGENTS.md');
    const agentsInFlow = path.join(flowDir, 'AGENTS.md');
    
    if (!(await fs.pathExists(agentsInRoot)) && !(await fs.pathExists(agentsInFlow))) {
      // Criar AGENTS.md na raiz do projeto (comportamento padrão)
      const agentsTemplatePath = path.join(__dirname, '..', 'templates', 'AGENTS.md');
      if (await fs.pathExists(agentsTemplatePath)) {
        await fs.copy(agentsTemplatePath, agentsInRoot);
      }
    }
    
    // Verificar se PROJECT_CONTEXT.md existe na raiz do .flow
    // Se não existir, criar na primeira execução
    const projectContextPath = path.join(flowDir, 'PROJECT_CONTEXT.md');
    if (!(await fs.pathExists(projectContextPath))) {
      const sourceTemplatePath = path.join(__dirname, '..', 'templates', 'PROJECT_CONTEXT.md');
      if (await fs.pathExists(sourceTemplatePath)) {
        await fs.copy(sourceTemplatePath, projectContextPath);
      }
    }
    
    // Obter próximo número incremental
    const nextNumber = await getNextTaskNumber(flowDir);
    const taskDirName = `${nextNumber.toString().padStart(2, '0')}_${taskName}`;
    
    // Criar pasta da tarefa com prefixo incremental
    const taskDir = path.join(flowDir, taskDirName);
    await fs.ensureDir(taskDir);
    
    const filesCreated: string[] = [];
    
    if (autoGenerate) {
      // Gerar conteúdo automático usando as funções do MCP
      const businessContextContent = generateBusinessContextContent(taskName, description || taskName, taskType);
      const businessContextPath = path.join(taskDir, 'BUSINESS_CONTEXT.md');
      await fs.writeFile(businessContextPath, businessContextContent);
      filesCreated.push('BUSINESS_CONTEXT.md');
      
      const approachContent = generateApproachContent(taskName, businessContextContent, taskType);
      const approachPath = path.join(taskDir, 'APPROACH.md');
      await fs.writeFile(approachPath, approachContent);
      filesCreated.push('APPROACH.md');
      
      // Criar COMPLETION_REPORT.md com template básico
      const completionReportPath = path.join(taskDir, 'COMPLETION_REPORT.md');
      const completionContent = generateCompletionReportContent(taskName, taskType);
      await fs.writeFile(completionReportPath, completionContent);
      filesCreated.push('COMPLETION_REPORT.md');
    } else {
      // Usar templates tradicionais
      const taskTemplates = [
        'APPROACH.md',
        'BUSINESS_CONTEXT.md',
        'COMPLETION_REPORT.md'
      ];
      
      // Copiar templates para a pasta da tarefa com substituição de variáveis
      for (const template of taskTemplates) {
        const templatePath = path.join(__dirname, '..', 'templates', template);
        const targetPath = path.join(taskDir, template);
        
        if (await fs.pathExists(templatePath)) {
          const templateContent = await fs.readFile(templatePath, 'utf-8');
          const processedContent = replaceTemplateVariables(templateContent, taskName, taskType);
          await fs.writeFile(targetPath, processedContent);
          filesCreated.push(template);
        }
      }
    }
    
    return {
      success: true,
      taskPath: taskDir,
      filesCreated
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function replaceTemplateVariables(content: string, taskName: string, taskType: string = 'feature'): string {
  let processedContent = content.replace(/\{\{TASK_NAME\}\}/g, taskName);
  processedContent = processedContent.replace(/\{\{TASK_TYPE\}\}/g, taskType);
  
  // Add type-specific content
  const typeConfig = {
    feature: {
      icon: '✨',
      description: 'Nova funcionalidade',
      priority: 'Alta',
      category: 'Feature'
    },
    bug: {
      icon: '🐛',
      description: 'Correção de bug',
      priority: 'Crítica',
      category: 'Bug Fix'
    },
    improvement: {
      icon: '🔧',
      description: 'Melhoria de funcionalidade existente',
      priority: 'Média',
      category: 'Improvement'
    },
    research: {
      icon: '🔬',
      description: 'Pesquisa e investigação',
      priority: 'Baixa',
      category: 'Research'
    }
  };
  
  const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;
  
  processedContent = processedContent.replace(/\{\{TASK_ICON\}\}/g, config.icon);
  processedContent = processedContent.replace(/\{\{TASK_DESCRIPTION\}\}/g, config.description);
  processedContent = processedContent.replace(/\{\{TASK_PRIORITY\}\}/g, config.priority);
  processedContent = processedContent.replace(/\{\{TASK_CATEGORY\}\}/g, config.category);
  
  return processedContent;
}

async function getNextTaskNumber(flowDir: string): Promise<number> {
  try {
    const items = await fs.readdir(flowDir);
    const taskDirs = items.filter(item => {
      // Verificar se é uma pasta que começa com número (formato XX_)
      return fs.statSync(path.join(flowDir, item)).isDirectory() && /^\d{2}_/.test(item);
    });
    
    if (taskDirs.length === 0) {
      return 0;
    }
    
    // Extrair números das pastas existentes
    const numbers = taskDirs.map(dir => {
      const match = dir.match(/^(\d{2})_/);
      return match ? parseInt(match[1], 10) : -1;
    });
    
    // Retornar o próximo número
    return Math.max(...numbers) + 1;
  } catch (error) {
    return 0;
  }
} 