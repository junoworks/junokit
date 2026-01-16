import type { Gap } from "../../base/containers/types";
import { makeTailwindNumericalValue, makeTailwindPadding } from "../../base/containers/utils";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../utils/spacing";
import type { SpacingPreset } from "../shared/layout";

export type SideProps = {
	bgColor?: ExtendedColor;
	width?: string;
	spacing?: SpacingPreset;
	gap?: Gap;
	as?: "aside" | "div" | "section";
	children?: React.ReactNode;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	bgColor: undefined,
	width: "256px" as const,
	spacing: "sm" as SpacingPreset,
	gap: undefined,
	as: "aside" as const,
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

function Side(props: SideProps) {
	const { bgColor, width, spacing, gap, p, px, py, pt, pr, pb, pl, children, as, className, style, ...rest } = {
		...defaults,
		...props,
	};

	/* CLASSES */
	const classes = makeSideClasses(props);

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
		width,
		...style,
	} as React.CSSProperties;

	const Component = as || "aside";
	return (
		<Component {...rest} className={classes} style={inlineStyle}>
			{children}
		</Component>
	);
}

export default Side;

Side.defaults = defaults;

export function makeSideClasses(props: SideProps) {
	const { bgColor, spacing, width, p, px, py, pt, pr, pb, pl, className } = {
		...defaults,
		...props,
	};

	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: bgClass } = resolveColor(bgColor, true);
	const { className: fontClass } = resolveColor(fontColor, false);

	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const maxWidthClass = makeTailwindNumericalValue("max-w", width);
	const paddingClasses = makeTailwindPadding(p, px, py, pt, pr, pb, pl);

	const classes = [
		"flex flex-col flex-grow-0 flex-shrink-0 z-0 h-full relative w-full",
		"transition-all duration-150",
		bgClass,
		fontClass,
		spacingClass,
		maxWidthClass,
		paddingClasses,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return classes;
}
