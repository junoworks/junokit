import type { Corners, Gap } from "../types";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";
import type { SpacingPreset } from "../types";
import "../layout.css";
import { makeTailwindPadding } from "../utils";
import MainWrapper from "./MainWrapper";

type Direction = "column" | "row";

export type MainProps = {
	bgColor?: ExtendedColor;
	width?: string;
	direction?: Direction;
	spacing?: SpacingPreset;
	gap?: Gap;
	corners?: Corners;
	align?: string;
	justify?: string;
	outline?: boolean;
	overflow?: string;
	children?: React.ReactNode;
	className?: string;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLElement>;

export const defaults = {
	bgColor: undefined,
	direction: "column" as const,
	spacing: "sm" as SpacingPreset,

	align: "start" as const,
	justify: "start" as const,
	width: "100%" as const,
	outline: undefined,
	overflow: "auto" as const,
	corners: undefined as Corners | undefined,
	gap: undefined as Gap,

	className: "",
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

function Main(props: MainProps) {
	const {
		bgColor,
		width,
		direction,
		spacing,
		gap,
		corners,
		align,
		justify,
		outline,
		overflow,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
		children,
		className,
		style,
		...rest
	} = { ...defaults, ...props };

	/* CLASSES */
	const classes = makeMainClasses(props);

	/* INLINE STYLES */
	const { vars: paddingVars, styles: paddingStyles } = processLayoutPadding({
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
	});
	const inlineStyle = {
		maxWidth: width,
		...paddingVars,
		...(gap !== undefined && {
			"--juno-section-gap": typeof gap === "number" ? `${gap}px` : gap,
		}),
		...paddingStyles,
		...style,
	} as React.CSSProperties;

	return (
		<div {...rest} className={classes} data-juno-apiname="Main" style={inlineStyle}>
			{children}
		</div>
	);
}

export default Main;
Main.defaults = defaults;
Main.Wrapper = MainWrapper;

export function makeMainClasses(props: MainProps) {
	const {
		bgColor,
		direction,
		spacing,
		corners,
		align,
		justify,
		outline,
		overflow,
		className,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
	} = { ...defaults, ...props };
	const { className: bgClass } = resolveColor(bgColor, true);
	const fontColor = fontColorMap[bgColor as keyof typeof fontColorMap];
	const { className: fontColorClass } = resolveColor(fontColor, false);

	const cornerStyles = corners ? `rounded-${corners}` : "";
	const outlineStyles = outline ? "outline outline-[0.5px] outline-current/20" : "";
	const overflowStyles = overflow ? `overflow-${overflow}` : "";
	const directionStyles = direction === "column" ? "flex-col" : "flex-row";
	const alignClass = align ? `items-${align}` : "";
	const justifyClass = justify ? `justify-${justify}` : "";
	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const paddingClasses = makeTailwindPadding(p, px, py, pt, pr, pb, pl);
	const classes = [
		"flex flex-grow",
		directionStyles,
		"w-full relative transition-all duration-150",
		overflowStyles,
		outlineStyles,
		bgClass,
		fontColorClass,
		alignClass,
		justifyClass,
		cornerStyles,
		spacingClass,
		paddingClasses,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return classes;
}
