import { MicrophoneSpeakingSolid as IconoirMicrophoneSpeakingSolid } from "iconoir-react";
import { mic } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MicrophoneSpeakingSolid = createIcon({
	ionic: mic,
	iconoir: IconoirMicrophoneSpeakingSolid,
	material: { name: "settings_voice", filled: true },
});
