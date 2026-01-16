import { WalletSolid as IconoirWalletSolid } from "iconoir-react";
import { wallet } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const WalletSolid = createIcon({
	ionic: wallet,
	iconoir: IconoirWalletSolid,
	material: { name: "wallet", filled: true },
});
