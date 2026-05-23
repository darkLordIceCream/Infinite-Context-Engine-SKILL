#!/usr/bin/env bash
set -euo pipefail

# Infinite Context Universe — One-Line Installer (global install)
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --opencode
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --claude-code
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --all
#
# For project-local install (into ./.opencode/skills/), use npx instead:
#   npx install-infinite-context-universe --opencode

REPO_URL="https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git"
REPO_DIR="Infinite-Context-Universe-SKILL"
PERSIST_DIR="$HOME/.local/share/infinite-context-universe"
REPO_PATH="$PERSIST_DIR/repo"

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_CYAN='\033[0;36m'
COLOR_RESET='\033[0m'

log()  { echo -e "${COLOR_GREEN}[ICU]${COLOR_RESET} $1"; }
warn() { echo -e "${COLOR_BLUE}[ICU]${COLOR_RESET} $1"; }
err()  { echo -e "\033[0;31m[ICU] ERROR:${COLOR_RESET} $1" >&2; exit 1; }

clone_or_update() {
  if [ -d "$REPO_PATH/.git" ]; then
    log "Repository exists at $REPO_PATH, pulling latest..."
    git -C "$REPO_PATH" pull --ff-only origin main || warn "Pull failed, continuing with existing clone."
  else
    log "Cloning repository to $REPO_PATH..."
    mkdir -p "$(dirname "$REPO_PATH")"
    git clone --depth 1 "$REPO_URL" "$REPO_PATH" 2>/dev/null || err "Failed to clone repository. Ensure git is installed and you have internet access."
  fi
}

banner() {
  echo ""
  echo -e "${COLOR_CYAN}╔══════════════════════════════════════════════════════════════╗${COLOR_RESET}"
  echo -e "${COLOR_CYAN}║        INFINITE CONTEXT UNIVERSE — Installer                 ║${COLOR_RESET}"
  echo -e "${COLOR_CYAN}║    Recursive Theatrical Cognition Framework                  ║${COLOR_RESET}"
  echo -e "${COLOR_CYAN}╚══════════════════════════════════════════════════════════════╝${COLOR_RESET}"
  echo ""
}

install_opencode() {
  DEST="$HOME/.config/opencode/skills/infinite-context-universe"
  log "Installing for OpenCode..."

  if [ -d "$DEST" ] || [ -L "$DEST" ]; then
    warn "Existing installation found at $DEST"
    warn "Removing previous installation..."
    rm -rf "$DEST"
  fi

  mkdir -p "$(dirname "$DEST")"
  ln -sf "$REPO_PATH" "$DEST"
  log "Symlinked: $DEST → $REPO_PATH"

  if [ -f "$DEST/SKILL.md" ]; then
    log "OpenCode installation verified. Use @icu to invoke."
  else
    err "Installation verification failed: SKILL.md not found."
  fi
}

install_claude_code() {
  SKILL_DEST="$HOME/.claude/skills/infinite-context-universe"
  AGENT_DEST="$HOME/.claude/agents"

  log "Installing for Claude Code..."

  # --- Skill ---
  if [ -d "$SKILL_DEST" ] || [ -L "$SKILL_DEST" ]; then
    warn "Existing skill found at $SKILL_DEST, removing..."
    rm -rf "$SKILL_DEST"
  fi
  mkdir -p "$(dirname "$SKILL_DEST")"
  ln -sf "$REPO_PATH" "$SKILL_DEST"

  # --- Agents ---
  log "Registering ICU agents for Claude Code..."
  mkdir -p "$AGENT_DEST"

  for agent in oracle fixer librarian; do
    cp "$REPO_PATH/platform/claude-code/agents/${agent}.md" "$AGENT_DEST/${agent}.md"
    log "  Agent registered: $AGENT_DEST/${agent}.md"
  done

  # Verify
  if [ -f "$SKILL_DEST/platform/claude-code/SKILL.md" ] && \
     [ -f "$AGENT_DEST/oracle.md" ] && \
     [ -f "$AGENT_DEST/fixer.md" ] && \
     [ -f "$AGENT_DEST/librarian.md" ]; then
    log "Claude Code installation verified. Use @icu to invoke."
  else
    err "Installation verification failed."
  fi
}

# --- Main ---
banner

PLATFORM="${1:-}"
if [ -z "$PLATFORM" ]; then
  echo "Usage: install.sh [--opencode | --claude-code | --all]"
  echo ""
  echo "This script installs ICU to your user-global skill directory (~/.config/opencode/skills/)."
  echo "For project-local install (into ./.opencode/skills/), use npx:"
  echo "  npx install-infinite-context-universe --opencode"
  echo ""
  echo "One-liners (global):"
  echo "  # OpenCode"
  echo "  curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --opencode"
  echo ""
  echo "  # Claude Code"
  echo "  curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --claude-code"
  echo ""
  echo "  # Both"
  echo "  curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --all"
  exit 0
fi

# Clone to persistent location
clone_or_update

case "$PLATFORM" in
  --opencode)
    install_opencode
    ;;
  --claude-code)
    install_claude_code
    ;;
  --all)
    install_opencode
    echo ""
    install_claude_code
    ;;
  *)
    err "Unknown platform: $PLATFORM. Use --opencode, --claude-code, or --all."
    ;;
esac

echo ""
log "Installation complete."
log "Invoke with: @icu"
