import type React from "react";
import { type ExtendedColor, resolveColor } from "../../../utils/colors";
import { type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";

export type HeaderWrapperProps = {
	children?: React.ReactNode;
	bgColor?: ExtendedColor;
	outline?: boolean;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export function makeHeaderWrapperClasses(props: HeaderWrapperProps) {
	const { bgColor, outline, className } = props;

	const { className: bgClass } = resolveColor(bgColor, true);
	const outlineStyles = outline ? "border-b border-current/10" : "";

	const outerClasses = [
		"flex flex-col w-full z-10 items-center flex-shrink-0 relative",
		"transition-all duration-150",
		bgClass,
		outlineStyles,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return outerClasses;
}

function HeaderWrapper(props: HeaderWrapperProps) {
	const { p, px, py, pt, pr, pb, pl, bgColor, outline, className, children, style, ...rest } = props;

	const outerClasses = makeHeaderWrapperClasses(props);

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

export default HeaderWrapper;
