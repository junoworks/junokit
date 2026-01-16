import { QrCode as IconoirQrCode } from "iconoir-react";
import { qrCodeOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const QrCode = createIcon({
	ionic: qrCodeOutline,
	iconoir: IconoirQrCode,
	material: "qr_code",
});
