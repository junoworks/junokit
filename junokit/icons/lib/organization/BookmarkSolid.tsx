import { BookmarkSolid as IconoirBookmarkSolid } from "iconoir-react";
import { bookmark } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const BookmarkSolid = createIcon({
	ionic: bookmark,
	iconoir: IconoirBookmarkSolid,
	material: { name: "bookmark", filled: true },
});
