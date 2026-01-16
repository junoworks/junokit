import { CreditCard as IconoirCreditCard } from "iconoir-react";
import { cardOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const CreditCard = createIcon({
	ionic: cardOutline,
	iconoir: IconoirCreditCard,
	material: "credit_card",
});
