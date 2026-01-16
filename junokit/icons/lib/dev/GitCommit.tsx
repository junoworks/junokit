import { GitCommit as IconoirGitCommit } from "iconoir-react";
import { gitCommitOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const GitCommit = createIcon({
	ionic: gitCommitOutline,
	iconoir: IconoirGitCommit,
	material: "commit",
});
