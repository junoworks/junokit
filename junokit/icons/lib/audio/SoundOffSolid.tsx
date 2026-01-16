import { SoundOffSolid as IconoirSoundOffSolid } from "iconoir-react";
import { volumeMute } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SoundOffSolid = createIcon({
	ionic: volumeMute,
	iconoir: IconoirSoundOffSolid,
	material: { name: "volume_off", filled: true },
});
