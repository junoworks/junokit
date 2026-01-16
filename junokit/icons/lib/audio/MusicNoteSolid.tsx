import { MusicNoteSolid as IconoirMusicNoteSolid } from "iconoir-react";
import { musicalNote } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MusicNoteSolid = createIcon({
	ionic: musicalNote,
	iconoir: IconoirMusicNoteSolid,
	material: { name: "music_note", filled: true },
});
