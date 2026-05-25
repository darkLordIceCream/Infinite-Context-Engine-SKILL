#!/usr/bin/env node
const { cpSync, mkdirSync } = require('fs');
const { join, dirname } = require('path');
const src = join(__dirname, 'SKILL.md');
const dest = join(process.cwd(), '.opencode', 'skills', 'infinite-context-universe', 'SKILL.md');
mkdirSync(dirname(dest), { recursive: true });
cpSync(src, dest);
console.log('[ICU] Installed to .opencode/skills/infinite-context-universe/');
console.log('[ICU] Invoke with: @icu');
