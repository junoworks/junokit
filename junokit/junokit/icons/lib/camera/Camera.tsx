import { Camera as IconoirCamera } from "iconoir-react";
import { cameraOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Camera = createIcon({
	ionic: cameraOutline,
	iconoir: IconoirCamera,
	material: "photo_camera",
});
