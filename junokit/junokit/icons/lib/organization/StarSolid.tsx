import { StarSolid as IconoirStarSolid } from "iconoir-react";
import { star } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const StarSolid = createIcon({
	ionic: star,
	iconoir: IconoirStarSolid,
	material: { name: "star", filled: true },
});
