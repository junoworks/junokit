import { ScanQrCode as IconoirScanQrCode } from "iconoir-react";
import { scanOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ScanQrCode = createIcon({
	ionic: scanOutline,
	iconoir: IconoirScanQrCode,
	material: "qr_code_scanner",
});
