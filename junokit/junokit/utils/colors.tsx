export type ThemeColor = AllColors;
export type CSSColor = string;
export type ColorValue = ThemeColor | CSSColor;
export type ExtendedColor = ThemeColor | CSSColor;

export const colorList = [
	"base-0",
	"base-50",
	"base-100",
	"base-200",
	"base-300",
	"base-400",
	"base-500",
	"base-600",
	"base-700",
	"base-800",
	"base-900",
	"base",
	"base-content",
	"primary",
	"primary-content",
	"primary-focus",
	"primary-surface",
	"accent",
	"accent-focus",
	"accent-content",
	"accent-surface",
	"error",
	"error-focus",
	"error-content",
	"error-surface",
	"info",
	"info-focus",
	"info-content",
	"info-surface",
	"success",
	"success-focus",
	"success-content",
	"success-surface",
	"warning",
	"warning-focus",
	"warning-content",
	"warning-surface",
	"transparent",
	"current-10",
	"current-20",
	"current-50",
] as const;

// Create type from the array values
export type AllColors = (typeof colorList)[number];

// we default to these font colors for the background colors
export const fontColorMap = {
	"base-0": "base-content",
	"base-50": "base-content",
	"base-100": "base-content",
	"base-200": "base-content",
	"base-300": "base-content",
	"base-400": "base-content",
	"base-500": "base-0",
	"base-600": "base-0",
	"base-700": "base-0",
	"base-800": "base-0",
	"base-900": "base-0",
	"base-content": "base-0",
	base: "base-0",

	primary: "base-0",
	"primary-content": "base-0",
	"primary-focus": "base-0",
	"primary-surface": "primary-content",

	accent: "base-0",
	"accent-content": "base-0",
	"accent-focus": "base-0",
	"accent-surface": "accent-content",

	error: "base-0",
	"error-content": "base-0",
	"error-focus": "base-0",
	"error-surface": "error-content",

	info: "base-0",
	"info-content": "base-0",
	"info-focus": "base-0",
	"info-surface": "info-content",

	success: "base-0",
	"success-content": "base-0",
	"success-focus": "base-0",
	"success-surface": "success-content",

	warning: "base-0",
	"warning-content": "base-0",
	"warning-focus": "base-0",
	"warning-surface": "warning-content",
};

export function resolveColor(
	color: ColorValue | undefined,
	isBackground: boolean = false,
): {
	className: string;
	style: Record<string, string>;
} {
	if (!color) return { className: "", style: {} };

	const prefix = isBackground ? "bg-" : "text-";
	const property = isBackground ? "backgroundColor" : "color";
	const className = colorList.includes(color as AllColors) ? `${prefix}${color}` : `${prefix}[${color}]`;
	const style = colorList.includes(color as AllColors) ? { [property]: `var(--${color})` } : { [property]: color };
	return {
		className,
		style,
	};
}
