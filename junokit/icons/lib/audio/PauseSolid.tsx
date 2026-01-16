import { PauseSolid as IconoirPauseSolid } from "iconoir-react";
import { pause } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PauseSolid = createIcon({
	ionic: pause,
	iconoir: IconoirPauseSolid,
	material: { name: "pause", filled: true },
});
