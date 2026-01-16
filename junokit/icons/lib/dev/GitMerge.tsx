import { GitMerge as IconoirGitMerge } from "iconoir-react";
import { gitMergeOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const GitMerge = createIcon({
	ionic: gitMergeOutline,
	iconoir: IconoirGitMerge,
	material: "merge_type",
});
