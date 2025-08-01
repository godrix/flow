import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TaskCreationResult {
  success: boolean;
  taskPath?: string;
  filesCreated?: string[];
  error?: string;
}

export async function createTaskContext(taskName: string, projectPath: string): Promise<TaskCreationResult> {
  try {
    // Criar pasta .flow se não existir
    const flowDir = path.join(projectPath, '.flow');
    await fs.ensureDir(flowDir);
    
    // Verificar se AI_INSTRUCTIONS.md e PROJECT_CONTEXT.md existem na raiz do .flow
    // Se não existirem, criar na primeira execução
    const rootTemplates = ['AI_INSTRUCTIONS.md', 'PROJECT_CONTEXT.md'];
    for (const template of rootTemplates) {
      const rootTemplatePath = path.join(flowDir, template);
      if (!(await fs.pathExists(rootTemplatePath))) {
        const sourceTemplatePath = path.join(__dirname, '..', 'templates', template);
        if (await fs.pathExists(sourceTemplatePath)) {
          await fs.copy(sourceTemplatePath, rootTemplatePath);
        }
      }
    }
    
    // Obter próximo número incremental
    const nextNumber = await getNextTaskNumber(flowDir);
    const taskDirName = `${nextNumber.toString().padStart(2, '0')}_${taskName}`;
    
    // Criar pasta da tarefa com prefixo incremental
    const taskDir = path.join(flowDir, taskDirName);
    await fs.ensureDir(taskDir);
    
    // Lista de templates para criar na pasta da tarefa (excluindo os que ficam na raiz)
    const taskTemplates = [
      'APPROACH.md',
      'BUSINESS_CONTEXT.md',
      'COMPLETION_REPOORT.md'
    ];
    
    const filesCreated: string[] = [];
    
    // Copiar templates para a pasta da tarefa com substituição de variáveis
    for (const template of taskTemplates) {
      const templatePath = path.join(__dirname, '..', 'templates', template);
      const targetPath = path.join(taskDir, template);
      
      if (await fs.pathExists(templatePath)) {
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const processedContent = replaceTemplateVariables(templateContent, taskName);
        await fs.writeFile(targetPath, processedContent);
        filesCreated.push(template);
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

function replaceTemplateVariables(content: string, taskName: string): string {
  return content.replace(/\{\{TASK_NAME\}\}/g, taskName);
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