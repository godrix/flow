#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { createTaskContext } from './services/taskService.js';
import fs from 'fs-extra';
import path from 'path';

const server = new Server(
  {
    name: 'flow-mcp-server',
    version: '1.3.2',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const tools: Tool[] = [
  {
    name: 'create_task',
    description: 'Create a new task context with structured templates',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task (e.g., task-1234, FEATURE_AUTH)',
        },
        taskType: {
          type: 'string',
          enum: ['feature', 'bug', 'improvement', 'research'],
          description: 'Type of task to create',
          default: 'feature',
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory where the task should be created (defaults to current directory)',
        },
      },
      required: ['taskName'],
    },
  },
  {
    name: 'list_tasks',
    description: 'List all existing tasks in the current project',
    inputSchema: {
      type: 'object',
      properties: {
        workingDirectory: {
          type: 'string',
          description: 'Working directory to list tasks from (defaults to current directory)',
        },
      },
    },
  },
  {
    name: 'validate_task',
    description: 'Validate the structure of a specific task',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task to validate',
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory to validate task from (defaults to current directory)',
        },
      },
      required: ['taskName'],
    },
  },
  {
    name: 'get_task_info',
    description: 'Get detailed information about a specific task',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task to get information about',
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory to get task info from (defaults to current directory)',
        },
      },
      required: ['taskName'],
    },
  },
  {
    name: 'get_project_status',
    description: 'Get overall project status and statistics',
    inputSchema: {
      type: 'object',
      properties: {
        workingDirectory: {
          type: 'string',
          description: 'Working directory to get project status from (defaults to current directory)',
        },
      },
    },
  },
  {
    name: 'generate_business_context',
    description: 'Generate BUSINESS_CONTEXT.md content based on task description',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task',
        },
        description: {
          type: 'string',
          description: 'Detailed description of what needs to be implemented',
        },
        userStory: {
          type: 'string',
          description: 'User story format: As a [user], I want [goal], So that [benefit]',
        },
        acceptanceCriteria: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of acceptance criteria',
        },
        taskType: {
          type: 'string',
          enum: ['feature', 'bug', 'improvement', 'research'],
          description: 'Type of task',
          default: 'feature',
        },
      },
      required: ['taskName', 'description'],
    },
  },
  {
    name: 'generate_approach',
    description: 'Generate APPROACH.md content based on business context and codebase analysis',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task',
        },
        businessContext: {
          type: 'string',
          description: 'Business context content to base the approach on',
        },
        techStack: {
          type: 'array',
          items: { type: 'string' },
          description: 'Technologies used in the project',
        },
        architecture: {
          type: 'string',
          description: 'Current architecture description',
        },
      },
      required: ['taskName', 'businessContext'],
    },
  },
  {
    name: 'generate_completion_report',
    description: 'Generate COMPLETION_REPORT.md content based on work done',
    inputSchema: {
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          description: 'Name of the task',
        },
        workDone: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of work items completed',
        },
        issuesFound: {
          type: 'array',
          items: { type: 'string' },
          description: 'Issues or bugs found during implementation',
        },
        deviations: {
          type: 'array',
          items: { type: 'string' },
          description: 'Deviations from original plan',
        },
        metrics: {
          type: 'object',
          properties: {
            duration: { type: 'string' },
            filesChanged: { type: 'number' },
            linesAdded: { type: 'number' },
            linesRemoved: { type: 'number' },
            testCoverage: { type: 'number' },
          },
          description: 'Implementation metrics',
        },
      },
      required: ['taskName', 'workDone'],
    },
  },
  {
    name: 'analyze_codebase',
    description: 'Analyze the current codebase to understand structure and dependencies',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to analyze (defaults to current directory)',
          default: '.',
        },
        includePatterns: {
          type: 'array',
          items: { type: 'string' },
          description: 'File patterns to include in analysis',
          default: ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx', '**/*.py', '**/*.java', '**/*.go'],
        },
        excludePatterns: {
          type: 'array',
          items: { type: 'string' },
          description: 'File patterns to exclude from analysis',
          default: ['node_modules/**', 'dist/**', 'build/**', '.git/**'],
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory to analyze from (defaults to current directory)',
        },
      },
    },
  },
  {
    name: 'update_project_context',
    description: 'Update PROJECT_CONTEXT.md with new information or create it if it does not exist',
    inputSchema: {
      type: 'object',
      properties: {
        mission: {
          type: 'string',
          description: 'Updated mission statement',
        },
        goals: {
          type: 'array',
          items: { type: 'string' },
          description: 'Updated long-term goals',
        },
        techStack: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              technology: { type: 'string' },
              version: { type: 'string' },
              justification: { type: 'string' }
            },
            required: ['category', 'technology']
          },
          description: 'Updated technology stack',
        },
        architecture: {
          type: 'object',
          properties: {
            principles: { type: 'array', items: { type: 'string' } },
            patterns: { type: 'object' },
            guidelines: { type: 'array', items: { type: 'string' } }
          },
          description: 'Updated architectural principles and patterns',
        },
        standards: {
          type: 'object',
          properties: {
            coding: { type: 'array', items: { type: 'string' } },
            quality: { type: 'array', items: { type: 'string' } },
            git: { type: 'array', items: { type: 'string' } }
          },
          description: 'Updated development standards',
        },
        tools: {
          type: 'object',
          properties: {
            development: { type: 'array', items: { type: 'string' } },
            monitoring: { type: 'array', items: { type: 'string' } },
            ci_cd: { type: 'array', items: { type: 'string' } }
          },
          description: 'Updated tools and configurations',
        },
        metrics: {
          type: 'object',
          properties: {
            technical: { type: 'object' },
            business: { type: 'object' }
          },
          description: 'Updated success metrics',
        },
        notes: {
          type: 'string',
          description: 'Additional notes or context about the project',
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory to update project context in (defaults to current directory)',
        },
      },
    },
  },
  {
    name: 'init_flow_project',
    description: 'Initialize a new Flow project with .flow directory and PROJECT_CONTEXT.md',
    inputSchema: {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          description: 'Name of the project',
        },
        mission: {
          type: 'string',
          description: 'Project mission statement',
        },
        goals: {
          type: 'array',
          items: { type: 'string' },
          description: 'Long-term project goals',
        },
        techStack: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              technology: { type: 'string' },
              version: { type: 'string' },
              justification: { type: 'string' }
            },
            required: ['category', 'technology']
          },
          description: 'Technology stack for the project',
        },
        architecture: {
          type: 'object',
          properties: {
            principles: { type: 'array', items: { type: 'string' } },
            patterns: { type: 'object' },
            guidelines: { type: 'array', items: { type: 'string' } }
          },
          description: 'Architectural principles and patterns',
        },
        standards: {
          type: 'object',
          properties: {
            coding: { type: 'array', items: { type: 'string' } },
            quality: { type: 'array', items: { type: 'string' } },
            git: { type: 'array', items: { type: 'string' } }
          },
          description: 'Development standards',
        },
        tools: {
          type: 'object',
          properties: {
            development: { type: 'array', items: { type: 'string' } },
            monitoring: { type: 'array', items: { type: 'string' } },
            ci_cd: { type: 'array', items: { type: 'string' } }
          },
          description: 'Tools and configurations',
        },
        metrics: {
          type: 'object',
          properties: {
            technical: { type: 'object' },
            business: { type: 'object' }
          },
          description: 'Success metrics',
        },
        notes: {
          type: 'string',
          description: 'Additional project notes',
        },
        workingDirectory: {
          type: 'string',
          description: 'Working directory where the project should be initialized (defaults to current directory)',
        },
      },
    },
  },
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_task': {
        const { taskName, taskType = 'feature', workingDirectory } = args as { taskName: string; taskType?: string; workingDirectory?: string };
        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const result = await createTaskContext(taskName, currentDir, taskType);
        
        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `✅ Task "${taskName}" created successfully!\n` +
                      `📁 Location: ${result.taskPath}\n` +
                      `📄 Files created: ${result.filesCreated?.join(', ') || 'none'}\n` +
                      `🏷️ Type: ${taskType}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Error creating task: ${result.error}`,
              },
            ],
            isError: true,
          };
        }
      }

      case 'list_tasks': {
        const { workingDirectory } = args as { workingDirectory?: string };
        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        
        if (!(await fs.pathExists(flowDir))) {
          return {
            content: [
              {
                type: 'text',
                text: '⚠️ No .flow directory found. Run "create_task" to initialize.',
              },
            ],
          };
        }
        
        const items = await fs.readdir(flowDir);
        const taskDirs = items.filter(item => {
          return fs.statSync(path.join(flowDir, item)).isDirectory() && /^\d{2}_/.test(item);
        });
        
        if (taskDirs.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: '📝 No tasks found. Create your first task with "create_task".',
              },
            ],
          };
        }
        
        let output = '📋 Existing Tasks:\n';
        output += '─'.repeat(50) + '\n';
        
        for (const taskDir of taskDirs.sort()) {
          const taskPath = path.join(flowDir, taskDir);
          const taskName = taskDir.replace(/^\d{2}_/, '');
          const taskNumber = taskDir.match(/^(\d{2})_/)?.[1] || '00';
          
          // Check if task has completion report
          const completionReportPath = path.join(taskPath, 'COMPLETION_REPORT.md');
          const hasCompletionReport = await fs.pathExists(completionReportPath);
          
          // Try to determine task type
          const businessContextPath = path.join(taskPath, 'BUSINESS_CONTEXT.md');
          let taskType = 'unknown';
          if (await fs.pathExists(businessContextPath)) {
            const content = await fs.readFile(businessContextPath, 'utf-8');
            if (content.includes('FEATURE') || content.includes('feature')) taskType = 'feature';
            else if (content.includes('BUG') || content.includes('bug')) taskType = 'bug';
            else if (content.includes('IMPROVEMENT') || content.includes('improvement')) taskType = 'improvement';
            else if (content.includes('RESEARCH') || content.includes('research')) taskType = 'research';
          }
          
          const status = hasCompletionReport ? '✅ Complete' : '🔄 In Progress';
          const typeIcon = {
            feature: '✨',
            bug: '🐛',
            improvement: '🔧',
            research: '🔬',
            unknown: '📝'
          }[taskType];
          
          output += `${taskNumber} ${typeIcon} ${taskName} ${status}\n`;
        }
        
        output += '─'.repeat(50) + '\n';
        output += `Total: ${taskDirs.length} task(s)`;
        
        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'validate_task': {
        const { taskName, workingDirectory } = args as { taskName: string; workingDirectory?: string };
        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        
        if (!(await fs.pathExists(flowDir))) {
          return {
            content: [
              {
                type: 'text',
                text: '❌ No .flow directory found.',
              },
            ],
            isError: true,
          };
        }
        
        // Find task directory
        const items = await fs.readdir(flowDir);
        const taskDir = items.find(item => {
          return fs.statSync(path.join(flowDir, item)).isDirectory() && 
                 item.endsWith(`_${taskName}`) && 
                 /^\d{2}_/.test(item);
        });
        
        if (!taskDir) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Task "${taskName}" not found. Use "list_tasks" to see available tasks.`,
              },
            ],
            isError: true,
          };
        }
        
        const taskPath = path.join(flowDir, taskDir);
        let output = `🔍 Validating task: ${taskName}\n`;
        output += `📁 Path: ${taskPath}\n`;
        output += '─'.repeat(50) + '\n';
        
        const requiredFiles = [
          'APPROACH.md',
          'BUSINESS_CONTEXT.md', 
          'COMPLETION_REPORT.md'
        ];
        
        let isValid = true;
        
        for (const file of requiredFiles) {
          const filePath = path.join(taskPath, file);
          const exists = await fs.pathExists(filePath);
          const issues: string[] = [];
          
          if (!exists) {
            issues.push('File does not exist');
            isValid = false;
          } else {
            const content = await fs.readFile(filePath, 'utf-8');
            if (content.trim().length === 0) {
              issues.push('File is empty');
              isValid = false;
            }
            
            if (content.includes('{{TASK_NAME}}')) {
              issues.push('Contains unresolved template variables');
              isValid = false;
            }
            
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
          
          const status = issues.length === 0 ? '✅ Valid' : '❌ Issues';
          output += `${status} ${file}\n`;
          if (issues.length > 0) {
            for (const issue of issues) {
              output += `   └─ ${issue}\n`;
            }
          }
        }
        
        output += '─'.repeat(50) + '\n';
        if (isValid) {
          output += '✅ Task structure is valid!';
        } else {
          output += '❌ Task structure has issues that need to be fixed.';
        }
        
        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'get_task_info': {
        const { taskName, workingDirectory } = args as { taskName: string; workingDirectory?: string };
        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        
        if (!(await fs.pathExists(flowDir))) {
          return {
            content: [
              {
                type: 'text',
                text: '❌ No .flow directory found.',
              },
            ],
            isError: true,
          };
        }
        
        // Find task directory
        const items = await fs.readdir(flowDir);
        const taskDir = items.find(item => {
          return fs.statSync(path.join(flowDir, item)).isDirectory() && 
                 item.endsWith(`_${taskName}`) && 
                 /^\d{2}_/.test(item);
        });
        
        if (!taskDir) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Task "${taskName}" not found.`,
              },
            ],
            isError: true,
          };
        }
        
        const taskPath = path.join(flowDir, taskDir);
        const taskNumber = taskDir.match(/^(\d{2})_/)?.[1] || '00';
        
        let output = `📋 Task Information: ${taskName}\n`;
        output += `📁 Path: ${taskPath}\n`;
        output += `🔢 Number: ${taskNumber}\n`;
        output += '─'.repeat(50) + '\n';
        
        // Read and summarize each file
        const files = ['BUSINESS_CONTEXT.md', 'APPROACH.md', 'COMPLETION_REPORT.md'];
        
        for (const file of files) {
          const filePath = path.join(taskPath, file);
          if (await fs.pathExists(filePath)) {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\n').slice(0, 5); // First 5 lines
            output += `\n📄 ${file}:\n`;
            output += lines.join('\n') + '\n';
          }
        }
        
        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'get_project_status': {
        const { workingDirectory } = args as { workingDirectory?: string };
        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        
        if (!(await fs.pathExists(flowDir))) {
          return {
            content: [
              {
                type: 'text',
                text: '⚠️ No .flow directory found. Project not initialized.',
              },
            ],
          };
        }
        
        const items = await fs.readdir(flowDir);
        const taskDirs = items.filter(item => {
          return fs.statSync(path.join(flowDir, item)).isDirectory() && /^\d{2}_/.test(item);
        });
        
        let completedTasks = 0;
        let inProgressTasks = 0;
        const taskTypes = { feature: 0, bug: 0, improvement: 0, research: 0, unknown: 0 };
        
        for (const taskDir of taskDirs) {
          const taskPath = path.join(flowDir, taskDir);
          const completionReportPath = path.join(taskPath, 'COMPLETION_REPORT.md');
          const hasCompletionReport = await fs.pathExists(completionReportPath);
          
          if (hasCompletionReport) {
            completedTasks++;
          } else {
            inProgressTasks++;
          }
          
          // Determine task type
          const businessContextPath = path.join(taskPath, 'BUSINESS_CONTEXT.md');
          if (await fs.pathExists(businessContextPath)) {
            const content = await fs.readFile(businessContextPath, 'utf-8');
            if (content.includes('FEATURE') || content.includes('feature')) taskTypes.feature++;
            else if (content.includes('BUG') || content.includes('bug')) taskTypes.bug++;
            else if (content.includes('IMPROVEMENT') || content.includes('improvement')) taskTypes.improvement++;
            else if (content.includes('RESEARCH') || content.includes('research')) taskTypes.research++;
            else taskTypes.unknown++;
          } else {
            taskTypes.unknown++;
          }
        }
        
        let output = '📊 Project Status\n';
        output += '─'.repeat(50) + '\n';
        output += `📈 Total Tasks: ${taskDirs.length}\n`;
        output += `✅ Completed: ${completedTasks}\n`;
        output += `🔄 In Progress: ${inProgressTasks}\n`;
        output += `📊 Completion Rate: ${taskDirs.length > 0 ? Math.round((completedTasks / taskDirs.length) * 100) : 0}%\n\n`;
        
        output += '📋 Task Types:\n';
        output += `✨ Features: ${taskTypes.feature}\n`;
        output += `🐛 Bugs: ${taskTypes.bug}\n`;
        output += `🔧 Improvements: ${taskTypes.improvement}\n`;
        output += `🔬 Research: ${taskTypes.research}\n`;
        output += `📝 Unknown: ${taskTypes.unknown}\n`;
        
        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'generate_business_context': {
        const { taskName, description, userStory, acceptanceCriteria = [], taskType = 'feature' } = args as {
          taskName: string;
          description: string;
          userStory?: string;
          acceptanceCriteria?: string[];
          taskType?: string;
        };

        const typeConfig = {
          feature: { icon: '✨', category: 'Feature', priority: 'Alta' },
          bug: { icon: '🐛', category: 'Bug Fix', priority: 'Crítica' },
          improvement: { icon: '🔧', category: 'Improvement', priority: 'Média' },
          research: { icon: '🔬', category: 'Research', priority: 'Baixa' }
        };

        const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;

        let businessContext = `# Contexto de Negócio: ${taskName}

## 🎯 Visão Geral da Feature

### User Story Principal
${userStory || `**Como** usuário do sistema  
**Eu quero** ${description.toLowerCase()}  
**Para que** possa ter uma melhor experiência e eficiência`}

### Descrição da Feature
${description}

### Valor de Negócio
- **Impacto**: Esta funcionalidade melhora a experiência do usuário e aumenta a eficiência do sistema
- **Métricas**: Esperamos ver uma melhoria na satisfação do usuário e redução no tempo de execução
- **Prioridade**: ${config.priority} - ${config.category}

## 📋 Especificações Comportamentais (Gherkin)

### Cenário 1: Funcionalidade Principal
*Cenário de sucesso principal*

**Given** o usuário está no sistema  
**And** tem as permissões necessárias  
**When** executa a ação principal  
**Then** deve receber o resultado esperado  
**And** o sistema deve registrar a ação

### Cenário 2: Caso de Erro
*Cenário quando algo dá errado*

**Given** o usuário está no sistema  
**And** ocorre uma condição de erro  
**When** executa a ação  
**Then** deve receber uma mensagem de erro clara  
**And** o sistema deve manter a integridade dos dados

### Cenário 3: Caso Limite
*Cenário com condições especiais*

**Given** o usuário está em uma situação específica  
**When** executa a ação  
**Then** deve ter o comportamento adequado  
**And** deve ser tratado corretamente

## ✅ Critérios de Aceitação

### Funcionais`;

        if (acceptanceCriteria.length > 0) {
          acceptanceCriteria.forEach((criteria, index) => {
            businessContext += `\n- [ ] **AC${index + 1}**: ${criteria}`;
          });
        } else {
          businessContext += `\n- [ ] **AC1**: A funcionalidade deve funcionar conforme especificado
- [ ] **AC2**: Deve ter tratamento adequado de erros
- [ ] **AC3**: Deve ser intuitiva para o usuário`;
        }

        businessContext += `

### Não-Funcionais
- [ ] **Performance**: Tempo de resposta < 200ms
- [ ] **Usabilidade**: Interface intuitiva e responsiva
- [ ] **Segurança**: Validação adequada de dados
- [ ] **Compatibilidade**: Funciona em browsers modernos

### Validação
- [ ] **Testes Unitários**: Coverage > 80%
- [ ] **Testes de Integração**: Cenários principais cobertos
- [ ] **Testes E2E**: Fluxos críticos validados
- [ ] **Code Review**: Aprovado por pelo menos 2 desenvolvedores

## 🎨 Requisitos de Interface

### Design & UX
- **Layout**: Interface limpa e organizada
- **Interações**: Feedback visual imediato
- **Responsividade**: Funciona em desktop e mobile
- **Acessibilidade**: Segue padrões WCAG

### Estados da Interface
- **Loading**: Indicador de carregamento durante operações
- **Success**: Confirmação visual de sucesso
- **Error**: Mensagens de erro claras e acionáveis
- **Empty**: Estados vazios com call-to-action

## 🔒 Regras de Negócio

### Validações
- **Input Validation**: Validação de dados de entrada
- **Business Rules**: Regras específicas do domínio
- **Data Constraints**: Limitações e formatos de dados
- **Permission Rules**: Controle de acesso adequado

### Integrações
- **APIs**: Endpoints necessários para a funcionalidade
- **External Services**: Serviços externos utilizados
- **Data Sources**: Fontes de dados e sincronização
- **Notifications**: Sistema de notificações quando aplicável

## 📊 Métricas de Sucesso

### Métricas Técnicas
- **Performance**: Tempo de resposta dentro dos limites
- **Reliability**: Taxa de erro < 1%
- **Availability**: Funcionamento estável

### Métricas de Negócio
- **Adoption**: Taxa de uso da funcionalidade
- **Engagement**: Tempo médio de interação
- **Satisfaction**: Feedback positivo dos usuários
- **Efficiency**: Redução no tempo de execução

## 🚀 Definição de Pronto (DoD)

### Desenvolvimento
- [ ] Código implementado conforme especificação
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

**Prioridade**: ${config.priority}  
**Estimativa**: A definir  
**Stakeholder**: A definir  
**Data Limite**: A definir`;

        return {
          content: [
            {
              type: 'text',
              text: `✅ BUSINESS_CONTEXT.md gerado para "${taskName}"\n\n${businessContext}`,
            },
          ],
        };
      }

      case 'generate_approach': {
        const { taskName, businessContext, techStack = [], architecture = '' } = args as {
          taskName: string;
          businessContext: string;
          techStack?: string[];
          architecture?: string;
        };

        // Extract key information from business context
        const hasGherkin = businessContext.includes('Given') && businessContext.includes('When') && businessContext.includes('Then');
        const hasAcceptanceCriteria = businessContext.includes('Critérios de Aceitação');
        const isFeature = businessContext.includes('feature') || businessContext.includes('Feature');
        const isBug = businessContext.includes('bug') || businessContext.includes('Bug');
        const isImprovement = businessContext.includes('improvement') || businessContext.includes('Improvement');

        let taskType = 'feature';
        if (isBug) taskType = 'bug';
        else if (isImprovement) taskType = 'improvement';

        const typeConfig = {
          feature: { icon: '✨', focus: 'Nova funcionalidade', complexity: 'Média' },
          bug: { icon: '🐛', focus: 'Correção de problema', complexity: 'Baixa' },
          improvement: { icon: '🔧', focus: 'Melhoria existente', complexity: 'Média' },
          research: { icon: '🔬', focus: 'Investigação', complexity: 'Alta' }
        };

        const config = typeConfig[taskType as keyof typeof typeConfig] || typeConfig.feature;

        let approach = `# Abordagem Técnica: ${taskName}

## 🎯 Visão Geral da Solução

### Resumo Executivo
${config.focus} que ${businessContext.split('\n')[4]?.replace('### Descrição da Feature', '').trim() || 'implementa a funcionalidade solicitada'}. Esta solução foi projetada para ser ${config.complexity === 'Baixa' ? 'simples e direta' : config.complexity === 'Média' ? 'robusta e escalável' : 'completa e abrangente'}.

### Objetivos Técnicos
- **Objetivo 1**: Implementar a funcionalidade conforme especificação
- **Objetivo 2**: Garantir qualidade e performance adequadas
- **Objetivo 3**: Manter compatibilidade com o sistema existente

## 🏗️ Arquitetura da Solução

### Componentes Afetados
| Componente | Tipo | Responsabilidade | Impacto |
|------------|------|------------------|---------|
| Frontend | Interface | Apresentação e interação | ${taskType === 'bug' ? 'Baixo' : 'Alto'} |
| Backend | API | Lógica de negócio | ${taskType === 'bug' ? 'Médio' : 'Alto'} |
| Database | Persistência | Armazenamento de dados | ${taskType === 'bug' ? 'Baixo' : 'Médio'} |

### Diagrama de Arquitetura
\`\`\`mermaid
graph TD
    A[Frontend] --> B[API Gateway]
    B --> C[Service Layer]
    C --> D[Database]
    C --> E[External Services]
\`\`\`

### Fluxo de Dados
1. **Entrada**: Dados recebidos do usuário
2. **Validação**: Verificação de dados e permissões
3. **Processamento**: Lógica de negócio aplicada
4. **Persistência**: Armazenamento no banco de dados
5. **Resposta**: Retorno para o usuário

## 📊 Modelos de Dados

### Entidades Principais
\`\`\`typescript
interface ${taskName.replace(/[^a-zA-Z0-9]/g, '')}Entity {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### Relacionamentos
- **Entity A** → **Entity B** (1:N)
- **Entity B** → **Entity C** (N:1)

### Validações
- **Campo 1**: Validação de formato e tamanho
- **Campo 2**: Validação de tipo e range
- **Campo 3**: Validação customizada de negócio

## 🔌 Contratos de API

### Endpoints Necessários
| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | \`/api/${taskName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}\` | Listar recursos | query params |
| POST | \`/api/${taskName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}\` | Criar recurso | body payload |
| PUT | \`/api/${taskName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}/:id\` | Atualizar recurso | id + body |
| DELETE | \`/api/${taskName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}/:id\` | Remover recurso | id |

### Schemas de Request/Response
\`\`\`json
{
  "request": {
    "name": "string",
    "description": "string"
  },
  "response": {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "datetime"
  }
}
\`\`\`

## 🛠️ Plano de Implementação

### Fase 1: Preparação (Dia 1)
- [ ] **1.1** Configurar ambiente de desenvolvimento
- [ ] **1.2** Criar estrutura de pastas
- [ ] **1.3** Configurar dependências necessárias
- [ ] **1.4** Implementar testes básicos de setup

### Fase 2: Backend (Dias 2-3)
- [ ] **2.1** Criar modelos de dados
- [ ] **2.2** Implementar validações
- [ ] **2.3** Desenvolver endpoints da API
- [ ] **2.4** Implementar testes unitários
- [ ] **2.5** Criar testes de integração

### Fase 3: Frontend (Dias 4-5)
- [ ] **3.1** Criar componentes base
- [ ] **3.2** Implementar formulários
- [ ] **3.3** Integrar com API
- [ ] **3.4** Implementar tratamento de erros
- [ ] **3.5** Criar testes de componente

### Fase 4: Integração & Testes (Dia 6)
- [ ] **4.1** Testes end-to-end
- [ ] **4.2** Validação de performance
- [ ] **4.3** Testes de acessibilidade
- [ ] **4.4** Code review e ajustes

## 🧪 Estratégia de Testes

### Testes Unitários
- **Cobertura**: Mínimo 80%
- **Frameworks**: Jest, React Testing Library
- **Foco**: Lógica de negócio e componentes isolados

### Testes de Integração
- **API Tests**: Validação de endpoints
- **Database Tests**: Operações de CRUD
- **Component Tests**: Interação entre componentes

### Testes E2E
- **Cenários**: Fluxos críticos de usuário
- **Ferramenta**: Cypress ou Playwright
- **Ambiente**: Staging environment

## 🔒 Considerações de Segurança

### Autenticação & Autorização
- **JWT Tokens**: Para autenticação de sessão
- **Role-based Access**: Controle de permissões
- **Input Sanitization**: Prevenção de XSS/SQL injection

### Validação de Dados
- **Client-side**: Validação imediata para UX
- **Server-side**: Validação obrigatória para segurança
- **Type Safety**: TypeScript para prevenção de erros

## 📈 Monitoramento & Observabilidade

### Métricas Técnicas
- **Performance**: Tempo de resposta, throughput
- **Errors**: Taxa de erro, tipos de erro
- **Usage**: Endpoints mais utilizados

### Logs Estruturados
- **Request/Response**: Logs de API calls
- **Business Events**: Eventos importantes do negócio
- **Error Tracking**: Stack traces e contexto

## 🚀 Deploy & Infraestrutura

### Estratégia de Deploy
- **Feature Flags**: Deploy gradual
- **Rollback Plan**: Plano de reversão
- **Health Checks**: Verificação de saúde

### Ambientes
- **Development**: Ambiente local
- **Staging**: Ambiente de testes
- **Production**: Ambiente de produção

## ⚠️ Riscos & Mitigações

### Riscos Técnicos
| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Performance | Média | Alto | Load testing, otimização |
| Integração | Alta | Médio | Testes de integração |
| Segurança | Baixa | Alto | Code review, pentesting |

### Plano de Contingência
- **Rollback**: Procedimento de reversão
- **Hotfix**: Processo de correção rápida
- **Escalation**: Quando escalar para stakeholders

---

**Arquiteto**: A definir  
**Tech Lead**: A definir  
**Estimativa Total**: A definir  
**Data de Início**: A definir  
**Data de Conclusão**: A definir`;

        return {
          content: [
            {
              type: 'text',
              text: `✅ APPROACH.md gerado para "${taskName}"\n\n${approach}`,
            },
          ],
        };
      }

      case 'generate_completion_report': {
        const { taskName, workDone, issuesFound = [], deviations = [], metrics = {} } = args as {
          taskName: string;
          workDone: string[];
          issuesFound?: string[];
          deviations?: string[];
          metrics?: {
            duration?: string;
            filesChanged?: number;
            linesAdded?: number;
            linesRemoved?: number;
            testCoverage?: number;
          };
        };

        const currentDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - (metrics.duration ? parseInt(metrics.duration) * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        let completionReport = `# Relatório de Conclusão: ${taskName}

## 📊 Resumo Executivo

| Campo | Valor |
|-------|-------|
| **Feature** | ${taskName} |
| **Status** | ✅ Concluído |
| **Data Início** | ${startDate} |
| **Data Conclusão** | ${currentDate} |
| **Duração** | ${metrics.duration || '7 dias'} |
| **Desenvolvedor** | A definir |

### Resumo da Implementação
A funcionalidade foi implementada com sucesso conforme especificado. ${workDone.length} itens de trabalho foram concluídos, resultando em uma solução robusta e bem testada.

## 🔗 Referências

- **Contexto de Negócio**: [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md)
- **Abordagem Técnica**: [APPROACH.md](./APPROACH.md)
- **Pull Request**: A definir
- **Deploy**: A definir

## 📝 Log Cronológico de Trabalho

*Registro reverso-cronológico de todas as ações significativas realizadas*

### ${currentDate} - Conclusão`;

        workDone.forEach((work, index) => {
          completionReport += `\n- **✅ COMPLETED**: ${work}`;
        });

        if (issuesFound.length > 0) {
          completionReport += `\n\n### ${startDate} - Correções`;
          issuesFound.forEach((issue, index) => {
            completionReport += `\n- **🔧 FIXED**: ${issue}`;
          });
        }

        completionReport += `

## ✅ Validação de Critérios de Aceitação

### Critérios Funcionais
- [x] **AC1**: Funcionalidade implementada conforme especificação - ✅ Validado
- [x] **AC2**: Tratamento de erros implementado - ✅ Validado  
- [x] **AC3**: Interface intuitiva criada - ✅ Validado

### Critérios Não-Funcionais
- [x] **Performance**: Tempo de resposta < 200ms - ✅ Validado
- [x] **Usabilidade**: Interface responsiva e intuitiva - ✅ Validado
- [x] **Segurança**: Validação adequada implementada - ✅ Validado
- [x] **Compatibilidade**: Testado em browsers modernos - ✅ Validado

### Cenários Gherkin
- [x] **Cenário 1**: Funcionalidade Principal - ✅ Todos os passos validados
- [x] **Cenário 2**: Caso de Erro - ✅ Todos os passos validados
- [x] **Cenário 3**: Caso Limite - ✅ Todos os passos validados

## 🔄 Desvios do Plano Original`;

        if (deviations.length > 0) {
          completionReport += `\n\n### Desvios Implementados
| Desvio | Motivo | Impacto | Aprovação |
|--------|--------|---------|-----------|`;
          deviations.forEach((deviation, index) => {
            completionReport += `\n| ${deviation} | Melhoria técnica | Positivo | ✅ Aprovado |`;
          });
        } else {
          completionReport += `\n\n### Desvios Implementados
*Nenhum desvio significativo do plano original foi necessário.*`;
        }

        completionReport += `

### Decisões Técnicas
- **Decisão 1**: Implementação seguindo padrões estabelecidos
- **Decisão 2**: Uso de tecnologias já consolidadas no projeto
- **Decisão 3**: Foco em qualidade e manutenibilidade

## 📈 Métricas de Qualidade

### Cobertura de Testes
- **Unitários**: ${metrics.testCoverage || 85}% (meta: 80%) ✅
- **Integração**: 90% (meta: 85%) ✅
- **E2E**: 100% dos cenários críticos ✅

### Performance
- **Tempo de Carregamento**: 1.2s (meta: <2s) ✅
- **Tempo de Resposta API**: 150ms (meta: <200ms) ✅
- **Bundle Size**: 245KB (meta: <300KB) ✅

### Qualidade de Código
- **ESLint**: 0 erros ✅
- **TypeScript**: 0 erros ✅
- **Code Review**: Aprovado por 2 desenvolvedores ✅

## 🚀 Deploy & Monitoramento

### Informações de Deploy
- **Ambiente**: Production
- **Versão**: A definir
- **Data Deploy**: ${currentDate}
- **Feature Flag**: A definir

### Monitoramento Pós-Deploy
- **Uptime**: 99.9% (primeiras 24h)
- **Error Rate**: 0.1% (dentro do esperado)
- **Performance**: Dentro dos limites estabelecidos
- **User Feedback**: Positivo

## 🔮 Ações de Follow-up

### Melhorias Futuras
- [ ] **Enhancement**: Otimizações de performance
- [ ] **Feature**: Funcionalidades adicionais
- [ ] **Integration**: Melhorias de integração

### Tech Debt Identificado
- [ ] **Refactor**: Simplificações de código
- [ ] **Test**: Mais testes de edge cases
- [ ] **Documentation**: Atualizações de documentação

### Lições Aprendidas
- **Positivo**: Implementação bem-sucedida seguindo metodologia
- **Melhoria**: Processo pode ser otimizado
- **Insight**: Boa estrutura facilita desenvolvimento

## 📋 Checklist Final

- [x] Todos os critérios de aceitação atendidos
- [x] Testes passando (unit, integration, e2e)
- [x] Code review aprovado
- [x] Documentação atualizada
- [x] Deploy realizado com sucesso
- [x] Monitoramento configurado
- [x] Stakeholders notificados
- [x] Feature flag configurada
- [x] Métricas de qualidade validadas

---

**Status Final**: ✅ **CONCLUÍDO COM SUCESSO**  
**Próxima Revisão**: A definir  
**Responsável pelo Follow-up**: A definir`;

        return {
          content: [
            {
              type: 'text',
              text: `✅ COMPLETION_REPORT.md gerado para "${taskName}"\n\n${completionReport}`,
            },
          ],
        };
      }

      case 'analyze_codebase': {
        const { path: analyzePath = '.', includePatterns = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'], excludePatterns = ['node_modules/**', 'dist/**', 'build/**', '.git/**'], workingDirectory } = args as {
          path?: string;
          includePatterns?: string[];
          excludePatterns?: string[];
          workingDirectory?: string;
        };

        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const targetPath = path.resolve(currentDir, analyzePath);

        if (!(await fs.pathExists(targetPath))) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Path "${targetPath}" does not exist.`,
              },
            ],
            isError: true,
          };
        }

        let output = `🔍 Codebase Analysis: ${targetPath}\n`;
        output += '─'.repeat(50) + '\n';

        try {
          // Analyze package.json if exists
          const packageJsonPath = path.join(targetPath, 'package.json');
          if (await fs.pathExists(packageJsonPath)) {
            const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
            output += `\n📦 Project: ${packageJson.name || 'Unknown'}\n`;
            output += `📋 Version: ${packageJson.version || 'Unknown'}\n`;
            output += `📝 Description: ${packageJson.description || 'No description'}\n`;
            
            if (packageJson.dependencies) {
              output += `\n🔧 Dependencies (${Object.keys(packageJson.dependencies).length}):\n`;
              Object.entries(packageJson.dependencies).slice(0, 10).forEach(([name, version]) => {
                output += `  - ${name}: ${version}\n`;
              });
              if (Object.keys(packageJson.dependencies).length > 10) {
                output += `  ... and ${Object.keys(packageJson.dependencies).length - 10} more\n`;
              }
            }
          }

          // Analyze directory structure
          const analyzeDir = async (dirPath: string, depth = 0, maxDepth = 3): Promise<string> => {
            if (depth > maxDepth) return '';
            
            let result = '';
            try {
              const items = await fs.readdir(dirPath);
              const dirs = items.filter(item => {
                const itemPath = path.join(dirPath, item);
                return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
              });
              
              const files = items.filter(item => {
                const itemPath = path.join(dirPath, item);
                return fs.statSync(itemPath).isFile() && !item.startsWith('.');
              });

              if (depth === 0) {
                result += `\n📁 Directory Structure:\n`;
              }

              const indent = '  '.repeat(depth);
              dirs.slice(0, 5).forEach(dir => {
                result += `${indent}📁 ${dir}/\n`;
                result += analyzeDir(path.join(dirPath, dir), depth + 1, maxDepth);
              });

              if (dirs.length > 5) {
                result += `${indent}... and ${dirs.length - 5} more directories\n`;
              }

              files.slice(0, 5).forEach(file => {
                result += `${indent}📄 ${file}\n`;
              });

              if (files.length > 5) {
                result += `${indent}... and ${files.length - 5} more files\n`;
              }
            } catch (error) {
              result += `${'  '.repeat(depth)}❌ Error reading directory\n`;
            }
            return result;
          };

          output += analyzeDir(targetPath);

          // Analyze common config files
          const configFiles = [
            'tsconfig.json',
            'eslint.config.js',
            '.eslintrc.js',
            'jest.config.js',
            'webpack.config.js',
            'vite.config.js',
            'next.config.js',
            'tailwind.config.js'
          ];

          output += `\n⚙️ Configuration Files:\n`;
          for (const configFile of configFiles) {
            const configPath = path.join(targetPath, configFile);
            if (await fs.pathExists(configPath)) {
              output += `  ✅ ${configFile}\n`;
            }
          }

          // Count files by type
          const fileCounts: { [key: string]: number } = {};
          const countFiles = async (dirPath: string): Promise<void> => {
            try {
              const items = await fs.readdir(dirPath);
              for (const item of items) {
                const itemPath = path.join(dirPath, item);
                const stat = await fs.stat(itemPath);
                
                if (stat.isDirectory() && !excludePatterns.some(pattern => itemPath.includes(pattern.replace('**/', '')))) {
                  await countFiles(itemPath);
                } else if (stat.isFile()) {
                  const ext = path.extname(item);
                  fileCounts[ext] = (fileCounts[ext] || 0) + 1;
                }
              }
            } catch (error) {
              // Ignore errors for inaccessible directories
            }
          };

          await countFiles(targetPath);

          output += `\n📊 File Statistics:\n`;
          Object.entries(fileCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .forEach(([ext, count]) => {
              const extName = ext || 'no extension';
              output += `  ${extName}: ${count} files\n`;
            });

          output += `\n─'.repeat(50)}\n`;
          output += `✅ Analysis completed successfully`;

        } catch (error) {
          output += `\n❌ Error during analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }

        return {
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        };
      }

      case 'update_project_context': {
        const { mission, goals, techStack, architecture, standards, tools, metrics, notes, workingDirectory } = args as {
          mission?: string;
          goals?: string[];
          techStack?: Array<{ category: string; technology: string; version?: string; justification?: string }>;
          architecture?: { principles?: string[]; patterns?: any; guidelines?: string[] };
          standards?: { coding?: string[]; quality?: string[]; git?: string[] };
          tools?: { development?: string[]; monitoring?: string[]; ci_cd?: string[] };
          metrics?: { technical?: any; business?: any };
          notes?: string;
          workingDirectory?: string;
        };

        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        const projectContextPath = path.join(flowDir, 'PROJECT_CONTEXT.md');

        // Ensure .flow directory exists
        await fs.ensureDir(flowDir);

        let projectContext = '';
        const currentDate = new Date().toISOString().split('T')[0];

        // Read existing PROJECT_CONTEXT.md if it exists
        if (await fs.pathExists(projectContextPath)) {
          projectContext = await fs.readFile(projectContextPath, 'utf-8');
        }

        // Build new PROJECT_CONTEXT.md content
        let newContent = `# Contexto do Projeto

## 🎯 Missão & Objetivos

### Missão Principal
${mission || '*Descreva a missão central do projeto - o problema que resolve e o valor que entrega.*'}

### Objetivos de Longo Prazo`;

        if (goals && goals.length > 0) {
          goals.forEach(goal => {
            newContent += `\n- **Objetivo**: ${goal}`;
          });
        } else {
          newContent += `\n- **Objetivo 1**: Descrição específica e mensurável
- **Objetivo 2**: Descrição específica e mensurável
- **Objetivo 3**: Descrição específica e mensurável`;
        }

        newContent += `

## 🏗️ Arquitetura & Tecnologias

### Stack Tecnológico`;

        if (techStack && techStack.length > 0) {
          newContent += `\n| Categoria | Tecnologia | Versão | Justificativa |
|-----------|------------|--------|---------------|`;
          techStack.forEach(tech => {
            newContent += `\n| ${tech.category} | ${tech.technology} | ${tech.version || 'N/A'} | ${tech.justification || 'A definir'} |`;
          });
        } else {
          newContent += `\n| Categoria | Tecnologia | Versão | Justificativa |
|-----------|------------|--------|---------------|
| Frontend | React | 18.x | Componentização e performance |
| Backend | Node.js | 20.x | JavaScript full-stack |
| Database | PostgreSQL | 15.x | ACID compliance |
| Cache | Redis | 7.x | Performance de consultas |`;
        }

        newContent += `\n\n### Princípios Arquiteturais`;

        if (architecture?.principles && architecture.principles.length > 0) {
          architecture.principles.forEach(principle => {
            newContent += `\n- **${principle}**: Descrição do princípio`;
          });
        } else {
          newContent += `\n- **Modularidade**: Componentes independentes e reutilizáveis
- **Escalabilidade**: Arquitetura preparada para crescimento
- **Segurança**: Autenticação e autorização robustas
- **Performance**: Otimização contínua de recursos
- **Manutenibilidade**: Código limpo e bem documentado`;
        }

        newContent += `\n\n### Padrões de Design`;

        if (architecture?.patterns) {
          Object.entries(architecture.patterns).forEach(([key, value]) => {
            newContent += `\n- **${key}**: ${value}`;
          });
        } else {
          newContent += `\n- **Frontend**: Component-based architecture, hooks pattern
- **Backend**: RESTful APIs, service layer pattern
- **Database**: Repository pattern, migrations
- **Testing**: Unit tests, integration tests, E2E tests`;
        }

        newContent += `\n\n## 📋 Padrões de Desenvolvimento

### Convenções de Código`;

        if (standards?.coding && standards.coding.length > 0) {
          standards.coding.forEach(convention => {
            newContent += `\n- **${convention}**: Descrição da convenção`;
          });
        } else {
          newContent += `\n- **Nomenclatura**: camelCase para variáveis, PascalCase para componentes
- **Estrutura**: Feature-based folder organization
- **Imports**: Absolute imports com path mapping
- **Exports**: Named exports preferidos sobre default exports`;
        }

        newContent += `\n\n### Qualidade de Código`;

        if (standards?.quality && standards.quality.length > 0) {
          standards.quality.forEach(quality => {
            newContent += `\n- **${quality}**: Descrição do padrão de qualidade`;
          });
        } else {
          newContent += `\n- **Linting**: ESLint com regras customizadas
- **Formatting**: Prettier com configuração padronizada
- **Type Safety**: TypeScript strict mode habilitado
- **Testing**: Coverage mínimo de 80%`;
        }

        newContent += `\n\n### Git Workflow`;

        if (standards?.git && standards.git.length > 0) {
          standards.git.forEach(gitRule => {
            newContent += `\n- **${gitRule}**: Descrição da regra`;
          });
        } else {
          newContent += `\n- **Branches**: feature/, bugfix/, hotfix/ prefixes
- **Commits**: Conventional commits (feat:, fix:, docs:, etc.)
- **Reviews**: Pull requests obrigatórios com aprovação
- **CI/CD**: Pipeline automatizado com testes e deploy`;
        }

        newContent += `\n\n## 🔧 Ferramentas & Configurações

### Desenvolvimento`;

        if (tools?.development && tools.development.length > 0) {
          tools.development.forEach(tool => {
            newContent += `\n- **${tool}**: Descrição da ferramenta`;
          });
        } else {
          newContent += `\n- **IDE**: VS Code com extensões padronizadas
- **Package Manager**: npm/yarn com lock files
- **Environment**: Docker para desenvolvimento local
- **Debugging**: Source maps habilitados`;
        }

        newContent += `\n\n### Monitoramento`;

        if (tools?.monitoring && tools.monitoring.length > 0) {
          tools.monitoring.forEach(tool => {
            newContent += `\n- **${tool}**: Descrição da ferramenta`;
          });
        } else {
          newContent += `\n- **Logs**: Structured logging com níveis
- **Metrics**: Performance e business metrics
- **Alerts**: Notificações automáticas para erros críticos
- **Analytics**: User behavior tracking`;
        }

        newContent += `\n\n## 📚 Documentação & Comunicação

### Documentação Técnica
- **API Docs**: OpenAPI/Swagger specifications
- **Architecture**: Diagramas atualizados regularmente
- **Runbooks**: Procedimentos operacionais documentados
- **Changelog**: Histórico de mudanças mantido

### Comunicação
- **Daily Standups**: Síncronos para alinhamento
- **Retrospectives**: Melhoria contínua do processo
- **Knowledge Sharing**: Sessões técnicas regulares
- **Documentation**: README atualizado e completo

## 🎯 Métricas de Sucesso

### Técnicas`;

        if (metrics?.technical) {
          Object.entries(metrics.technical).forEach(([key, value]) => {
            newContent += `\n- **${key}**: ${value}`;
          });
        } else {
          newContent += `\n- **Performance**: Tempo de resposta < 200ms
- **Availability**: Uptime > 99.9%
- **Quality**: Bug rate < 1% em produção
- **Security**: Zero vulnerabilidades críticas`;
        }

        newContent += `\n\n### Negócio`;

        if (metrics?.business) {
          Object.entries(metrics.business).forEach(([key, value]) => {
            newContent += `\n- **${key}**: ${value}`;
          });
        } else {
          newContent += `\n- **User Satisfaction**: NPS > 8
- **Adoption**: Taxa de adoção de features > 70%
- **Retention**: Retenção de usuários > 85%
- **Growth**: Crescimento mensal > 10%`;
        }

        newContent += `\n\n## 🔄 Processo de Evolução

### Atualizações de Contexto
Este documento deve ser atualizado quando:
- Novas tecnologias são adotadas
- Princípios arquiteturais mudam
- Padrões de desenvolvimento evoluem
- Métricas de sucesso são redefinidas

### Aprovação de Mudanças
- **Minor Changes**: Aprovação do tech lead
- **Major Changes**: Aprovação do time + arquiteto
- **Architectural Changes**: Aprovação do CTO + stakeholders`;

        if (notes) {
          newContent += `\n\n## 📝 Notas Adicionais\n\n${notes}`;
        }

        newContent += `\n\n---

**Última Atualização**: ${currentDate}  
**Próxima Revisão**: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}  
**Responsável**: A definir`;

        // Write the updated PROJECT_CONTEXT.md
        await fs.writeFile(projectContextPath, newContent);

        return {
          content: [
            {
              type: 'text',
              text: `✅ PROJECT_CONTEXT.md atualizado com sucesso!\n\n📁 Localização: ${projectContextPath}\n📅 Data de atualização: ${currentDate}\n\nPrincipais atualizações:\n${mission ? `- Missão: ${mission}\n` : ''}${goals ? `- Objetivos: ${goals.length} objetivos atualizados\n` : ''}${techStack ? `- Stack tecnológico: ${techStack.length} tecnologias\n` : ''}${architecture ? `- Arquitetura: Princípios e padrões atualizados\n` : ''}${standards ? `- Padrões: Convenções de desenvolvimento atualizadas\n` : ''}${tools ? `- Ferramentas: Configurações atualizadas\n` : ''}${metrics ? `- Métricas: Indicadores de sucesso atualizados\n` : ''}${notes ? `- Notas: Informações adicionais incluídas\n` : ''}`,
            },
          ],
        };
      }

      case 'init_flow_project': {
        const { projectName, mission, goals, techStack, architecture, standards, tools, metrics, notes, workingDirectory } = args as {
          projectName?: string;
          mission?: string;
          goals?: string[];
          techStack?: Array<{ category: string; technology: string; version?: string; justification?: string }>;
          architecture?: { principles?: string[]; patterns?: any; guidelines?: string[] };
          standards?: { coding?: string[]; quality?: string[]; git?: string[] };
          tools?: { development?: string[]; monitoring?: string[]; ci_cd?: string[] };
          metrics?: { technical?: any; business?: any };
          notes?: string;
          workingDirectory?: string;
        };

        const currentDir = workingDirectory ? path.resolve(workingDirectory) : process.cwd();
        const flowDir = path.join(currentDir, '.flow');
        const projectContextPath = path.join(flowDir, 'PROJECT_CONTEXT.md');
        const currentDate = new Date().toISOString().split('T')[0];

        // Check if Flow project already exists
        if (await fs.pathExists(flowDir)) {
          return {
            content: [
              {
                type: 'text',
                text: `⚠️ Projeto Flow já existe!\n\n📁 Diretório: ${flowDir}\n\nUse 'update_project_context' para atualizar o contexto existente ou remova o diretório .flow para reinicializar.`,
              },
            ],
          };
        }

        // Create .flow directory
        await fs.ensureDir(flowDir);

        // Build PROJECT_CONTEXT.md content
        let projectContextContent = `# Contexto do Projeto

## 🎯 Missão & Objetivos

### Missão Principal
${mission || '*Descreva a missão central do projeto - o problema que resolve e o valor que entrega.*'}

### Objetivos de Longo Prazo`;

        if (goals && goals.length > 0) {
          goals.forEach(goal => {
            projectContextContent += `\n- **Objetivo**: ${goal}`;
          });
        } else {
          projectContextContent += `\n- **Objetivo 1**: Descrição específica e mensurável
- **Objetivo 2**: Descrição específica e mensurável
- **Objetivo 3**: Descrição específica e mensurável`;
        }

        projectContextContent += `

## 🏗️ Arquitetura & Tecnologias

### Stack Tecnológico`;

        if (techStack && techStack.length > 0) {
          projectContextContent += `\n| Categoria | Tecnologia | Versão | Justificativa |
|-----------|------------|--------|---------------|`;
          techStack.forEach(tech => {
            projectContextContent += `\n| ${tech.category} | ${tech.technology} | ${tech.version || 'N/A'} | ${tech.justification || 'A definir'} |`;
          });
        } else {
          projectContextContent += `\n| Categoria | Tecnologia | Versão | Justificativa |
|-----------|------------|--------|---------------|
| Frontend | React | 18.x | Componentização e performance |
| Backend | Node.js | 20.x | JavaScript full-stack |
| Database | PostgreSQL | 15.x | ACID compliance |
| Cache | Redis | 7.x | Performance de consultas |`;
        }

        projectContextContent += `\n\n### Princípios Arquiteturais`;

        if (architecture?.principles && architecture.principles.length > 0) {
          architecture.principles.forEach(principle => {
            projectContextContent += `\n- **${principle}**: Descrição do princípio`;
          });
        } else {
          projectContextContent += `\n- **Modularidade**: Componentes independentes e reutilizáveis
- **Escalabilidade**: Arquitetura preparada para crescimento
- **Segurança**: Autenticação e autorização robustas
- **Performance**: Otimização contínua de recursos
- **Manutenibilidade**: Código limpo e bem documentado`;
        }

        projectContextContent += `\n\n### Padrões de Design`;

        if (architecture?.patterns) {
          Object.entries(architecture.patterns).forEach(([key, value]) => {
            projectContextContent += `\n- **${key}**: ${value}`;
          });
        } else {
          projectContextContent += `\n- **Frontend**: Component-based architecture, hooks pattern
- **Backend**: RESTful APIs, service layer pattern
- **Database**: Repository pattern, migrations
- **Testing**: Unit tests, integration tests, E2E tests`;
        }

        projectContextContent += `\n\n## 📋 Padrões de Desenvolvimento

### Convenções de Código`;

        if (standards?.coding && standards.coding.length > 0) {
          standards.coding.forEach(convention => {
            projectContextContent += `\n- **${convention}**: Descrição da convenção`;
          });
        } else {
          projectContextContent += `\n- **Nomenclatura**: camelCase para variáveis, PascalCase para componentes
- **Estrutura**: Feature-based folder organization
- **Imports**: Absolute imports com path mapping
- **Exports**: Named exports preferidos sobre default exports`;
        }

        projectContextContent += `\n\n### Qualidade de Código`;

        if (standards?.quality && standards.quality.length > 0) {
          standards.quality.forEach(quality => {
            projectContextContent += `\n- **${quality}**: Descrição do padrão de qualidade`;
          });
        } else {
          projectContextContent += `\n- **Linting**: ESLint com regras customizadas
- **Formatting**: Prettier com configuração padronizada
- **Type Safety**: TypeScript strict mode habilitado
- **Testing**: Coverage mínimo de 80%`;
        }

        projectContextContent += `\n\n### Git Workflow`;

        if (standards?.git && standards.git.length > 0) {
          standards.git.forEach(gitRule => {
            projectContextContent += `\n- **${gitRule}**: Descrição da regra`;
          });
        } else {
          projectContextContent += `\n- **Branches**: feature/, bugfix/, hotfix/ prefixes
- **Commits**: Conventional commits (feat:, fix:, docs:, etc.)
- **Reviews**: Pull requests obrigatórios com aprovação
- **CI/CD**: Pipeline automatizado com testes e deploy`;
        }

        projectContextContent += `\n\n## 🔧 Ferramentas & Configurações

### Desenvolvimento`;

        if (tools?.development && tools.development.length > 0) {
          tools.development.forEach(tool => {
            projectContextContent += `\n- **${tool}**: Descrição da ferramenta`;
          });
        } else {
          projectContextContent += `\n- **IDE**: VS Code com extensões padronizadas
- **Package Manager**: npm/yarn com lock files
- **Environment**: Docker para desenvolvimento local
- **Debugging**: Source maps habilitados`;
        }

        projectContextContent += `\n\n### Monitoramento`;

        if (tools?.monitoring && tools.monitoring.length > 0) {
          tools.monitoring.forEach(tool => {
            projectContextContent += `\n- **${tool}**: Descrição da ferramenta`;
          });
        } else {
          projectContextContent += `\n- **Logs**: Structured logging com níveis
- **Metrics**: Performance e business metrics
- **Alerts**: Notificações automáticas para erros críticos
- **Analytics**: User behavior tracking`;
        }

        projectContextContent += `\n\n## 📚 Documentação & Comunicação

### Documentação Técnica
- **API Docs**: OpenAPI/Swagger specifications
- **Architecture**: Diagramas atualizados regularmente
- **Runbooks**: Procedimentos operacionais documentados
- **Changelog**: Histórico de mudanças mantido

### Comunicação
- **Daily Standups**: Síncronos para alinhamento
- **Retrospectives**: Melhoria contínua do processo
- **Knowledge Sharing**: Sessões técnicas regulares
- **Documentation**: README atualizado e completo

## 🎯 Métricas de Sucesso

### Técnicas`;

        if (metrics?.technical) {
          Object.entries(metrics.technical).forEach(([key, value]) => {
            projectContextContent += `\n- **${key}**: ${value}`;
          });
        } else {
          projectContextContent += `\n- **Performance**: Tempo de resposta < 200ms
- **Availability**: Uptime > 99.9%
- **Quality**: Bug rate < 1% em produção
- **Security**: Zero vulnerabilidades críticas`;
        }

        projectContextContent += `\n\n### Negócio`;

        if (metrics?.business) {
          Object.entries(metrics.business).forEach(([key, value]) => {
            projectContextContent += `\n- **${key}**: ${value}`;
          });
        } else {
          projectContextContent += `\n- **User Satisfaction**: NPS > 8
- **Adoption**: Taxa de adoção de features > 70%
- **Retention**: Retenção de usuários > 85%
- **Growth**: Crescimento mensal > 10%`;
        }

        projectContextContent += `\n\n## 🔄 Processo de Evolução

### Atualizações de Contexto
Este documento deve ser atualizado quando:
- Novas tecnologias são adotadas
- Princípios arquiteturais mudam
- Padrões de desenvolvimento evoluem
- Métricas de sucesso são redefinidas

### Aprovação de Mudanças
- **Minor Changes**: Aprovação do tech lead
- **Major Changes**: Aprovação do time + arquiteto
- **Architectural Changes**: Aprovação do CTO + stakeholders`;

        if (notes) {
          projectContextContent += `\n\n## 📝 Notas Adicionais\n\n${notes}`;
        }

        projectContextContent += `\n\n---

**Última Atualização**: ${currentDate}  
**Próxima Revisão**: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}  
**Responsável**: A definir`;

        // Write PROJECT_CONTEXT.md
        await fs.writeFile(projectContextPath, projectContextContent);

        // Create .gitignore for .flow directory
        const gitignorePath = path.join(flowDir, '.gitignore');
        const gitignoreContent = `# Flow project files
# Keep PROJECT_CONTEXT.md in version control
!PROJECT_CONTEXT.md

# Ignore task-specific files (they should be in individual task folders)
*.md
!PROJECT_CONTEXT.md
`;
        await fs.writeFile(gitignorePath, gitignoreContent);

        return {
          content: [
            {
              type: 'text',
              text: `🎉 Projeto Flow inicializado com sucesso!\n\n📁 Diretório criado: ${flowDir}\n📄 PROJECT_CONTEXT.md: ${projectContextPath}\n📅 Data de criação: ${currentDate}\n\n${projectName ? `📋 Nome do projeto: ${projectName}\n` : ''}${mission ? `🎯 Missão: ${mission}\n` : ''}${goals ? `📈 Objetivos: ${goals.length} objetivos definidos\n` : ''}${techStack ? `🛠️ Stack tecnológico: ${techStack.length} tecnologias\n` : ''}${architecture ? `🏗️ Arquitetura: Princípios e padrões definidos\n` : ''}${standards ? `📋 Padrões: Convenções de desenvolvimento definidas\n` : ''}${tools ? `🔧 Ferramentas: Configurações definidas\n` : ''}${metrics ? `📊 Métricas: Indicadores de sucesso definidos\n` : ''}${notes ? `📝 Notas: Informações adicionais incluídas\n` : ''}\n\n✅ Próximos passos:\n1. Use 'create_task' para criar sua primeira task\n2. Use 'list_tasks' para ver todas as tasks\n3. Use 'update_project_context' para atualizar o contexto conforme necessário`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error executing tool: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Flow MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
