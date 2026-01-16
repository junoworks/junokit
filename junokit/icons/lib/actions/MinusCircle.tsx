import { MinusCircle as IconoirMinusCircle } from "iconoir-react";
import { removeCircleOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MinusCircle = createIcon({
	ionic: removeCircleOutline,
	iconoir: IconoirMinusCircle,
	material: "remove_circle",
});
