import { MicrophoneMuteSolid as IconoirMicrophoneMuteSolid } from "iconoir-react";
import { micOff } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MicrophoneMuteSolid = createIcon({
	ionic: micOff,
	iconoir: IconoirMicrophoneMuteSolid,
	material: { name: "mic_off", filled: true },
});
