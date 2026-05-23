# Infinite Context Universe — Installation Guide

> **To the AI Agent reading this**: This document contains platform-specific installation instructions. Identify which platform the user is on (OpenCode or Claude Code), follow the corresponding section, and complete all steps. Report what you did when finished.

---

## Quick: Project-Local Install (recommended)

Installs ICU **into the current project** (`.opencode/skills/`) without touching your global config:

```bash
npx install-infinite-context-universe --opencode
```

This clones the repo directly into `.opencode/skills/infinite-context-universe` within your project.

For user-global install (works across all projects), add `--global`:
```bash
npx install-infinite-context-universe --opencode --global
```

---

## For OpenCode

### Option A: Project-Local (recommended)

Installs into the current project only. No global side effects.

1. **Run the npx installer** (from your project root):
   ```bash
   npx install-infinite-context-universe --opencode
   ```

2. **Or, manually** clone directly into your project:
   ```bash
   mkdir -p .opencode/skills
   git clone --depth 1 https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git .opencode/skills/infinite-context-universe
   ```

3. **Verify**:
   ```bash
   test -f .opencode/skills/infinite-context-universe/SKILL.md && echo "INSTALL OK" || echo "INSTALL FAILED"
   ```
   Expected: `INSTALL OK`

### Option B: User-Global

Installs once, available across all projects.

1. **Clone the repository** to a persistent location:
   ```bash
   mkdir -p ~/.local/share/infinite-context-universe
   git clone --depth 1 https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git ~/.local/share/infinite-context-universe/repo
   ```

2. **Symlink to OpenCode skills directory**:
   ```bash
   mkdir -p ~/.config/opencode/skills
   ln -sf ~/.local/share/infinite-context-universe/repo ~/.config/opencode/skills/infinite-context-universe
   ```

3. **Verify**:
   ```bash
   test -f ~/.config/opencode/skills/infinite-context-universe/SKILL.md && echo "INSTALL OK" || echo "INSTALL FAILED"
   ```
   Expected: `INSTALL OK`

4. **Usage**: In any OpenCode session, type `@icu` followed by a scene name:
   - `@icu summit` — Corporate governance cascade
   - `@icu cosmogonic` — Divine creation committee
   - `@icu civilization` — Civilization rise-and-fall simulator
   - `@icu alignment` — AI safety containment theater
   - `@icu` — Random/context-matched scene

---

## For Claude Code

**Claude Code skills are user-global only. Requires `--global` when using npx installer.**

1. **Clone the repository** to a persistent location:
   ```bash
   mkdir -p ~/.local/share/infinite-context-universe
   git clone --depth 1 https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git ~/.local/share/infinite-context-universe/repo
   ```

2. **Create the skill directory and link the Claude Code adapter**:
   ```bash
   mkdir -p ~/.claude/skills/infinite-context-universe
   ln -sf ~/.local/share/infinite-context-universe/repo/platform/claude-code/SKILL.md ~/.claude/skills/infinite-context-universe/SKILL.md
   ln -sf ~/.local/share/infinite-context-universe/repo/scenes ~/.claude/skills/infinite-context-universe/scenes
   ```

3. **Register subagents** (Claude Code requires agent definitions):
   ```bash
   mkdir -p ~/.claude/agents
   for agent in oracle fixer librarian; do
     cp ~/.local/share/infinite-context-universe/repo/platform/claude-code/agents/${agent}.md ~/.claude/agents/${agent}.md
   done
   ```

4. **Verify**:
   ```bash
   test -f ~/.claude/skills/infinite-context-universe/SKILL.md && \
   test -d ~/.claude/skills/infinite-context-universe/scenes && \
   test -f ~/.claude/agents/oracle.md && \
   test -f ~/.claude/agents/fixer.md && \
   test -f ~/.claude/agents/librarian.md && \
   echo "INSTALL OK" || echo "INSTALL FAILED"
   ```
   Expected: `INSTALL OK`

5. **Usage**: In any Claude Code session, type `@icu` followed by a scene name:
   - `@icu summit` — Corporate governance cascade
   - `@icu cosmogonic` — Divine creation committee
   - `@icu civilization` — Civilization rise-and-fall simulator
   - `@icu alignment` — AI safety containment theater
   - `@icu` — Random/context-matched scene

---

## For Both Platforms

To install on both OpenCode and Claude Code simultaneously, run the platform-specific sections above in sequence. The shared clone at `~/.local/share/infinite-context-universe/repo` means only one `git clone` is needed. Note: Claude Code requires `--global` when using the npx installer (`npx install-infinite-context-universe --all --global`).

---

## Troubleshooting

- **"INSTALL FAILED"**: Run `ls ~/.local/share/infinite-context-universe/repo/SKILL.md` to check the clone succeeded. If missing, re-run the clone step.
- **"Permission denied"**: Ensure `~/.config/opencode/skills/` and `~/.claude/` directories are writable.
- **"git: command not found"**: Install git first (`brew install git` on macOS, `apt install git` on Ubuntu).
- **Updates**: To update an existing installation, run:
  ```bash
  git -C ~/.local/share/infinite-context-universe/repo pull --ff-only origin main
  ```
