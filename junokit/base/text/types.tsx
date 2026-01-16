import type { AllColors } from "../../utils/colors";

export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export type CommonTextProps = {
	color?: AllColors | string; // Allow both AllColors and generic string
	size?: TextSize;
	lineHeight?: "none" | "tight" | "normal" | "relaxed" | "loose";
	weight?: "light" | "normal" | "medium" | "semibold" | "bold";
	align?: "left" | "right" | "center" | "justify";
	decoration?: string[];
	family?: "body" | "accent" | "mono";
	wrap?: boolean;
	truncate?: boolean;
	className?: string;
};

// Helper type to extract only CommonTextProps from a larger props object
export type ExtractCommonTextProps<T> = Pick<T, keyof T & keyof CommonTextProps>;
