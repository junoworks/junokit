import { Barcode as IconoirBarcode } from "iconoir-react";
import { barcodeOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Barcode = createIcon({
	ionic: barcodeOutline,
	iconoir: IconoirBarcode,
	material: "barcode",
});
