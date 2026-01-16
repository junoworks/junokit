import { Fingerprint as IconoirFingerprint } from "iconoir-react";
import { fingerPrintOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Fingerprint = createIcon({
	ionic: fingerPrintOutline,
	iconoir: IconoirFingerprint,
	material: "fingerprint",
});
