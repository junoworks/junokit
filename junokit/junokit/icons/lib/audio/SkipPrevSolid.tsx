import { SkipPrevSolid as IconoirSkipPrevSolid } from "iconoir-react";
import { playSkipBack } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SkipPrevSolid = createIcon({
	ionic: playSkipBack,
	iconoir: IconoirSkipPrevSolid,
	material: { name: "skip_previous", filled: true },
});
