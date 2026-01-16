import { ShareIos as IconoirShareIos } from "iconoir-react";
import { shareOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ShareIos = createIcon({
	ionic: shareOutline,
	iconoir: IconoirShareIos,
	material: "ios_share",
});
