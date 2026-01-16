import { Wrench as IconoirWrench } from "iconoir-react";
import { buildOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Wrench = createIcon({
	ionic: buildOutline,
	iconoir: IconoirWrench,
	material: "build",
});
