import { type ColorValue, resolveColor } from "../../utils/colors";
import type { Corners, StandardContainerProps } from "./types";
import { prepareGridClass } from "./utils";

export type GridAs = "div" | "label" | "form";
export type GridProps = {
	columns?: number;
	as?: GridAs;
	corners?: Corners;
	background?: ColorValue;
	color?: ColorValue;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
} & StandardContainerProps &
	React.HTMLAttributes<HTMLElement>;

export const defaults = {
	columns: 1 as const,
	corners: undefined,
	align: "stretch" as const,
	background: undefined,
	color: undefined,
	className: "",
	style: {} as React.CSSProperties,
};

function Grid(props: GridProps) {
	const {
		columns: _columns,
		align: _align,
		as,
		corners: _corners,
		background,
		color,
		className: _className,
		style,
		children,
		...rest
	} = {
		...defaults,
		...props,
	};

	const classes = prepareGridClass(props);
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

const GridWithDefaults = Grid as typeof Grid & { defaults: typeof defaults };
GridWithDefaults.defaults = defaults;

export default GridWithDefaults;
