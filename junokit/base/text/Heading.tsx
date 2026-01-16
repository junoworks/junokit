import type { CommonTextProps } from "./types";
import { omitCommonTextProps, prepareHeadingClass } from "./utils";

export type HeadingVariant = "hero" | "display" | "title" | "subtitle" | "overline";
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = {
	variant?: HeadingVariant;
	as?: HeadingElement;
} & CommonTextProps &
	React.HTMLAttributes<HTMLHeadingElement>;

export const defaults = {
	variant: "title" as const,
	as: "h1" as const,
};

function Heading(props: HeadingProps) {
	const { as, children, ...rest } = { ...defaults, ...props };

	const classes = prepareHeadingClass({ ...rest });
	const Tag = as || "h1";

	// Use utility functions for clean separation
	const htmlAttributes = omitCommonTextProps(rest);

	return (
		<Tag {...htmlAttributes} className={classes}>
			{children}
		</Tag>
	);
}

export default Heading;

Heading.defaults = defaults;
