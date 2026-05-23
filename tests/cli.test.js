// Tests for bin/cli.js — ICU npx Installer
const { describe, it } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

const { validateArgs, isInsideRepo } = require('../bin/cli.js');

// ============================================================
// validateArgs — argument parsing and validation
// ============================================================
describe('validateArgs', () => {
  it('returns error for no arguments', () => {
    const result = validateArgs([]);
    assert.strictEqual(result.platform, null);
    assert.strictEqual(result.error, true);
  });

  it('parses --opencode without --global', () => {
    const result = validateArgs(['--opencode']);
    assert.strictEqual(result.platform, '--opencode');
    assert.strictEqual(result.globalMode, false);
    assert.strictEqual(result.error, null);
  });

  it('parses --opencode --global', () => {
    const result = validateArgs(['--opencode', '--global']);
    assert.strictEqual(result.platform, '--opencode');
    assert.strictEqual(result.globalMode, true);
    assert.strictEqual(result.error, null);
  });

  it('rejects --claude-code without --global', () => {
    const result = validateArgs(['--claude-code']);
    assert.strictEqual(result.platform, '--claude-code');
    assert.strictEqual(result.globalMode, false);
    assert.ok(result.error);
    assert.ok(result.error.includes('--global required'));
  });

  it('accepts --claude-code --global', () => {
    const result = validateArgs(['--claude-code', '--global']);
    assert.strictEqual(result.platform, '--claude-code');
    assert.strictEqual(result.globalMode, true);
    assert.strictEqual(result.error, null);
  });

  it('rejects --all without --global', () => {
    const result = validateArgs(['--all']);
    assert.strictEqual(result.platform, '--all');
    assert.strictEqual(result.globalMode, false);
    assert.ok(result.error);
  });

  it('accepts --all --global', () => {
    const result = validateArgs(['--all', '--global']);
    assert.strictEqual(result.platform, '--all');
    assert.strictEqual(result.globalMode, true);
    assert.strictEqual(result.error, null);
  });

  it('ignores unknown flags', () => {
    const result = validateArgs(['--opencode', '--foo', '--bar']);
    assert.strictEqual(result.platform, '--opencode');
    assert.strictEqual(result.globalMode, false);
  });

  it('detects --global regardless of position', () => {
    const result = validateArgs(['--global', '--opencode']);
    assert.strictEqual(result.platform, '--opencode');
    assert.strictEqual(result.globalMode, true);
  });

  it('returns null platform for unrecognized argument', () => {
    const result = validateArgs(['--unknown']);
    assert.strictEqual(result.platform, null);
    assert.strictEqual(result.error, true);
  });
});

// ============================================================
// isInsideRepo — repo detection
// ============================================================
describe('isInsideRepo', () => {
  it('returns true when running inside the ICU repo', () => {
    // These tests run from the repo root, so this should be true
    assert.strictEqual(isInsideRepo(), true);
  });

  it('returns false when key files are missing', () => {
    // Save original cwd
    const origCwd = process.cwd;
    // Mock cwd to a temp dir that doesn't have the required files
    process.cwd = () => path.join(__dirname, 'fixtures', 'empty-dir');
    // Ensure the empty dir exists
    fs.mkdirSync(process.cwd(), { recursive: true });

    try {
      assert.strictEqual(isInsideRepo(), false);
    } finally {
      process.cwd = origCwd;
    }
  });
});

// ============================================================
// CLI exit codes (integration)
// ============================================================
if (require.main === module) {
  // These tests run the actual CLI as a subprocess
  const { execSync } = require('node:child_process');

  describe('CLI integration', () => {
    const cli = path.join(__dirname, '..', 'bin', 'cli.js');
    const run = (args) => {
      try {
        return execSync(`node "${cli}" ${args}`, {
          encoding: 'utf8',
          stdio: 'pipe',
          timeout: 5000,
        });
      } catch (e) {
        return e.stdout + e.stderr;
      }
    };

    it('shows usage when no args', () => {
      const out = run('');
      assert.ok(out.includes('Usage:'));
      assert.ok(out.includes('--opencode'));
      assert.ok(out.includes('--global'));
    });

    it('errors when --claude-code without --global', () => {
      const out = run('--claude-code');
      assert.ok(out.includes('--global required'));
      assert.ok(out.includes('ERROR'));
    });

    it('errors when --all without --global', () => {
      const out = run('--all');
      assert.ok(out.includes('--global required'));
    });

    it('shows usage for unknown flag', () => {
      const out = run('--unknown');
      assert.ok(out.includes('Usage:'));
    });
  });
}
