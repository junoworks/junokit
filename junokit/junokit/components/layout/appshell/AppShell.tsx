import type React from "react";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../../utils/colors";
import type { ExtendedFontSize } from "../types";
import Container from "./AppShellContainer";

export type AppShellProps = {
	bgColor?: ExtendedColor;
	bgImage?: URL;
	fontSize?: ExtendedFontSize;
	direction?: "row" | "column";
	children?: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	bgColor: "base-0" as ExtendedColor,
	bgImage: undefined,
	fontSize: "base" as ExtendedFontSize,
	direction: "row" as const,
	className: "",
	style: {} as React.CSSProperties,
};

function AppShell(props: AppShellProps) {
	const { bgColor, bgImage, fontSize, children, className, style: passedStyle, ...rest } = { ...defaults, ...props };

	const classes = makeTailwindClasses(props);
	const style = makeInlineStyle(props, passedStyle);

	return (
		<div {...rest} className={classes} style={style}>
			{children}
		</div>
	);
}

export function makeTailwindClasses(props: AppShellProps) {
	const { bgColor, fontSize, bgImage, direction, className } = {
		...defaults,
		...props,
	};

	const { className: pageBgColor } = resolveColor(bgColor, true);
	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: fontColorValue } = resolveColor(fontColor, false);

	const tailwindSizes = ["xs", "sm", "base", "lg"] as const;
	const isTailwindSize =
		fontSize && typeof fontSize === "string" && tailwindSizes.includes(fontSize as (typeof tailwindSizes)[number]);
	const fontSizeClass = isTailwindSize ? `text-${fontSize}` : undefined;

	const bgImageClass = bgImage ? `bg-[url(${bgImage})] bg-cover bg-center bg-no-repeat` : undefined;
	const directionClass = direction === "column" ? "flex-col" : "flex-row";

	return [
		`relative flex w-full h-full max-h-full overflow-hidden`,
		directionClass,
		pageBgColor,
		fontColorValue,
		fontSizeClass,
		bgImageClass,
		className,
	]
		.filter(Boolean)
		.join(" ");
}

export function makeInlineStyle(props: AppShellProps, passedStyle?: React.CSSProperties) {
	const { bgImage, fontSize } = { ...defaults, ...props };

	const tailwindSizes = ["xs", "sm", "base", "lg"] as const;
	const isTailwindSize =
		fontSize && typeof fontSize === "string" && tailwindSizes.includes(fontSize as (typeof tailwindSizes)[number]);
	const fontSizeStyle = !isTailwindSize && fontSize ? { fontSize } : undefined;

	return {
		...passedStyle,
		backgroundColor: undefined,
		background: bgImage ? `url(${bgImage}) no-repeat center center / cover` : undefined,
		...fontSizeStyle,
	} as React.CSSProperties;
}

export default AppShell;
AppShell.defaults = defaults;
AppShell.Container = Container;
