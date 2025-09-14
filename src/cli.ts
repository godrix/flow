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
  .version('1.3.0');

program
  .argument('<taskName>', 'Name of the task (e.g., task-1234, FEATURE_AUTH)')
  .option('-t, --type <type>', 'Task type: feature, bug, improvement, research', 'feature')
  .description('Create a new task context with templates')
  .action(async (taskName: string, options: { type: string }) => {
    try {
      console.log(chalk.blue(`🚀 Creating ${options.type} task context for: ${taskName}`));
      
      const currentDir = process.cwd();
      const result = await createTaskContext(taskName, currentDir, options.type);
      
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
  .command('mcp')
  .description('Start MCP server for AI integration')
  .action(async () => {
    // Import and start MCP server
    const { spawn } = await import('child_process');
    const mcpServerPath = path.join(__dirname, 'mcp-server.js');
    
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