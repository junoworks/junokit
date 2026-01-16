import { FillColorSolid as IconoirFillColorSolid } from "iconoir-react";
import { colorFill } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const FillColorSolid = createIcon({
	ionic: colorFill,
	iconoir: IconoirFillColorSolid,
	material: { name: "colors", filled: true },
});
