import { Emoji as IconoirEmoji } from "iconoir-react";
import { happyOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Emoji = createIcon({
	ionic: happyOutline,
	iconoir: IconoirEmoji,
	material: "mood",
});
