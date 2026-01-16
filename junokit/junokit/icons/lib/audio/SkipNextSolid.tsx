import { SkipNextSolid as IconoirSkipNextSolid } from "iconoir-react";
import { playSkipForward } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SkipNextSolid = createIcon({
	ionic: playSkipForward,
	iconoir: IconoirSkipNextSolid,
	material: { name: "skip_next", filled: true },
});
