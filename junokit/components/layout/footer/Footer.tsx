import type { Gap } from "../types";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";
import type { SpacingPreset } from "../types";
import "../layout.css";
import { makeTailwindMinHeight } from "../utils";
import FooterWrapper from "./FooterWrapper";

export type FooterProps = {
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
	align: "stretch" as const,
	justify: "between" as const,
	minHeight: 120,
	gap: undefined as Gap,
	className: "",
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

export function makeFooterClasses(props: FooterProps) {
	const { spacing, align, justify, minHeight, className } = {
		...defaults,
		...props,
	};

	const alignClass = `items-${align}`;
	const justifyClass = `justify-${justify}`;
	const spacingClass = spacing ? `juno-spacing-${spacing}` : "";
	const minHeightClass = makeTailwindMinHeight(minHeight);

	const classes = [
		"flex flex-col",
		"w-full relative border-box",
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

function Footer(props: FooterProps) {
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

	const innerClasses = makeFooterClasses(props);

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
		<div {...rest} className={innerClasses} data-juno-apiname="Footer" style={inlineStyle}>
			{children}
		</div>
	);
}

export default Footer;
Footer.defaults = defaults;
Footer.Wrapper = FooterWrapper;
