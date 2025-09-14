#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { createTaskContext } from './services/taskService.js';

const program = new Command();

program
  .name('flow')
  .description('CLI tool to create structured task contexts with templates')
  .version('1.4.0');

program
  .argument('<taskName>', 'Name of the task (e.g., task-1234, FEATURE_AUTH)')
  .option('-t, --type <type>', 'Task type: feature, bug, improvement, research', 'feature')
  .description('Create a new task context with templates')
  .action(async (taskName: string, options: { type: string }) => {
    try {
      console.log(chalk.blue(`🚀 Creating ${options.type} task context for: ${taskName}`));
      
      const currentDir = process.cwd();
      const result = await createTaskContext(taskName, currentDir, options.type, true, taskName);
      
      if (result.success) {
        console.log(chalk.green(`✅ Task context created successfully!`));
        console.log(chalk.gray(`📁 Location: ${result.taskPath}`));
        console.log(chalk.gray(`📄 Files created: ${result.filesCreated?.join(', ') || 'none'}`));
        console.log(chalk.gray(`🏷️  Type: ${options.type}`));
      } else {
        console.error(chalk.red(`❌ Error creating task context: ${result.error}`));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Unexpected error: ${error}`));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all existing tasks')
  .action(async () => {
    try {
      const currentDir = process.cwd();
      const flowDir = path.join(currentDir, '.flow');
      
      if (!(await fs.pathExists(flowDir))) {
        console.log(chalk.yellow('⚠️  No .flow directory found. Run "flow <task-name>" to initialize.'));
        return;
      }
      
      const items = await fs.readdir(flowDir);
      const taskDirs = items.filter(item => {
        return fs.statSync(path.join(flowDir, item)).isDirectory() && /^\d{2}_/.test(item);
      });
      
      if (taskDirs.length === 0) {
        console.log(chalk.gray('📝 No tasks found. Create your first task with "flow <task-name>"'));
        return;
      }
      
      console.log(chalk.blue('📋 Existing Tasks:'));
      console.log(chalk.gray('─'.repeat(50)));
      
      for (const taskDir of taskDirs.sort()) {
        const taskPath = path.join(flowDir, taskDir);
        const taskName = taskDir.replace(/^\d{2}_/, '');
        const taskNumber = taskDir.match(/^(\d{2})_/)?.[1] || '00';
        
        // Check if task has completion report
        const completionReportPath = path.join(taskPath, 'COMPLETION_REPORT.md');
        const hasCompletionReport = await fs.pathExists(completionReportPath);
        
        // Try to determine task type from business context
        const businessContextPath = path.join(taskPath, 'BUSINESS_CONTEXT.md');
        let taskType = 'unknown';
        if (await fs.pathExists(businessContextPath)) {
          const content = await fs.readFile(businessContextPath, 'utf-8');
          if (content.includes('FEATURE') || content.includes('feature')) taskType = 'feature';
          else if (content.includes('BUG') || content.includes('bug')) taskType = 'bug';
          else if (content.includes('IMPROVEMENT') || content.includes('improvement')) taskType = 'improvement';
          else if (content.includes('RESEARCH') || content.includes('research')) taskType = 'research';
        }
        
        const status = hasCompletionReport ? chalk.green('✅ Complete') : chalk.yellow('🔄 In Progress');
        const typeIcon = {
          feature: '✨',
          bug: '🐛',
          improvement: '🔧',
          research: '🔬',
          unknown: '📝'
        }[taskType];
        
        console.log(`${chalk.cyan(taskNumber)} ${typeIcon} ${chalk.white(taskName)} ${status}`);
      }
      
      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.gray(`Total: ${taskDirs.length} task(s)`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error listing tasks: ${error}`));
      process.exit(1);
    }
  });

