import { MedalSolid as IconoirMedalSolid } from "iconoir-react";
import { medal } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MedalSolid = createIcon({
	ionic: medal,
	iconoir: IconoirMedalSolid,
	material: { name: "military_tech", filled: true },
});
