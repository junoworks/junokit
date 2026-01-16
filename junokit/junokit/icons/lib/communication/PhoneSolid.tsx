import { PhoneSolid as IconoirPhoneSolid } from "iconoir-react";
import { call } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PhoneSolid = createIcon({
	ionic: call,
	iconoir: IconoirPhoneSolid,
	material: { name: "call", filled: true },
});
