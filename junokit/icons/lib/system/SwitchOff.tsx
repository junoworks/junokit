import { SwitchOff as IconoirSwitchOff } from "iconoir-react";
import { toggleOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SwitchOff = createIcon({
	ionic: toggleOutline,
	iconoir: IconoirSwitchOff,
	material: "toggle_off",
});
