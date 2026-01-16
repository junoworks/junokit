import { Palette as IconoirPalette } from "iconoir-react";
import { colorPaletteOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Palette = createIcon({
	ionic: colorPaletteOutline,
	iconoir: IconoirPalette,
	material: "palette",
});
