import type { CommonTextProps } from "./types";
import { omitCommonTextProps, prepareLinkClass } from "./utils";

export type LinkVariant = "muted" | "underlined" | "highlighted";
export type LinkElement = "a" | "span" | "div" | "label" | "button";

export type LinkProps = {
	variant?: LinkVariant;
	as?: LinkElement;
} & CommonTextProps &
	React.HTMLAttributes<HTMLElement> &
	React.AnchorHTMLAttributes<HTMLAnchorElement> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

const defaults = {
	variant: "muted" as const,
	as: "a" as const,
};

function Link(props: LinkProps) {
	const { as, children, ...rest } = { ...defaults, ...props };

	const classes = prepareLinkClass({ ...rest });
	const Tag = as || ("a" as React.ElementType);

	// Use utility functions for clean separation
	const htmlAttributes = omitCommonTextProps(rest);

	return (
		<Tag {...htmlAttributes} className={classes}>
			{children}
		</Tag>
	);
}

export default Link;

Link.defaults = defaults;
