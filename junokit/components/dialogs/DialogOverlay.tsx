import type React from "react";

export type DialogOverlayProps = {
	backdrop?: "none" | "darken" | "blur";
	children?: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const darkBackground = `color-mix(in srgb, black 16%, transparent)`;
const lightBackground = `color-mix(in srgb, black 8%, transparent)`;

export function DialogOverlay(props: DialogOverlayProps) {
	const { backdrop, children, className, style, ...rest } = props;

	// Handle backdrop styles
	const backgroundColor = {
		none: "transparent",
		darken: darkBackground,
		blur: lightBackground,
	}[backdrop ?? "blur"];

	const backdropFilter = backdrop === "blur" ? "blur(2px)" : undefined;

	const overlayClasses = [
		"!fixed top-0 left-0 flex flex-col w-full h-full",
		"z-30", // may need to adjust this
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			{...rest}
			className={overlayClasses}
			style={{
				backgroundColor,
				backdropFilter,
				WebkitBackdropFilter: backdropFilter /* For Safari compatibility */,
				pointerEvents: backdrop === "none" ? "none" : "auto",
				...style,
			}}
		>
			{children}
		</div>
	);
}
