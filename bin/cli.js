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
const COLOR_YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(msg)  { console.log(`${COLOR_GREEN}[ICU]${RESET} ${msg}`); }
function warn(msg) { console.log(`${COLOR_YELLOW}[ICU]${RESET} ${msg}`); }
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
  console.log('Usage: npx install-infinite-context-universe [--opencode | --claude-code | --all] [--global]');
  console.log('');
  console.log('  --opencode      Install for OpenCode');
  console.log('  --claude-code   Install for Claude Code (requires --global)');
  console.log('  --all           Install for both platforms');
  console.log('');
  console.log('  --global        Install to user-global directory (default: project-local)');
  console.log('');
  console.log('Project-local (default):');
  console.log('  Clones directly to: ./.opencode/skills/infinite-context-universe/');
  console.log('');
  console.log('User-global (--global):');
  console.log('  Repo cache:    ~/.local/share/infinite-context-universe/repo');
  console.log('  Skill symlink: ~/.config/opencode/skills/infinite-context-universe → cache');
  process.exit(0);
}

/** Detect if we're running from inside the ICU repo itself */
function isInsideRepo() {
  const cwd = process.cwd();
  return fs.existsSync(path.join(cwd, 'SKILL.md'))
      && fs.existsSync(path.join(cwd, 'bin', 'cli.js'))
      && fs.existsSync(path.join(cwd, 'package.json'));
}

/** Clone or pull the repo into the given cache path */
function cloneRepo(cachePath) {
  if (fs.existsSync(path.join(cachePath, '.git'))) {
    log(`Repository exists at ${cachePath}, pulling latest...`);
    try {
      execSync(`git -C "${cachePath}" pull --ff-only origin main`, { stdio: 'pipe' });
    } catch {
      warn('Pull failed, continuing with existing clone.');
    }
    return cachePath;
  }

  log(`Cloning repository to ${cachePath}...`);
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  try {
    execSync(`git clone --depth 1 ${REPO_URL} "${cachePath}"`, { stdio: 'pipe' });
  } catch {
    err('Failed to clone repository. Ensure git is installed and you have internet access.');
  }
  return cachePath;
}

/** Install the OpenCode skill.
 *  In global mode: clone to cache, symlink to ~/.config/opencode/skills/
 *  In local mode: clone directly into ./.opencode/skills/ (or symlink if inside ICU repo) */
function installOpenCode(globalMode) {
  const dest = globalMode
    ? path.join(os.homedir(), '.config', 'opencode', 'skills', 'infinite-context-universe')
    : path.join(process.cwd(), '.opencode', 'skills', 'infinite-context-universe');

  const modeLabel = globalMode ? 'global' : 'project-local';
  const destLabel = globalMode ? dest : '.opencode/skills/infinite-context-universe/';
  log(`Installing for OpenCode (${modeLabel}) → ${destLabel}`);

  if (fs.existsSync(dest)) {
    warn('Existing installation found, removing...');
    fs.rmSync(dest, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (globalMode) {
    // Global: clone to persistent cache, then symlink to OpenCode skills dir
    const cachePath = path.join(os.homedir(), '.local', 'share', 'infinite-context-universe', 'repo');
    const repoDir = cloneRepo(cachePath);
    fs.symlinkSync(repoDir, dest, 'dir');
    log(`Symlinked: ${destLabel}`);
  } else if (isInsideRepo()) {
    // Running from inside ICU repo: symlink current directory directly
    log('Detected running inside ICU repo — symlinking current directory directly.');
    fs.symlinkSync(process.cwd(), dest, 'dir');
    log(`Symlinked: ${destLabel}`);
  } else {
    // Project-local from another project: clone directly into destination
    cloneRepo(dest);
  }

  if (fs.existsSync(path.join(dest, 'SKILL.md'))) {
    log('OpenCode installation verified. Use @icu to invoke.');
  } else {
    err('Installation verification failed: SKILL.md not found.');
  }
}

/** Install the Claude Code skill and register agents */
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

const args = process.argv.slice(2);
const platform = args.find(a => ['--opencode', '--claude-code', '--all'].includes(a));
const globalMode = args.includes('--global');

if (!platform) usage();

// Claude Code requires global mode
if (!globalMode && (platform === '--claude-code' || platform === '--all')) {
  err('Claude Code skills are user-global only (--global required). Use --opencode for project-local, or add --global.');
}

// For Claude Code / --all, the persistent clone lives at this path
const globalCachePath = path.join(os.homedir(), '.local', 'share', 'infinite-context-universe', 'repo');

switch (platform) {
  case '--opencode':
    installOpenCode(globalMode);
    break;
  case '--claude-code':
    // Clone to global cache first, then install
    cloneRepo(globalCachePath);
    installClaudeCode(globalCachePath);
    break;
  case '--all':
    // Clone to global cache once, install both
    cloneRepo(globalCachePath);
    installOpenCode(globalMode);
    console.log('');
    installClaudeCode(globalCachePath);
    break;
}

console.log('');
log('Installation complete.');
log('Invoke with: @icu');
