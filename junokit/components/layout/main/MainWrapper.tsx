import type React from "react";	
import { makeTailwindPadding } from "../utils";
import { type LayoutPaddingProps, processLayoutPadding } from "../../../utils/spacing";

export type MainWrapperProps = {
	children?: React.ReactNode;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

function MainWrapper(props: MainWrapperProps) {
	const { p, px, py, pt, pr, pb, pl, className, children, style, ...rest } = props;

	const outerClasses = makeMainWrapperClasses(props);

	// Pass padding via inline
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

export default MainWrapper;

export function makeMainWrapperClasses(props: LayoutPaddingProps & { className?: string | undefined }) {
	const { p, px, py, pt, pr, pb, pl, className } = props;

	const tailwindPadding = makeTailwindPadding(p, px, py, pt, pr, pb, pl);
	const outerClasses = [
		"w-full flex-grow relative ",
		"flex flex-col",
		"items-center justify-start",
		"transition-all duration-150",
		tailwindPadding,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return outerClasses;
}
