import { MicrophoneWarningSolid as IconoirMicrophoneWarningSolid } from "iconoir-react";
import { createIcon } from "../../createIcon";

export const MicrophoneWarningSolid = createIcon({
	ionic: "use-iconoir",
	iconoir: IconoirMicrophoneWarningSolid,
	material: { name: "mic_alert", filled: true },
});
