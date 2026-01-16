import { Phone as IconoirPhone } from "iconoir-react";
import { callOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Phone = createIcon({
	ionic: callOutline,
	iconoir: IconoirPhone,
	material: "call",
});
