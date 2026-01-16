import { FaceId as IconoirFaceId } from "iconoir-react";
import { scanOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const FaceId = createIcon({
	ionic: scanOutline,
	iconoir: IconoirFaceId,
	material: "face",
});
