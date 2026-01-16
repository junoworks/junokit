import { Heart as IconoirHeart } from "iconoir-react";
import { heartOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Heart = createIcon({
	ionic: heartOutline,
	iconoir: IconoirHeart,
	material: "favorite_border",
});
