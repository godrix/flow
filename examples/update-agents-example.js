#!/usr/bin/env node

/**
 * Exemplo de uso da ferramenta update_agents_template via MCP
 * 
 * Este script demonstra como atualizar automaticamente o template AGENTS.md
 * preservando as personalizações do usuário.
 */

const { spawn } = require('child_process');
const path = require('path');

// Simula uma chamada MCP para update_agents_template
function updateAgentsTemplate(options = {}) {
  const {
    workingDirectory = process.cwd(),
    forceUpdate = false,
    preserveCustomizations = true,
    backupOriginal = true
  } = options;

  console.log('🔄 Iniciando atualização do AGENTS.md...');
  console.log(`📁 Diretório: ${workingDirectory}`);
  console.log(`🔧 Força atualização: ${forceUpdate}`);
  console.log(`🔒 Preserva personalizações: ${preserveCustomizations}`);
  console.log(`💾 Backup automático: ${backupOriginal}`);

  // Simula uma chamada via MCP
  const mcpCall = {
    tool: 'update_agents_template',
    parameters: {
      workingDirectory,
      forceUpdate,
      preserveCustomizations,
      backupOriginal
    }
  };

  console.log('\n📋 Chamada MCP simulada:');
  console.log(JSON.stringify(mcpCall, null, 2));

  return mcpCall;
}

// Exemplos de uso
console.log('='.repeat(60));
console.log('🤖 Exemplos de Atualização do AGENTS.md');
console.log('='.repeat(60));

console.log('\n1️⃣ Atualização Automática (Recomendada)');
console.log('─'.repeat(40));
updateAgentsTemplate();

console.log('\n2️⃣ Atualização Forçada');
console.log('─'.repeat(40));
updateAgentsTemplate({
  forceUpdate: true
});

console.log('\n3️⃣ Atualização sem Backup (Não Recomendado)');
console.log('─'.repeat(40));
updateAgentsTemplate({
  backupOriginal: false
});

console.log('\n4️⃣ Atualização sem Preservar Personalizações (Cuidado!)');
console.log('─'.repeat(40));
updateAgentsTemplate({
  preserveCustomizations: false,
  forceUpdate: true
});

console.log('\n5️⃣ Atualização em Projeto Específico');
console.log('─'.repeat(40));
updateAgentsTemplate({
  workingDirectory: '/path/to/specific/project'
});

console.log('\n' + '='.repeat(60));
console.log('📚 Casos de Uso Comuns');
console.log('='.repeat(60));

console.log(`
🎯 **Cenário 1: Nova Versão do Flow**
   → Use atualização automática para receber novas funcionalidades
   → Preserva suas personalizações automaticamente

🔄 **Cenário 2: Sincronização de Equipe**
   → Use forceUpdate para garantir que todos tenham a mesma versão
   → Ideal para padronização em equipes

🚨 **Cenário 3: Recuperação de Template**
   → Use preserveCustomizations: false para restaurar template limpo
   → ⚠️ ATENÇÃO: Perde todas as personalizações

💾 **Cenário 4: Teste Seguro**
   → Sempre use backupOriginal: true (padrão)
   → Permite reverter mudanças se necessário
`);

console.log('\n' + '='.repeat(60));
console.log('🔧 Como Usar em Projetos Reais');
console.log('='.repeat(60));

console.log(`
📋 **Via MCP Assistant (Cursor, Claude Desktop, etc.):**

1. Certifique-se que o Flow MCP Server está rodando
2. Execute no chat com IA:

   "Use a ferramenta update_agents_template para atualizar 
    o AGENTS.md deste projeto"

3. A IA irá:
   ✅ Verificar se há atualizações disponíveis
   ✅ Criar backup automático
   ✅ Preservar suas personalizações
   ✅ Aplicar novas regras e funcionalidades

📋 **Via CLI (Futuro):**

   flow update-agents                 # Atualização automática
   flow update-agents --force         # Força atualização
   flow update-agents --no-backup     # Sem backup
`);

console.log('\n' + '='.repeat(60));
console.log('✅ Exemplo Concluído');
console.log('='.repeat(60));
