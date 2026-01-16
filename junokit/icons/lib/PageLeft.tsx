import { PageLeft as IconoirPageLeft } from "iconoir-react";
import { chevronBackCircleOutline } from "ionicons/icons";
import { createIcon } from "../createIcon";

export const PageLeft = createIcon({
	ionic: chevronBackCircleOutline,
	iconoir: IconoirPageLeft,
	material: {
		name: "expand_circle_right",
		transform: "scaleX(-1)", // Flip horizontally to make right arrow into left
	},
});
