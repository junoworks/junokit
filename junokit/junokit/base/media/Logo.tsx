import type React from "react";

export type LogoSize =
	| "12px"
	| "16px"
	| "20px"
	| "24px"
	| "28px"
	| "36px"
	| "40px"
	| "48px"
	| "60px"
	| "96px"
	| (string & {});

type LogoProps = {
	src?: string;
	type?: "logo" | "symbol";
	size?: LogoSize;
	isInverted?: boolean;
	customWidth?: number;
	customHeight?: number;
	onClick?: () => void;
	assets?: any;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	type: "symbol" as const,
	size: "28px" as const,
	isInverted: null,
	customWidth: null,
	customHeight: null,
	className: "",
	style: {} as React.CSSProperties,
};

/* TODO needs auto swap for inverted logo when dark mode is enabled */

function Logo(props: LogoProps) {
	const {
		src, // you can force a specific logo, by default it will public/brand/ assets
		type,
		size,
		customWidth,
		customHeight,
		isInverted,
		onClick,
		className,
		style,
		...divProps
	} = { ...defaults, ...props };

	const useInverted = isInverted !== undefined && isInverted !== null ? isInverted : false;

	const imageMap = {
		logo: "var(--logo)",
		logo_inverted: "var(--logo-inverted)",
		symbol: "var(--symbol)",
		symbol_inverted: "var(--symbol-inverted)",
	};

	const imageMapKey = useInverted ? `${type}_inverted` : type;

	const imageUrl = src ? `url("${src}")` : imageMap[imageMapKey as keyof typeof imageMap];
	const classes = `flex-shrink-0 ${className}`;

	const wrapperInlineStyles: React.CSSProperties = {
		width: customWidth ? `${customWidth}px` : type === "symbol" ? size : "auto",
		height: customHeight ? `${customHeight}px` : size,
		backgroundImage: imageUrl,
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		aspectRatio: type === "logo" ? "3 / 1" : "1 / 1",
		...style,
	};

	return <div {...divProps} className={classes} onClick={onClick} style={wrapperInlineStyles}></div>;
}

export default Logo;

Logo.defaults = defaults;
