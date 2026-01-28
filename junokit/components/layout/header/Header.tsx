import type { Gap } from "../types";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";
import type { SpacingPreset } from "../types";
import "../layout.css";
import { makeTailwindMinHeight } from "../utils";
import HeaderWrapper from "./HeaderWrapper";

export type HeaderProps = {
	width?: string;
	spacing?: SpacingPreset;
	gap?: Gap;
	align?: string;
	justify?: string;
	minHeight?: string | number;
	children?: React.ReactNode;
	className?: string;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLElement>;

export const defaults = {
	width: "100%" as const,
	spacing: "sm" as SpacingPreset,
	align: "center" as const,
	justify: "between" as const,
	minHeight: 64,
	gap: undefined as Gap,
	className: "",
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

export function makeHeaderClasses(props: HeaderProps) {
	const { spacing, align, justify, minHeight, className } = {
		...defaults,
		...props,
	};

	const alignClass = `items-${align}`;
	const justifyClass = `justify-${justify}`;
	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const minHeightClass = makeTailwindMinHeight(minHeight);

	const classes = [
		"flex flex-row",
		"w-full relative z-10 border-box",
		alignClass,
		justifyClass,
		spacingClass,
		minHeightClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return classes;
}

function Header(props: HeaderProps) {
	const {
		width,
		spacing,
		gap,
		align,
		justify,
		minHeight,
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

	const innerClasses = makeHeaderClasses(props);

	// Process padding props
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
		minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
		...paddingVars,
		...(gap !== undefined && {
			"--juno-section-gap": typeof gap === "number" ? `${gap}px` : gap,
		}),
		...paddingStyles,
		...style,
	} as React.CSSProperties;

	return (
		<div {...rest} className={innerClasses} data-juno-apiname="Header" style={inlineStyle}>
			{children}
		</div>
	);
}

export default Header;
Header.defaults = defaults;
Header.Wrapper = HeaderWrapper;
