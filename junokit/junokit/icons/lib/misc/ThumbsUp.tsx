import { ThumbsUp as IconoirThumbsUp } from "iconoir-react";
import { thumbsUpOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ThumbsUp = createIcon({
	ionic: thumbsUpOutline,
	iconoir: IconoirThumbsUp,
	material: "thumb_up",
});
