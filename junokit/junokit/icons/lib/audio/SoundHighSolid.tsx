import { SoundHighSolid as IconoirSoundHighSolid } from "iconoir-react";
import { volumeHigh } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SoundHighSolid = createIcon({
	ionic: volumeHigh,
	iconoir: IconoirSoundHighSolid,
	material: { name: "volume_up", filled: true },
});
