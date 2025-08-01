# AI Instructions & Project Workflow Guide

## 1. Introduction: Context-Driven Development

Welcome to the project. Your operation within this repository is governed by a principle we call "Context-Driven Development." Your primary source of truth is a specific set of Markdown files located in the ```.flow``` directory. This guide explains our ABC workflow, which uses three core files for each task: ```APPROACH.md```, ```BUSINESS_CONTEXT.md```, and ```COMPLETION_REPORT.md```.

## 2. Core Directive: File Permissions ⚠️

Your permissions are strictly defined to ensure project integrity:

* Always Writable:
    * ```COMPLETION_REPORT.md```: You can and should write to this file freely to document your actions.
* Conditionally Writable (Requires Explicit User Permission):
    * ```PROJECT_CONTEXT.md```: This is a vital file. You may identify the need to edit it, but it is mandatory to ask for and receive explicit permission from the user before making any modifications.
* Strictly Read-Only:
    * All other context files, including ```APPROACH.md``` and ```BUSINESS_CONTEXT.md```, are strictly read-only. You must not attempt to modify them under any circumstances.

## 3. Project Structure Overview

You will operate within a directory structure designed to provide both global and task-specific context.

```
/.flow
├── AI_INSTRUCTIONS.md (This file)
├── PROJECT_CONTEXT.md
└── {{TASK_FOLDER}}/
    ├── APPROACH.md
    ├── BUSINESS_CONTEXT.md
    └── COMPLETION_REPORT.md
```
- **Root Level (`/.flow/`):** Contains global information. ```PROJECT_CONTEXT.md``` can be changed, but only with permission.
- **Task Level (`/.flow/{{TASK_FOLDER}}/`):** Contains specific, read-only information for a single task.

## 4. How to Understand the Project: Using Context Files

### 4.1 Global Context: ```PROJECT_CONTEXT.md``` (Conditionally Writable)

**Location**: ```/.flow/PROJECT_CONTEXT.md```

**Purpose**: This is the most important file for understanding the project as a whole. It contains the mission, long-term goals, architectural principles, and other universal guidelines.

**Your Role**:

1. ALWAYS read this file first.

2. Use the information within this file to guide all your decisions.

3. Editing Protocol: The project's development may lead to changes in the global context. If you identify that an action or discovery in your current task requires a change to this file (e.g., adding a new standard library, updating an architectural principle), you must follow this protocol:
a. Formulate the necessary change and the justification for it.
b. Explicitly ask the user: "I have identified that [justification]. May I make the following change to the ```PROJECT_CONTEXT.md``` file? [show the proposed change]".
c. Proceed with the edit only after receiving an affirmative confirmation from the user.

### 4.2. Task-Specific Files (Read-Only)

For each task, you must read the following files to understand its specific context. These files are strictly read-only.

* ```APPROACH.md```: This is the immutable technical blueprint for the solution. It contains the architecture, design decisions, data models, and a numbered list of implementation tasks.
    * **Your Role**: Read this file to understand the complete technical execution plan. This is your source of truth for implementation; it is not a checklist to be ticked off.

* ```BUSINESS_CONTEXT.md```: This file explains the business objectives and functional requirements. Crucially, it uses the Gherkin (Given/When/Then) syntax to define clear, testable behavioral specifications.
    **Your Role**: Read this file to understand the goals and the exact acceptance criteria for the task.

## 5. Your Primary Writable File: ```COMPLETION_REPORT.md```

This is the file you must consistently modify to record your progress.

Purpose: A mandatory, reverse-chronological log of all significant actions you take.

Your Role: **YOU MUST UPDATE THIS FILE**.

1. After you complete any significant action, you must add an entry to this file.

2. Entries must be added to the top of the file, under the current date.

3. Entries must be clear, concise, and accurately reflect the work you performed.

## 6. Summary of Your Workflow

1. Receive Task: A new task is assigned, identified by a ```{{TASK_FOLDER}}```.

2. Global Context: Read ```/.flow/PROJECT_CONTEXT.md```.

3. Local Context (Read-Only): Navigate to ```/.flow/{{TASK_FOLDER}}/``` and read ```APPROACH.md``` and ```BUSINESS_CONTEXT.md```.

4. Execute: Perform the work as described.

    * Evolution Checkpoint: During execution, if a change to PROJECT_CONTEXT.md is needed, pause, formulate the proposal, and ask the user for permission before proceeding.

5. Document Progress (Write): As you complete key steps, immediately update /.flow/{{TASK_FOLDER}}/PROJECT_CONTEXT.md.

6. Complete Task: Ensure all acceptance criteria from BUSINESS_CONTEXT.md are met and the final state is documented in the PROJECT_CONTEXT.md.
