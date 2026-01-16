import { type ColorValue, resolveColor } from "../../utils/colors";
import type { Align, Corners, FlexDirection, Justify, StandardContainerProps } from "./types";
import { prepareFlexClass } from "./utils";

export type FlexAs = "div" | "label" | "form";
export type FlexProps = {
	direction?: FlexDirection;
	justify?: Justify;
	wrap?: boolean;
	reverse?: boolean;
	align?: Align;
	as?: FlexAs;
	corners?: Corners;
	background?: ColorValue;
	color?: ColorValue;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
} & StandardContainerProps &
	React.HTMLAttributes<HTMLElement>;

export const defaults = {
	direction: undefined,
	justify: undefined,
	wrap: undefined,
	reverse: undefined,
	corners: undefined,
	align: undefined,
	background: undefined,
	color: undefined,
	className: "",
	style: {} as React.CSSProperties,
};

function Flex(props: FlexProps) {
	const {
		direction,
		justify,
		wrap,
		reverse,
		align,
		as,
		corners,
		background,
		color,
		className,
		style,
		children,
		...rest
	} = { ...defaults, ...props };

	const classes = prepareFlexClass(props);
	const Component = as || "div";

	const inlineStyles = Object.fromEntries(
		Object.entries({
			backgroundColor: resolveColor(background, true).style.backgroundColor,
			color: resolveColor(color, false).style.color,
		}).filter(([_, v]) => !!v),
	);

	return (
		<Component {...rest} className={classes} style={{ ...inlineStyles, ...style }}>
			{children}
		</Component>
	);
}

export default Flex;

Flex.defaults = defaults;
