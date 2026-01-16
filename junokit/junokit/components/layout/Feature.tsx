import type { Gap } from "../../base/containers/types";
import { makeTailwindPadding } from "../../base/containers/utils";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../utils/spacing";
import type { SpacingPreset } from "./types";
import "./layout.css";

export type FeatureProps = {
	bgColor?: ExtendedColor;
	bgImage?: string;
	spacing?: SpacingPreset;
	align?: "start" | "center" | "end" | "stretch";
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	gap?: Gap;
	as?: "section" | "div";
	children?: React.ReactNode;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLElement>;

export const defaults = {
	bgColor: "base-50" as ExtendedColor,
	bgImage: undefined,
	spacing: "sm" as SpacingPreset,
	align: "center" as const,
	justify: "center" as const,
	gap: undefined,
	as: "section" as const,
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
} as const;

function Feature(props: FeatureProps) {
	const {
		bgColor,
		bgImage,
		spacing,
		align,
		justify,
		gap,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
		children,
		as,
		className,
		style,
		...rest
	} = { ...defaults, ...props };

	/* CLASSES */
	const classes = makeFeatureClasses(props);

	/* INLINE STYLES */
	const { styles: paddingStyles } = processLayoutPadding({
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
	});
	const inlineStyle = {
		...(gap !== undefined && { gap: gap }),
		...paddingStyles,
		...(bgImage !== undefined && {
			background: `url(${bgImage}) no-repeat center center / cover`,
		}),
		...style,
	} as React.CSSProperties;

	const Component = as || "section";
	return (
		<Component {...rest} className={classes} data-juno-apiname="Feature" style={inlineStyle}>
			{children}
		</Component>
	);
}

export default Feature;

Feature.defaults = defaults;

export function makeFeatureClasses(props: FeatureProps) {
	const { bgColor, bgImage, spacing, align, justify, p, px, py, pt, pr, pb, pl, className } = { ...defaults, ...props };

	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: bgClass } = resolveColor(bgColor, true);
	const { className: fontClass } = resolveColor(fontColor, false);

	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const alignClass = align ? `items-${align}` : "";
	const justifyClass = justify ? `justify-${justify}` : "";
	const paddingClasses = makeTailwindPadding(p, px, py, pt, pr, pb, pl);
	const bgImageClass = bgImage ? `bg-[url(${bgImage})] bg-cover bg-center bg-no-repeat` : "";

	const classes = [
		"flex flex-col w-full overflow-hidden",
		"transition-all duration-150",
		bgClass,
		fontClass,
		spacingClass,
		alignClass,
		justifyClass,
		paddingClasses,
		bgImageClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return classes;
}
