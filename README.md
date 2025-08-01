# @godrix/flow

> **The ABC Workflow: Software Engineering in Three Phases**

In software development, clarity is the bridge between a great idea and a great product. ```@godrix/flow``` implements the ABC Workflow, a lean methodology that structures every task into three distinct phases: Requirements (Business Context), Design (Approach), and Implementation (Completion Report). This process ensures alignment, traceability, and a relentless focus on delivering value.

This workflow creates an ecosystem where humans and AI can collaborate with precision and purpose.

## Our Principles

### A is for Approach: The Immutable Technical Blueprint

Once the requirements are clear, a solid technical plan is crafted. The ```APPROACH.md``` serves as the engineering blueprint. It details the architecture, design, and a defined implementation plan. This document is our reference; it does not change during execution, ensuring the plan remains the single source of truth.

### B is for Business Context: Defining the "Why" with Precision

Every task begins with a deep understanding of its purpose. The ```BUSINESS_CONTEXT.md``` file is our source of truth for requirements, using Gherkin syntax (Given/When/Then) to create behavioral specifications that are clear, testable, and understood by everyone.

### C is for Completion Report: The Evidence of Work Done

Progress must be documented. The ```COMPLETION_REPORT.md``` is the formal, chronological record of the work performed. It connects the actions taken back to the planned tasks, documents deviations, and serves as the final proof that the objectives in the ```BUSINESS_CONTEXT.md``` have been met.

The ABC Workflow is not just about creating files; it's about creating clarity, promoting discipline, and empowering teams to build better software, faster.

---

## Installation

```bash
npm install -g @godrix/flow
```

## Usage

```bash
npx @godrix/flow <task-name>
```

### Examples

```bash
# Create a task with name task-1234
npx @godrix/flow task-1234

# Create a feature task
npx @godrix/flow FEATURE_AUTH

# Create a bug fix task
npx @godrix/flow BUG_LOGIN_ISSUE
```

## What Gets Created

The command creates an organized structure in the current directory:

### Global Files (in .flow root)
- `AI_INSTRUCTIONS.md` - AI instructions (created on first run)
- `PROJECT_CONTEXT.md` - Project context (created on first run)

### Task Folder (.flow/XX_task-name)
- `APPROACH.md` - The immutable technical blueprint.
- `BUSINESS_CONTEXT.md` - The business requirements and acceptance criteria.
- `COMPLETION_REPORT.md` - The formal report of work done.

## Folder Structure

```
your-project/
├── .flow/
│   ├── AI_INSTRUCTIONS.md          # Global file
│   ├── PROJECT_CONTEXT.md          # Global file
│   ├── 00_task-1234/
│   │   ├── APPROACH.md
│   │   ├── BUSINESS_CONTEXT.md
│   │   └── COMPLETION_REPORT.md
│   ├── 01_FEATURE_AUTH/
│   │   └── ...
│   └── 02_BUG_LOGIN_ISSUE/
│       └── ...
└── ...
```

## Development

```bash
# Install dependencies
npm install

# Build project
npm run build

# Test locally
npm run dev task-1234
```