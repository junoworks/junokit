import { type ColorValue, colorList, type AllColors } from "../../utils/colors";

export type LoaderSize = React.CSSProperties["fontSize"];
export type LoaderColor = ColorValue;

/** Resolves theme colors to CSS variables, passes through raw CSS values */
export function resolveColorValue(color: string | undefined): string {
	if (!color || color === "current") return "currentColor";
	return colorList.includes(color as AllColors) ? `var(--${color})` : color;
}

export type LoaderProps = {
	size?: LoaderSize;
	color?: LoaderColor;
	opacity?: number;
	pause?: boolean;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "color">;

export const defaults = {
	variant: "spin" as const,
	size: "1em" as const,
	color: "current" as const,
	opacity: 70,
	pause: false,
};
