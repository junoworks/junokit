import { Drag as IconoirDrag } from "iconoir-react";
import { moveOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Drag = createIcon({
	ionic: moveOutline,
	iconoir: IconoirDrag,
	material: "drag_pan",
});
