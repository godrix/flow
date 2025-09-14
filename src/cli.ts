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
  .version('1.2.0');

program
  .argument('<taskName>', 'Name of the task (e.g., task-1234, FEATURE_AUTH)')
  .description('Create a new task context with templates')
  .action(async (taskName: string) => {
    try {
      console.log(chalk.blue(`🚀 Creating task context for: ${taskName}`));
      
      const currentDir = process.cwd();
      const result = await createTaskContext(taskName, currentDir);
      
      if (result.success) {
        console.log(chalk.green(`✅ Task context created successfully!`));
        console.log(chalk.gray(`📁 Location: ${result.taskPath}`));
        console.log(chalk.gray(`📄 Files created: ${result.filesCreated?.join(', ') || 'none'}`));
      } else {
        console.error(chalk.red(`❌ Error creating task context: ${result.error}`));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Unexpected error: ${error}`));
      process.exit(1);
    }
  });

program.parse(); 