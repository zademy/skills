import { resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// The promoted buckets, mirroring .claude-plugin/plugin.json.
const skillPaths = [
	resolve(packageRoot, "skills/engineering"),
	resolve(packageRoot, "skills/productivity"),
];

export default function zademySkillsPiExtension(pi: ExtensionAPI) {
	pi.on("resources_discover", async () => ({
		skillPaths,
	}));
}
