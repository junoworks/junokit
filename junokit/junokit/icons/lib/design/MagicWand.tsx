import { MagicWand as IconoirMagicWand } from "iconoir-react";
import { colorWandOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MagicWand = createIcon({
	ionic: colorWandOutline,
	iconoir: IconoirMagicWand,
	material: "auto_fix_high",
});
