import { Plus as IconoirPlus } from "iconoir-react";
import { addOutline } from "ionicons/icons";
import { createIcon } from "../createIcon";

export const Plus = createIcon({
	ionic: addOutline,
	iconoir: IconoirPlus,
	material: "add",
});
