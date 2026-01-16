import { HelpCircleSolid as IconoirHelpCircleSolid } from "iconoir-react";
import { helpCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const HelpCircleSolid = createIcon({
	ionic: helpCircle,
	iconoir: IconoirHelpCircleSolid,
	material: { name: "help", filled: true },
});