program
  .command('validate <taskName>')
  .description('Validate the structure of a specific task')
  .action(async (taskName: string) => {
    try {
      const currentDir = process.cwd();
      const flowDir = path.join(currentDir, '.flow');
      
      if (!(await fs.pathExists(flowDir))) {
        console.log(chalk.red('❌ No .flow directory found.'));
        process.exit(1);
      }
      
      // Find task directory
      const items = await fs.readdir(flowDir);
      const taskDir = items.find(item => {
        return fs.statSync(path.join(flowDir, item)).isDirectory() && 
               item.endsWith(`_${taskName}`) && 
               /^\d{2}_/.test(item);
      });
      
      if (!taskDir) {
        console.log(chalk.red(`❌ Task "${taskName}" not found.`));
        console.log(chalk.gray('Use "flow list" to see available tasks.'));
        process.exit(1);
      }
      
      const taskPath = path.join(flowDir, taskDir);
      console.log(chalk.blue(`🔍 Validating task: ${taskName}`));
      console.log(chalk.gray(`📁 Path: ${taskPath}`));
      console.log(chalk.gray('─'.repeat(50)));
      
      const requiredFiles = [
        'APPROACH.md',
        'BUSINESS_CONTEXT.md', 
        'COMPLETION_REPORT.md'
      ];
      
      let isValid = true;
      const results: { file: string; status: string; issues: string[] }[] = [];
      
      for (const file of requiredFiles) {
        const filePath = path.join(taskPath, file);
        const exists = await fs.pathExists(filePath);
        const issues: string[] = [];
        
        if (!exists) {
          issues.push('File does not exist');
          isValid = false;
        } else {
          // Check if file has content
          const content = await fs.readFile(filePath, 'utf-8');
          if (content.trim().length === 0) {
            issues.push('File is empty');
            isValid = false;
          }
          
          // Check for template variables
          if (content.includes('{{TASK_NAME}}')) {
            issues.push('Contains unresolved template variables');
            isValid = false;
          }
          
          // File-specific validations
          if (file === 'BUSINESS_CONTEXT.md') {
            if (!content.includes('Given') || !content.includes('When') || !content.includes('Then')) {
              issues.push('Missing Gherkin scenarios');
              isValid = false;
            }
          }
          
          if (file === 'APPROACH.md') {
            if (!content.includes('##') || content.split('##').length < 3) {
              issues.push('Insufficient structure (needs at least 3 sections)');
              isValid = false;
            }
          }
        }
        
        results.push({
          file,
          status: issues.length === 0 ? '✅ Valid' : '❌ Issues',
          issues
        });
      }
      
      // Display results
      for (const result of results) {
        console.log(`${result.status} ${chalk.white(result.file)}`);
        if (result.issues.length > 0) {
          for (const issue of result.issues) {
            console.log(chalk.red(`   └─ ${issue}`));
          }
        }
      }
      
      console.log(chalk.gray('─'.repeat(50)));
      if (isValid) {
        console.log(chalk.green('✅ Task structure is valid!'));
      } else {
        console.log(chalk.red('❌ Task structure has issues that need to be fixed.'));
      }
      
    } catch (error) {
      console.error(chalk.red(`❌ Error validating task: ${error}`));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new Flow project')
  .option('-n, --name <name>', 'Project name')
  .option('-m, --mission <mission>', 'Project mission statement')
  .option('--agents-scoped', 'Create AGENTS.md inside .flow directory (legacy behavior)')
  .action(async (options: { name?: string; mission?: string; agentsScoped?: boolean }) => {
    try {
      console.log(chalk.blue('🚀 Initializing Flow project...'));
      
      const currentDir = process.cwd();
      
      // Check if Flow project already exists
      const flowDir = path.join(currentDir, '.flow');
      if (await fs.pathExists(flowDir)) {
        console.log(chalk.yellow('⚠️  Flow project already exists!'));
        console.log(chalk.gray(`📁 Directory: ${flowDir}`));
        console.log(chalk.gray('Use "flow update-context" to update existing context or remove .flow directory to reinitialize.'));
        return;
      }
      
      // Create .flow directory
      await fs.ensureDir(flowDir);
      
      // Create PROJECT_CONTEXT.md
      const projectContextPath = path.join(flowDir, 'PROJECT_CONTEXT.md');
      const currentDate = new Date().toISOString().split('T')[0];
      
      let projectContextContent = `# Contexto do Projeto

## 🎯 Missão & Objetivos

### Missão Principal
${options.mission || '*Descreva a missão central do projeto - o problema que resolve e o valor que entrega.*'}

### Objetivos de Longo Prazo
- **Objetivo 1**: Descrição específica e mensurável
- **Objetivo 2**: Descrição específica e mensurável
- **Objetivo 3**: Descrição específica e mensurável

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: A definir
- **Styling**: A definir
- **State Management**: A definir

### Backend
- **Runtime**: A definir
- **Framework**: A definir
- **Database**: A definir

### DevOps & Infraestrutura
- **Deployment**: A definir
- **Monitoring**: A definir
- **CI/CD**: A definir

## 🏗️ Arquitetura

### Princípios Arquiteturais
- **Modularidade**: Componentes independentes e reutilizáveis
- **Escalabilidade**: Capacidade de crescer com a demanda
- **Manutenibilidade**: Código limpo e bem documentado
- **Performance**: Otimização contínua

### Padrões de Design
- **Padrão 1**: Descrição e justificativa
- **Padrão 2**: Descrição e justificativa

### Diretrizes de Desenvolvimento
- **Code Review**: Obrigatório para todas as mudanças
- **Testing**: Cobertura mínima de 80%
- **Documentation**: Documentação atualizada

## 📋 Padrões de Desenvolvimento

### Convenções de Código
- **Naming**: camelCase para variáveis, PascalCase para classes
- **Formatting**: Prettier com configuração padrão
- **Linting**: ESLint com regras estritas

### Qualidade de Código
- **Complexity**: Máximo 10 por função
- **Duplication**: Máximo 3% de código duplicado
- **Coverage**: Mínimo 80% de cobertura de testes

### Git Workflow
- **Branches**: feature/, bugfix/, hotfix/
- **Commits**: Conventional Commits
- **Pull Requests**: Obrigatórios para merge

## 🔧 Ferramentas e Configurações

### Desenvolvimento
- **IDE**: VS Code com extensões recomendadas
- **Debugging**: Configuração específica do projeto
- **Hot Reload**: Configurado para desenvolvimento local

### Monitoramento
- **Logs**: Estruturados com níveis apropriados
- **Metrics**: Coleta de métricas de performance
- **Alerts**: Configuração de alertas críticos

### CI/CD
- **Build**: Pipeline automatizado
- **Testing**: Execução automática de testes
- **Deploy**: Deploy automático em ambientes

## 📊 Métricas de Sucesso

### Técnicas
- **Performance**: Tempo de resposta < 200ms
- **Availability**: 99.9% de uptime
- **Error Rate**: < 0.1% de erros

### Negócio
- **User Satisfaction**: Score > 4.5/5
- **Adoption Rate**: Crescimento mensal de usuários
- **Feature Usage**: Taxa de utilização de funcionalidades

## 🔄 Processo de Evolução

### Atualizações de Contexto
Este documento deve ser atualizado quando:
- Novas tecnologias são adotadas
- Princípios arquiteturais mudam
- Padrões de desenvolvimento evoluem
- Métricas de sucesso são redefinidas

### Aprovação de Mudanças
- **Minor Changes**: Aprovação do tech lead
- **Major Changes**: Aprovação do time + arquiteto
- **Architectural Changes**: Aprovação do CTO + stakeholders

---
**Última Atualização**: ${currentDate}  
**Próxima Revisão**: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}  
**Responsável**: A definir`;

      await fs.writeFile(projectContextPath, projectContextContent);
      
      // Create AGENTS.md
      const agentsPath = options.agentsScoped 
        ? path.join(flowDir, 'AGENTS.md')  // Legacy: inside .flow
        : path.join(currentDir, 'AGENTS.md'); // Default: project root
      
      const agentsTemplatePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'templates', 'AGENTS.md');
      
      if (await fs.pathExists(agentsTemplatePath)) {
        const agentsContent = await fs.readFile(agentsTemplatePath, 'utf-8');
        await fs.writeFile(agentsPath, agentsContent);
      } else {
        // Fallback: create basic AGENTS.md if template not found
        const basicAgentsContent = `# 🤖 Instruções para Agentes de IA

## 🎯 Contexto do Projeto
Este é um projeto Flow que utiliza desenvolvimento orientado a contexto.

## 📁 Estrutura do Projeto
- \`.flow/\` - Diretório principal do Flow
- \`.flow/PROJECT_CONTEXT.md\` - Contexto global do projeto
- \`AGENTS.md\` - Este arquivo com instruções para IA (${options.agentsScoped ? 'dentro de .flow/' : 'na raiz do projeto'})
- \`.flow/task-*/\` - Diretórios de tasks individuais

## 🔄 Fluxo de Desenvolvimento
1. **Criar Task**: Use \`flow <task-name>\` para nova task
2. **Definir Contexto**: Preencha BUSINESS_CONTEXT.md
3. **Planejar**: Preencha APPROACH.md
4. **Implementar**: Desenvolva a solução
5. **Documentar**: Preencha COMPLETION_REPORT.md

## ⚠️ Regras Importantes
- **Isolamento**: Cada task deve ser independente
- **Referências**: Só referencie outras tasks quando necessário
- **Qualidade**: Valide sempre com \`flow validate <task-name>\`

## 🛠️ Comandos CLI Disponíveis
- \`flow <task-name>\` - Criar nova task
- \`flow list\` - Listar tasks existentes
- \`flow validate <task-name>\` - Validar estrutura da task
- \`flow init\` - Inicializar projeto Flow
- \`flow mcp\` - Iniciar servidor MCP para IA

**Última Atualização**: ${currentDate}
`;
        await fs.writeFile(agentsPath, basicAgentsContent);
      }
      
      // Create .gitignore for .flow directory
      const gitignorePath = path.join(flowDir, '.gitignore');
      const gitignoreContent = options.agentsScoped 
        ? `# Flow project files (agents-scoped mode)
# Keep PROJECT_CONTEXT.md and AGENTS.md in version control
!PROJECT_CONTEXT.md
!AGENTS.md

# Ignore task-specific files (they should be in individual task folders)
*.md
!PROJECT_CONTEXT.md
!AGENTS.md
`
        : `# Flow project files (default mode)
# Keep PROJECT_CONTEXT.md in version control
# AGENTS.md is in project root and should be committed there
!PROJECT_CONTEXT.md

# Ignore task-specific files (they should be in individual task folders)
*.md
!PROJECT_CONTEXT.md
`;
      await fs.writeFile(gitignorePath, gitignoreContent);
      
      console.log(chalk.green('✅ Flow project initialized successfully!'));
      console.log(chalk.gray(`📁 Directory: ${flowDir}`));
      console.log(chalk.gray(`📄 PROJECT_CONTEXT.md: ${projectContextPath}`));
      console.log(chalk.gray(`📄 AGENTS.md: ${agentsPath} ${options.agentsScoped ? '(inside .flow/)' : '(in project root)'}`));
      console.log(chalk.gray(`📅 Created: ${currentDate}`));
      
      if (options.name) {
        console.log(chalk.gray(`📋 Project name: ${options.name}`));
      }
      if (options.mission) {
        console.log(chalk.gray(`🎯 Mission: ${options.mission}`));
      }
      
      console.log(chalk.blue('\n✅ Next steps:'));
      console.log(chalk.gray('1. Use "flow <task-name>" to create your first task'));
      console.log(chalk.gray('2. Use "flow list" to see all tasks'));
      console.log(chalk.gray('3. Use "flow validate <task-name>" to validate task structure'));
      console.log(chalk.gray('4. Consult AGENTS.md for detailed AI instructions'));
      
      if (options.agentsScoped) {
        console.log(chalk.yellow('\n📝 Note: AGENTS.md was created inside .flow/ (agents-scoped mode)'));
      } else {
        console.log(chalk.blue('\n📝 Note: AGENTS.md was created in project root (default mode)'));
      }
      
    } catch (error) {
      console.error(chalk.red(`❌ Error initializing Flow project: ${error}`));
      process.exit(1);
    }
  });

program
  .command('mcp')
  .description('Start MCP server for AI integration')
  .action(async () => {
    // Import and start MCP server
    const { spawn } = await import('child_process');
    const mcpServerPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'mcp-server.js');
    
    console.log(chalk.blue('🚀 Starting Flow MCP Server...'));
    console.log(chalk.gray('This server exposes Flow commands to AI assistants via MCP protocol.'));
    console.log(chalk.gray('Available tools: create_task, list_tasks, validate_task, get_task_info, get_project_status'));
    
    const server = spawn('node', [mcpServerPath], {
      stdio: 'inherit'
    });
    
    server.on('error', (error) => {
      console.error(chalk.red(`❌ MCP Server error: ${error}`));
      process.exit(1);
    });
    
    server.on('close', (code) => {
      console.log(chalk.gray(`MCP Server exited with code ${code}`));
      process.exit(code || 0);
    });
  });

program.parse(); 