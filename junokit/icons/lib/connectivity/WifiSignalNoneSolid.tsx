import { WifiSignalNoneSolid as IconoirWifiSignalNoneSolid } from "iconoir-react";
import { createIcon } from "../../createIcon";

export const WifiSignalNoneSolid = createIcon({
	ionic: "use-iconoir",
	iconoir: IconoirWifiSignalNoneSolid,
	material: { name: "signal_wifi_off", filled: true },
});
