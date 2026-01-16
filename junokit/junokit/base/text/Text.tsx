import type { CommonTextProps } from "./types";
import { omitCommonTextProps, prepareTextClass } from "./utils";

export type TextVariant = "default";
export type TextElement = "span" | "p" | "div" | "label" | "pre";

export type TextProps = {
	variant?: TextVariant;
	as?: TextElement;
} & CommonTextProps &
	React.HTMLAttributes<HTMLElement>;

const defaults = {
	variant: "default" as const,
	as: "span" as const,
};

function Text(props: TextProps) {
	const { as, children, ...rest } = { ...defaults, ...props };

	const classes = prepareTextClass({ ...rest });
	const Tag = as || "span";

	// Use utility functions for clean separation
	const htmlAttributes = omitCommonTextProps(rest);

	return (
		<Tag {...htmlAttributes} className={`${classes} lin`}>
			{children}
		</Tag>
	);
}

export default Text;

Text.defaults = defaults;
