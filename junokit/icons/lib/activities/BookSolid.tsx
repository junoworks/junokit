import { BookSolid as IconoirBookSolid } from "iconoir-react";
import { book } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const BookSolid = createIcon({
	ionic: book,
	iconoir: IconoirBookSolid,
	material: { name: "book_2", filled: true },
});
