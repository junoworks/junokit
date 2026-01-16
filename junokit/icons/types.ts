export type IconWeight = "thin" | "default" | "thick";

export type Color =
	| "base-0"
	| "base-50"
	| "base-100"
	| "base-200"
	| "base-300"
	| "base-500"
	| "base-700"
	| "base-content"
	| "primary"
	| "accent"
	| "info"
	| "warning"
	| "success"
	| "error";

export type Size = number | string | `${number}em` | `${number}px`;

export type LibraryType = "ionic" | "iconoir" | "material";

export type IconProps = {
	solid?: boolean;
	library?: LibraryType;
	color?: Color;
	size?: Size;
	weight?: IconWeight;
} & React.HTMLAttributes<HTMLElement>;
