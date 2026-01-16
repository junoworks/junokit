import { Gift as IconoirGift } from "iconoir-react";
import { giftOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Gift = createIcon({
	ionic: giftOutline,
	iconoir: IconoirGift,
	material: "card_giftcard",
});
