import type React from "react";

type Direction = "row" | "column";

export type AppShellContainerProps = {
	width?: string;
	direction?: Direction;
	children?: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	width: "100%" as string,
	direction: "row" as Direction,
	className: "",
	style: {} as React.CSSProperties,
};

function AppShellContainer(props: AppShellContainerProps) {
	const { width, direction, children, className, style: passedStyle, ...rest } = { ...defaults, ...props };

	const classes = makeAppShellContainerClasses({ className, direction, width });

	return (
		<div {...rest} className={classes} style={{ ...passedStyle, maxWidth: width }}>
			{children}
		</div>
	);
}

export default AppShellContainer;

export function makeAppShellContainerClasses(props: Pick<AppShellContainerProps, "className" | "direction" | "width">) {
	const { className, width, direction } = { ...defaults, ...props };
	const tailwindWidth = width ? "max-w-[" + width + "]" : "";
	const directionClass = direction === "column" ? "flex-col" : "flex-row";

	const composed = [
		"relative flex w-full items-stretch flex-grow mx-auto min-h-full overflow-auto",
		directionClass,
		tailwindWidth,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return composed;
}
