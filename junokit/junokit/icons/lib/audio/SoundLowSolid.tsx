import { SoundLowSolid as IconoirSoundLowSolid } from "iconoir-react";
import { volumeLow } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SoundLowSolid = createIcon({
	ionic: volumeLow,
	iconoir: IconoirSoundLowSolid,
	material: { name: "volume_down", filled: true },
});
