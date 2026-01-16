import { ColorPicker as IconoirColorPicker } from "iconoir-react";
import { colorWandOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ColorPicker = createIcon({
	ionic: colorWandOutline,
	iconoir: IconoirColorPicker,
	material: "colorize",
});
