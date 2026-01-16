import Heading, { type HeadingProps } from "./Heading";
import Link, { type LinkProps } from "./Link";
import Text, { type TextProps } from "./Text";
import type { CommonTextProps } from "./types";

export interface StandardTextProps {
	textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	color?: string;
	lineHeight?: "none" | "tight" | "normal" | "relaxed" | "loose";
	fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold";
	textAlign?: "left" | "right" | "center" | "justify";
	italic?: boolean;
	decoration?: string[];
	fontFamily?: "body" | "accent" | "mono";
	textWrap?: "wrap" | "nowrap" | "balance" | "pretty";
	whitespace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
	wordBreak?: "normal" | "words" | "all" | "keep";
	truncate?: boolean;
}

export function prepareHeadingClass(props: HeadingProps) {
	const {
		variant = Heading.defaults.variant,
		as: _as,
		className,
		children: _children,
		...rest
	} = { ...Heading.defaults, ...props };

	const classString = variant && `jn-h-${variant}`;

	const commonTextProps = extractCommonTextProps(rest);
	const commonTypographyClasses = prepareCommonTypographyClass(commonTextProps);

	const classes = [classString, commonTypographyClasses, className].filter(Boolean).join(" ");
	return classes;
}

export function prepareLinkClass(props: LinkProps) {
	const {
		variant = Link.defaults.variant,
		as: _as,
		className,
		children: _children,
		...rest
	} = { ...Link.defaults, ...props };

	const classString = variant && `jn-lnk-${variant}`;

	const commonTextProps = extractCommonTextProps(rest);
	const commonTypographyClasses = prepareCommonTypographyClass(commonTextProps);

	const classes = [classString, commonTypographyClasses, className].filter(Boolean).join(" ");
	return classes;
}

export function prepareTextClass(props: TextProps) {
	const {
		variant = Text.defaults.variant,
		as: _as,
		className,
		children: _children,
		...rest
	} = { ...Text.defaults, ...props };

	const classString = variant && `jn-txt-${variant}`;

	const commonTextProps = extractCommonTextProps(rest);
	const commonTypographyClasses = prepareCommonTypographyClass(commonTextProps);

	const classes = [classString, commonTypographyClasses, className].filter(Boolean).join(" ");
	return classes;
}

export function prepareCommonTypographyClass(props: CommonTextProps): string {
	const { size, color, lineHeight, weight, align, decoration, family, wrap, truncate, className } = { ...props };

	const textSizeStyles = size ? `text-${size}` : "";
	const textColorStyles = color ? `text-${color}` : "";
	const lineHeightStyles = lineHeight ? `leading-${lineHeight}` : "";
	const fontWeightStyles = weight ? `font-${weight}` : "";
	const textAlignStyles = align ? `text-${align}` : "";

	const textDecorationStyles = makeDecorationStyles(decoration);

	const fontFamilyStyles = family ? `font-${family}` : "";
	const truncateStyles = truncate ? "truncate" : "";

	// Handle wrap as boolean
	const whitespaceStyles = wrap ? "whitespace-nowrap" : "whitespace-pre-line";

	// Combine all styles, filtering out empty strings
	const allStyles = [
		textSizeStyles,
		textColorStyles,
		lineHeightStyles,
		fontWeightStyles,
		textAlignStyles,
		textDecorationStyles,
		fontFamilyStyles,
		truncateStyles,
		whitespaceStyles,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return allStyles;
}

const makeDecorationStyles = (decoration: string[] | undefined) => {
	if (!decoration || !Array.isArray(decoration)) return "";

	const hasUnderline = decoration.includes("underline");
	const hasLineThrough = decoration.includes("line-through");

	// Special case: both underline and line-through present
	if (hasUnderline && hasLineThrough) {
		const otherDecorations = decoration.filter((d) => d !== "underline" && d !== "line-through");
		const arbitraryProperty = "[text-decoration-line:underline_line-through]";
		return otherDecorations.length > 0 ? `${arbitraryProperty} ${otherDecorations.join(" ")}` : arbitraryProperty;
	}

	// Normal case: just join all decorations
	return decoration.join(" ");
};

// Utility function to extract common text props from any props object
export function extractCommonTextProps<T extends Partial<CommonTextProps> & Record<string, unknown>>(
	props: T,
): CommonTextProps {
	const { color, size, lineHeight, weight, align, decoration, family, wrap, truncate, className } = props;
	const result: CommonTextProps = {};
	if (color !== undefined) result.color = color;
	if (size !== undefined) result.size = size;
	if (lineHeight !== undefined) result.lineHeight = lineHeight;
	if (weight !== undefined) result.weight = weight;
	if (align !== undefined) result.align = align;
	if (decoration !== undefined) result.decoration = decoration;
	if (family !== undefined) result.family = family;
	if (wrap !== undefined) result.wrap = wrap;
	if (truncate !== undefined) result.truncate = truncate;
	if (className !== undefined) result.className = className;
	return result;
}

// Utility function to omit common text props and return only HTML attributes
export function omitCommonTextProps<T extends Partial<CommonTextProps> & Record<string, unknown>>(
	props: T,
): Omit<T, keyof CommonTextProps> {
	const {
		color: _color,
		size: _size,
		lineHeight: _lineHeight,
		weight: _weight,
		align: _align,
		decoration: _decoration,
		family: _family,
		wrap: _wrap,
		truncate: _truncate,
		className: _className,
		...htmlAttributes
	} = props;
	return htmlAttributes as Omit<T, keyof CommonTextProps>;
}
