import { PlaySolid as IconoirPlaySolid } from "iconoir-react";
import { play } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PlaySolid = createIcon({
	ionic: play,
	iconoir: IconoirPlaySolid,
	material: { name: "play_arrow", filled: true },
});
