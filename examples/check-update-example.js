#!/usr/bin/env node

/**
 * Exemplo de uso da ferramenta check_agents_update via MCP
 * 
 * Este script demonstra como verificar atualizações do template AGENTS.md
 * sem aplicar mudanças, permitindo ao agente tomar decisões informadas.
 */

const { spawn } = require('child_process');
const path = require('path');

// Simula uma chamada MCP para check_agents_update
function checkAgentsUpdate(options = {}) {
  const {
    workingDirectory = process.cwd(),
    showDetails = false
  } = options;

  console.log('🔍 Verificando atualizações do AGENTS.md...');
  console.log(`📁 Diretório: ${workingDirectory}`);
  console.log(`📋 Detalhes: ${showDetails ? 'Sim' : 'Não'}`);

  // Simula uma chamada via MCP
  const mcpCall = {
    tool: 'check_agents_update',
    parameters: {
      workingDirectory,
      showDetails
    }
  };

  console.log('\n📋 Chamada MCP simulada:');
  console.log(JSON.stringify(mcpCall, null, 2));

  return mcpCall;
}

// Exemplos de uso
console.log('='.repeat(60));
console.log('🔍 Exemplos de Verificação de Atualizações');
console.log('='.repeat(60));

console.log('\n1️⃣ Verificação Simples');
console.log('─'.repeat(40));
checkAgentsUpdate();

console.log('\n2️⃣ Verificação Detalhada');
console.log('─'.repeat(40));
checkAgentsUpdate({
  showDetails: true
});

console.log('\n3️⃣ Verificação em Projeto Específico');
console.log('─'.repeat(40));
checkAgentsUpdate({
  workingDirectory: '/path/to/specific/project',
  showDetails: true
});

console.log('\n' + '='.repeat(60));
console.log('📊 Tipos de Resposta');
console.log('='.repeat(60));

console.log(`
✅ **Template Atualizado**
   📋 Versão atual: 1.9.0
   📋 Versão do template: 1.9.0
   🔍 Status: Template atualizado
   🔒 Personalizações detectadas: Sim/Não

🔄 **Atualização Disponível**
   📋 Versão atual: 1.8.0
   📋 Versão do template: 1.9.0
   🔍 Status: Atualização disponível
   🔒 Personalizações detectadas: Sim/Não
   
   📋 Principais diferenças detectadas:
   - Novas regras críticas: 1 regra(s) adicionada(s)
   - Novas ferramentas MCP: 1 ferramenta(s) adicionada(s)
   - Novas seções: 🔍 Verificação de Atualizações
   
   💡 Recomendação: Use update_agents_template com preserveCustomizations: true
`);

console.log('\n' + '='.repeat(60));
console.log('🎯 Casos de Uso');
console.log('='.repeat(60));

console.log(`
🔍 **Caso 1: Verificação Preventiva**
   → Execute antes de iniciar desenvolvimento
   → Garante que está usando a versão mais recente
   → Evita problemas de compatibilidade

📋 **Caso 2: Análise Detalhada**
   → Use showDetails: true para ver exatamente o que mudou
   → Permite avaliar impacto das atualizações
   → Facilita decisão sobre aplicar ou não

🔄 **Caso 3: Workflow Automatizado**
   → Integre em scripts de CI/CD
   → Notifique equipe sobre atualizações
   → Automatize processo de atualização

⚠️ **Caso 4: Troubleshooting**
   → Verifique se problemas são devido a versão desatualizada
   → Compare configurações entre projetos
   → Identifique inconsistências
`);

console.log('\n' + '='.repeat(60));
console.log('🤖 Como Usar com Agentes IA');
console.log('='.repeat(60));

console.log(`
📋 **Comando Simples:**
   "Verifique se há atualizações disponíveis para o AGENTS.md"

📋 **Comando Detalhado:**
   "Use check_agents_update com showDetails: true para ver 
    exatamente quais mudanças estão disponíveis"

📋 **Workflow Completo:**
   1. "Verifique atualizações do AGENTS.md"
   2. [Se necessário] "Aplique as atualizações preservando personalizações"
   3. "Valide se tudo está funcionando corretamente"

📋 **Integração com Outras Ferramentas:**
   - combine com analyze_codebase para análise completa
   - use com validate_task para verificar qualidade
   - integre com update_project_context para sincronização
`);

console.log('\n' + '='.repeat(60));
console.log('💡 Benefícios da Verificação');
console.log('='.repeat(60));

console.log(`
✅ **Para Desenvolvedores:**
   - Visibilidade sobre atualizações disponíveis
   - Controle sobre quando aplicar mudanças
   - Preservação de personalizações importantes
   - Decisões informadas sobre atualizações

✅ **Para Equipes:**
   - Sincronização de templates entre projetos
   - Padronização de processos
   - Redução de inconsistências
   - Melhoria contínua de workflows

✅ **Para Manutenção:**
   - Detecção proativa de problemas
   - Rastreabilidade de mudanças
   - Facilidade de troubleshooting
   - Automação de processos
`);

console.log('\n' + '='.repeat(60));
console.log('✅ Exemplo Concluído');
console.log('='.repeat(60));
