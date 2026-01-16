import { SwitchOn as IconoirSwitchOn } from "iconoir-react";
import { toggleOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SwitchOn = createIcon({
	ionic: toggleOutline,
	iconoir: IconoirSwitchOn,
	material: "toggle_on",
});
