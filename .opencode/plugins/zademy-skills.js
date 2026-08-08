/**
 * Zademy skills plugin for OpenCode.ai
 *
 * Registers the promoted skill buckets via the config hook so OpenCode
 * discovers every skill without symlinks or manual config edits.
 *
 * Install by adding this to the `plugin` array in opencode.json:
 *   "zademy-skills@git+https://github.com/zademy/skills.git"
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// OpenCode discovers skills one level deep (<path>/*/SKILL.md), so each
// bucket folder under skills/ is registered individually.
const skillsRoot = path.resolve(__dirname, '../../skills');

// Non-promoted buckets are not shipped, mirroring .claude-plugin/plugin.json.
const EXCLUDED_BUCKETS = new Set(['deprecated', 'in-progress', 'misc']);

export const ZademySkills = async () => {
  return {
    // Inject skill paths into live config. Config.get() returns a cached
    // singleton, so mutations here are visible when skills are discovered.
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];

      if (!fs.existsSync(skillsRoot)) return;

      const buckets = fs
        .readdirSync(skillsRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !EXCLUDED_BUCKETS.has(entry.name))
        .map((entry) => path.join(skillsRoot, entry.name));

      for (const bucket of buckets) {
        if (!config.skills.paths.includes(bucket)) {
          config.skills.paths.push(bucket);
        }
      }
    },
  };
};
