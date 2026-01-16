import { MoreVert } from "iconoir-react";
import { ellipsisVerticalCircleOutline } from "ionicons/icons";
import { createIcon } from "../createIcon";

export const MoreVertCircle = createIcon({
	ionic: ellipsisVerticalCircleOutline,
	iconoir: MoreVert,
	material: {
		name: "pending",
		transform: "rotate(90deg)", // Rotate Material icon 90 degrees
	},
});
