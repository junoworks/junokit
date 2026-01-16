import type { Gap } from "../../base/containers/types";
import { makeTailwindNumericalValue, makeTailwindPadding } from "../../base/containers/utils";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../utils/spacing";
import type { SpacingPreset } from "../shared/layout";

export type SidebarProps = {
	bgColor?: ExtendedColor;
	width?: string;
	spacing?: SpacingPreset;
	gap?: Gap;
	as?: "nav" | "div" | "aside";
	children?: React.ReactNode;
	className?: string;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	width: "256px" as const,
	spacing: "sm" as SpacingPreset,
	gap: undefined,
	as: "aside" as const,
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

function Sidebar(props: SidebarProps) {
	const {
		bgColor,
		gap,
		width,
		spacing,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,

		as,
		className,
		style,
		children,
		...rest
	} = { ...defaults, ...props };

	/* CLASSES */
	const classes = makeSidebarClasses(props);

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
		width: width,
		...style,
	} as React.CSSProperties;

	const Component = as || "aside";
	return (
		<Component {...rest} className={classes} style={inlineStyle}>
			{children}
		</Component>
	);
}

export default Sidebar;

Sidebar.defaults = defaults;

export function makeSidebarClasses(props: SidebarProps) {
	const { bgColor, spacing, width, p, px, py, pt, pr, pb, pl, className } = {
		...defaults,
		...props,
	};

	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: bgClass } = resolveColor(bgColor, true);
	const { className: fontClass } = resolveColor(fontColor, false);

	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const widthClass = makeTailwindNumericalValue("w", width);
	const paddingClasses = makeTailwindPadding(p, px, py, pt, pr, pb, pl);

	const classes = [
		"hidden lg:flex flex-col flex-grow-0 flex-shrink-0 min-h-full",
		"overflow-auto",
		"transition-all duration-150",
		bgClass,
		fontClass,
		spacingClass,
		widthClass,
		paddingClasses,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return classes;
}
