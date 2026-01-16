import { Star as IconoirStar } from "iconoir-react";
import { starOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Star = createIcon({
	ionic: starOutline,
	iconoir: IconoirStar,
	material: "star_border",
});
