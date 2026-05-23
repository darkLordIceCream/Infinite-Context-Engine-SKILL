# Infinite Context Universe — Installation Guide

> **To the AI Agent reading this**: This document contains platform-specific installation instructions. Identify which platform the user is on (OpenCode or Claude Code), follow the corresponding section, and complete all steps. Report what you did when finished.

---

## For OpenCode

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

1. **Clone the repository** to a persistent location:
   ```bash
   mkdir -p ~/.local/share/infinite-context-universe
   git clone --depth 1 https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git ~/.local/share/infinite-context-universe/repo
   ```

2. **Symlink to Claude Code skills directory**:
   ```bash
   mkdir -p ~/.claude/skills
   ln -sf ~/.local/share/infinite-context-universe/repo ~/.claude/skills/infinite-context-universe
   ```

3. **Register subagents** (Claude Code requires agent definitions):
   ```bash
   mkdir -p ~/.claude/agents
   for agent in oracle fixer librarian; do
     cp "~/.local/share/infinite-context-universe/repo/platform/claude-code/agents/${agent}.md" "~/.claude/agents/${agent}.md"
   done
   ```

4. **Verify**:
   ```bash
   test -f ~/.claude/skills/infinite-context-universe/platform/claude-code/SKILL.md && \
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

To install on both OpenCode and Claude Code simultaneously, run the platform-specific sections above in sequence. The shared clone at `~/.local/share/infinite-context-universe/repo` means only one `git clone` is needed.

---

## Troubleshooting

- **"INSTALL FAILED"**: Run `ls ~/.local/share/infinite-context-universe/repo/SKILL.md` to check the clone succeeded. If missing, re-run the clone step.
- **"Permission denied"**: Ensure `~/.config/opencode/skills/` and `~/.claude/` directories are writable.
- **"git: command not found"**: Install git first (`brew install git` on macOS, `apt install git` on Ubuntu).
- **Updates**: To update an existing installation, run:
  ```bash
  git -C ~/.local/share/infinite-context-universe/repo pull --ff-only origin main
  ```
