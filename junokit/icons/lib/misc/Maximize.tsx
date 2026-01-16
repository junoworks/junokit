import { Maximize as IconoirMaximize } from "iconoir-react";
import { expandOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Maximize = createIcon({
	ionic: expandOutline,
	iconoir: IconoirMaximize,
	material: "fullscreen",
});
