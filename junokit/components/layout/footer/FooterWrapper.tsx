import type React from "react";
import { type ExtendedColor, resolveColor } from "../../../utils/colors";
import { type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";

export type FooterWrapperProps = {
	children?: React.ReactNode;
	bgColor?: ExtendedColor;
	outline?: boolean;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export function makeFooterWrapperClasses(props: FooterWrapperProps) {
	const { bgColor, outline, className } = props;

	const { className: bgClass } = resolveColor(bgColor, true);
	const outlineStyles = outline ? "border-t border-current/10" : "";

	const outerClasses = [
		"flex flex-col w-full items-center relative",
		"transition-all duration-150",
		bgClass,
		outlineStyles,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return outerClasses;
}

function FooterWrapper(props: FooterWrapperProps) {
	const { p, px, py, pt, pr, pb, pl, bgColor, outline, className, children, style, ...rest } = props;

	const outerClasses = makeFooterWrapperClasses(props);

	// INLINE
	const { styles: paddingStyles } = processLayoutPadding({
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
	});

	return (
		<div {...rest} className={outerClasses} style={{ ...paddingStyles, ...style }}>
			{children}
		</div>
	);
}

export default FooterWrapper;
