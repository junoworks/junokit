import { MicrophoneSolid as IconoirMicrophoneSolid } from "iconoir-react";
import { mic } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MicrophoneSolid = createIcon({
	ionic: mic,
	iconoir: IconoirMicrophoneSolid,
	material: { name: "mic", filled: true },
});
