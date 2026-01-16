import { CreditCardSolid as IconoirCreditCardSolid } from "iconoir-react";
import { card } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const CreditCardSolid = createIcon({
	ionic: card,
	iconoir: IconoirCreditCardSolid,
	material: { name: "credit_card", filled: true },
});
