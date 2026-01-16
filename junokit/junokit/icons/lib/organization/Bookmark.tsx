import { Bookmark as IconoirBookmark } from "iconoir-react";
import { bookmarkOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Bookmark = createIcon({
	ionic: bookmarkOutline,
	iconoir: IconoirBookmark,
	material: "bookmark_border",
});
