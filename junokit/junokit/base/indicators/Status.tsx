import { Loader } from "../../";
import { Check, XMark } from "../../icons";

export type StatusDataProps = {
	variant?: "light" | "bright" | "soft" | "flat";
	color?: "info" | "success" | "base-200" | "base-700" | "warning" | "error";
	size?: "small" | "medium";
	label?: string;
	isPill?: boolean;
	indicator?: "dot" | "check" | "spinner" | "x-mark" | React.ReactNode;
	className?: string;
};

type StatusProps = StatusDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof StatusDataProps>;

export const defaults = {
	color: "info" as const,
	size: "medium" as const,
	label: "Status" as const,
	variant: "light" as const,
};

function Status(props: StatusProps) {
	const { color, size, label, indicator, isPill, variant, className, style, ...otherProps } = { ...defaults, ...props };

	const paddingMap = {
		small: `py-1 ${isPill ? "px-1.5" : "px-1.5"}`,
		medium: `py-1 ${isPill ? "px-2" : "px-2"} text-sm max-w-[160px]`,
	};

	const sizeMap = {
		small: `gap-1.5 text-xs max-w-[120px]`,
		medium: `gap-2 text-sm max-w-[160px]`,
	};
	const cornerStyles = isPill ? "rounded-full" : size === "small" ? "rounded-sm" : "rounded-md";
	const sizeStyles = variant === "flat" ? sizeMap[size] : `${paddingMap[size]} ${sizeMap[size]}`;

	const fontColor = `text-base-content`;

	const borderMap = {
		light: indicator
			? `outline-[0.5px] -outline-offset-[0.5px] outline-current/20`
			: `outline-[0.5px] -outline-offset-[0.5px] outline-${color}/50`,
		bright: color.startsWith("base")
			? `outline-[0.5px] -outline-offset-[0.5px] outline-base-content/20`
			: `outline-[0.5px] -outline-offset-[0.5px] outline-${color}/40`,
		soft: ``,
		flat: ``,
	};
	const borderStyles = borderMap[variant];
	const bgMap = {
		light: `bg-base-0`,
		bright: color.startsWith("base") ? `bg-${color}/30 text-base-content` : `bg-${color}-surface text-${color}`,
		soft: color.startsWith("base") ? `bg-${color}/20 text-base-content` : `bg-${color}/10 text-${color}`,
		flat: !indicator ? `text-${color}` : ``,
	};
	const bgStyles = bgMap[variant];

	// Tailwind Safelist
	// bg-info/20 bg-success/20 bg-base-200/20 bg-base-700/20 bg-warning/20 bg-error/20
	// bg-info/10 bg-success/10 bg-base-200/10 bg-base-700/10 bg-warning/10 bg-error/10

	const classes = `${borderStyles} ${fontColor} ${sizeStyles} ${bgStyles} w-fit flex flex-row items-center font-medium justify-start leading-tight flex-shrink-0 flex-grow-0 whitespace-nowrap ${cornerStyles} ${className}`;

	const circleSize = size === "small" ? 6 : 8;
	const ringStyles = size === "small" ? "ring-1" : "ring-[2px]";

	// ring-info/50 ring-success/50 ring-base-200/50 ring-base-700/50 ring-warning/50 ring-error/50

	const renderDot = () => {
		return (
			<div
				className={`flex-shrink-0 rounded-full bg-${color} ${ringStyles} ring-${color}/50`}
				style={{
					width: circleSize,
					height: circleSize,
				}}
			/>
		);
	};
	const indicatorSize = {
		small: "w-2.5 h-2.5",
		medium: "w-3 h-3",
	};
	const renderCheck = () => {
		return <Check className={`${indicatorSize[size]} stroke-[3px] text-${color}`} />;
	};

	const renderXMark = () => {
		return <XMark className={`${indicatorSize[size]} stroke-[3px] text-${color}`} />;
	};
	const renderSpinner = () => {
		const sizeMap = {
			small: "8px",
			medium: "12px",
		};
		return (
			<Loader
				color={color}
				variant={"spin"}
				size={sizeMap[size] as "8px" | "12px" | "16px" | "20px" | "24px" | "28px"}
			/>
		);
	};

	return (
		<div {...otherProps} className={classes} style={style}>
			{/* Status Indicator */}
			{indicator && (
				<div className={`flex flex-shrink-0 ${indicatorSize[size]} justify-center items-center`}>
					{indicator === "dot" && renderDot()}
					{indicator === "check" && renderCheck()}
					{indicator === "spinner" && renderSpinner()}
					{indicator === "x-mark" && renderXMark()}
				</div>
			)}

			{/* Text */}
			<span className="truncate">{label}</span>
		</div>
	);
}

export default Status;
Status.defaults = defaults;
