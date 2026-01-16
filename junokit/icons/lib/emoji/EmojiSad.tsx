import { EmojiSad as IconoirEmojiSad } from "iconoir-react";
import { sadOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const EmojiSad = createIcon({
	ionic: sadOutline,
	iconoir: IconoirEmojiSad,
	material: "sentiment_sad",
});
