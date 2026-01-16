import { SoundMinSolid as IconoirSoundMinSolid } from "iconoir-react";
import { volumeOff } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SoundMinSolid = createIcon({
	ionic: volumeOff,
	iconoir: IconoirSoundMinSolid,
	material: { name: "volume_mute", filled: true },
});
