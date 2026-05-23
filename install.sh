#!/usr/bin/env bash
set -euo pipefail

# Infinite Context Universe — One-Line Installer
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --opencode
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --claude-code
#   curl -fsSL https://raw.githubusercontent.com/darkLordIceCream/Infinite-Context-Universe-SKILL/main/install.sh | bash -s -- --all

REPO_URL="https://github.com/darkLordIceCream/Infinite-Context-Universe-SKILL.git"
REPO_DIR="Infinite-Context-Universe-SKILL"
TMP_DIR=""

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_CYAN='\033[0;36m'
COLOR_RESET='\033[0m'

log()  { echo -e "${COLOR_GREEN}[ICU]${COLOR_RESET} $1"; }
warn() { echo -e "${COLOR_BLUE}[ICU]${COLOR_RESET} $1"; }
err()  { echo -e "\033[0;31m[ICU] ERROR:${COLOR_RESET} $1" >&2; exit 1; }

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

  if [ -d "$DEST" ]; then
    warn "Existing installation found at $DEST"
    warn "Removing previous installation..."
    rm -rf "$DEST"
  fi

  mkdir -p "$(dirname "$DEST")"
  ln -sf "$TMP_DIR/$REPO_DIR" "$DEST"
  log "Symlinked: $DEST → $TMP_DIR/$REPO_DIR"

  # Verify
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
  if [ -d "$SKILL_DEST" ]; then
    warn "Existing skill found at $SKILL_DEST, removing..."
    rm -rf "$SKILL_DEST"
  fi
  mkdir -p "$(dirname "$SKILL_DEST")"

  # Use the Claude Code adapter SKILL.md
  ln -sf "$TMP_DIR/$REPO_DIR" "$SKILL_DEST"

  # --- Agents ---
  log "Registering ICU agents for Claude Code..."
  mkdir -p "$AGENT_DEST"

  for agent in oracle fixer librarian; do
    cp "$TMP_DIR/$REPO_DIR/platform/claude-code/agents/${agent}.md" "$AGENT_DEST/${agent}.md"
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
  echo "One-liners:"
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

# Clone to temp directory
TMP_DIR=$(mktemp -d)
log "Cloning repository..."
git clone --depth 1 "$REPO_URL" "$TMP_DIR/$REPO_DIR" 2>/dev/null || err "Failed to clone repository."

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
