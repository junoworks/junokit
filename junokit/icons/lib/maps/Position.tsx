import { Position as IconoirPosition } from "iconoir-react";
import { locateOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Position = createIcon({
	ionic: locateOutline,
	iconoir: IconoirPosition,
	material: "my_location",
});
