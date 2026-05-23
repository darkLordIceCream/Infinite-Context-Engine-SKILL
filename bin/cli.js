#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_URL = 'https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git';
const COLOR_GREEN = '\x1b[32m';
const COLOR_BLUE = '\x1b[34m';
const COLOR_CYAN = '\x1b[36m';
const COLOR_RED = '\x1b[31m';
const RESET = '\x1b[0m';

function log(msg)  { console.log(`${COLOR_GREEN}[ICU]${RESET} ${msg}`); }
function warn(msg) { console.log(`${COLOR_BLUE}[ICU]${RESET} ${msg}`); }
function err(msg)  { console.error(`${COLOR_RED}[ICU] ERROR:${RESET} ${msg}`); process.exit(1); }

function banner() {
  console.log('');
  console.log(`${COLOR_CYAN}╔══════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${COLOR_CYAN}║        INFINITE CONTEXT UNIVERSE — npx Installer             ║${RESET}`);
  console.log(`${COLOR_CYAN}║    Recursive Theatrical Cognition Framework                  ║${RESET}`);
  console.log(`${COLOR_CYAN}╚══════════════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
}

function usage() {
  console.log('Usage: npx install-infinite-context-universe [--opencode | --claude-code | --all]');
  console.log('');
  console.log('  --opencode      Install for OpenCode');
  console.log('  --claude-code   Install for Claude Code');
  console.log('  --all           Install for both platforms');
  process.exit(0);
}

function cloneRepo() {
  const persistDir = path.join(os.homedir(), '.local', 'share', 'infinite-context-universe');
  const repoPath = path.join(persistDir, 'repo');

  if (fs.existsSync(path.join(repoPath, '.git'))) {
    log(`Repository exists at ${repoPath}, pulling latest...`);
    try {
      execSync(`git -C "${repoPath}" pull --ff-only origin main`, { stdio: 'pipe' });
    } catch {
      warn('Pull failed, continuing with existing clone.');
    }
    return repoPath;
  }

  log(`Cloning repository to ${repoPath}...`);
  fs.mkdirSync(persistDir, { recursive: true });
  try {
    execSync(`git clone --depth 1 ${REPO_URL} "${repoPath}"`, { stdio: 'pipe' });
  } catch {
    err('Failed to clone repository. Ensure git is installed and you have internet access.');
  }
  return repoPath;
}

function installOpenCode(repoDir) {
  const dest = path.join(os.homedir(), '.config', 'opencode', 'skills', 'infinite-context-universe');
  log('Installing for OpenCode...');

  if (fs.existsSync(dest)) {
    warn('Existing installation found, removing...');
    fs.rmSync(dest, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.symlinkSync(repoDir, dest, 'dir');
  log(`Symlinked: ${dest}`);

  if (fs.existsSync(path.join(dest, 'SKILL.md'))) {
    log('OpenCode installation verified. Use @icu to invoke.');
  } else {
    err('Installation verification failed: SKILL.md not found.');
  }
}

function installClaudeCode(repoDir) {
  const skillDest = path.join(os.homedir(), '.claude', 'skills', 'infinite-context-universe');
  const agentDest = path.join(os.homedir(), '.claude', 'agents');

  log('Installing for Claude Code...');

  // Skill
  if (fs.existsSync(skillDest)) {
    warn('Existing skill found, removing...');
    fs.rmSync(skillDest, { recursive: true, force: true });
  }
  fs.mkdirSync(path.dirname(skillDest), { recursive: true });
  fs.symlinkSync(repoDir, skillDest, 'dir');

  // Agents
  log('Registering ICU agents...');
  fs.mkdirSync(agentDest, { recursive: true });

  for (const agent of ['oracle', 'fixer', 'librarian']) {
    const src = path.join(repoDir, 'platform', 'claude-code', 'agents', `${agent}.md`);
    const dst = path.join(agentDest, `${agent}.md`);
    fs.copyFileSync(src, dst);
    log(`  Agent registered: ${dst}`);
  }

  // Verify
  const skillOk = fs.existsSync(path.join(skillDest, 'platform', 'claude-code', 'SKILL.md'));
  const agentsOk = ['oracle', 'fixer', 'librarian'].every(a =>
    fs.existsSync(path.join(agentDest, `${a}.md`))
  );

  if (skillOk && agentsOk) {
    log('Claude Code installation verified. Use @icu to invoke.');
  } else {
    err('Installation verification failed.');
  }
}

// --- Main ---
banner();

const platform = process.argv[2];
if (!platform) usage();

const repoDir = cloneRepo();

switch (platform) {
  case '--opencode':
    installOpenCode(repoDir);
    break;
  case '--claude-code':
    installClaudeCode(repoDir);
    break;
  case '--all':
    installOpenCode(repoDir);
    console.log('');
    installClaudeCode(repoDir);
    break;
  default:
    err(`Unknown option: ${platform}. Use --opencode, --claude-code, or --all.`);
}

console.log('');
log('Installation complete.');
log('Invoke with: @icu');
