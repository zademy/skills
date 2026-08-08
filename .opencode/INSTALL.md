# Installing these skills for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add the plugin to the `plugin` array in your `opencode.json` (global or
project-level):

```json
{
  "plugin": ["zademy-skills@git+https://github.com/zademy/skills.git"]
}
```

Restart OpenCode. OpenCode installs the git-backed package with Bun at
startup and the plugin registers the `engineering` and `productivity` skill
buckets automatically — no symlinks or extra config needed.

## Usage

Use OpenCode's native `skill` tool:

```
use skill tool to list skills
use skill tool to load code-review
```

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i zademy`
2. Verify the plugin line in your `opencode.json`
3. Make sure you're running a recent version of OpenCode

### Skills not found

1. Use the `skill` tool to list what's discovered
2. Each skill needs a `SKILL.md` with valid YAML frontmatter (`name` and
   `description` are required)

### Updates

Some OpenCode and Bun versions pin resolved git dependencies in a lockfile or
cache, so a restart may not pick up the newest commit. If updates do not
appear, clear OpenCode's package cache (`~/.cache/opencode/`) or reinstall
the plugin.
