import { ScanBarcode as IconoirScanBarcode } from "iconoir-react";
import { scanOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ScanBarcode = createIcon({
	ionic: scanOutline,
	iconoir: IconoirScanBarcode,
	material: "qr_code_scanner",
});
