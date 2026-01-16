import { Loader } from "../../";
import type { ButtonColor } from "../../base/button/types";
import { Add, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus } from "../../icons";

export type ButtonStateType = "default" | "disabled" | "loading" | "active";

export type DirectionalButtonProps = {
	direction?: "horizontal" | "vertical";
	color?: "base-200" | "base-700" | "current" | "primary" | "accent" | "warning" | "info" | "success" | "error";
	variant?: "filled" | "outlined" | "ghost" | "link" | "light";
	disabled?: boolean;
	loading?: boolean;
	icons?: "arrows" | "plus-minus";
	size?: "mini" | "small" | "medium" | "large";
	noPrevious?: boolean;
	noNext?: boolean;
	onPrevious?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	className?: string;
	style?: React.CSSProperties;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>, "size">;

export const defaults = {
	direction: "horizontal" as "horizontal" | "vertical",
	disabled: false,
	loading: false,
	color: "current" as ButtonColor,
	variant: "light" as "filled" | "outlined" | "ghost" | "link" | "light",
	icons: "arrows" as "arrows" | "plus-minus",
	size: "medium" as "mini" | "small" | "medium" | "large",
	alignSelf: "auto" as "auto" | "start" | "end" | "center",
	noPrevious: false,
	noNext: false,
	as: "div" as "button" | "div",
};

function DirectionalButton(props: DirectionalButtonProps) {
	const {
		direction,
		disabled,
		loading,
		color,
		variant,
		icons,
		size,
		className,
		noPrevious,
		noNext,
		onPrevious = () => {},
		onNext = () => {},
		style,
		alignSelf,
		as,
		...buttonProps
	} = { ...defaults, ...props };
	const buttonStyles = `flex flex-row items-center relative transition-all flex-shrink-0 flex-grow-0 box-border`;

	const isDisabled = disabled;
	const isLoading = loading;
	/* Filled */
	const textColor = color === "current" ? "current" : color === "base-200" ? "base-content" : "base-0";
	const statusStyles =
		isDisabled || isLoading || color === "current" ? "" : "hover:brightness-110 active:brightness-90";
	const bgStyles = color === "current" ? "bg-current" : `bg-${color}`;
	const filledStyle = `${bgStyles} text-${textColor} ${statusStyles} `;

	/* Outlined */
	const outlineStatusStyles = isDisabled || isLoading ? "" : "hover:bg-current/10 active:bg-transparent";
	const outlinedStyle = `outline-1 -outline-offset-1 outline-${color === "current" ? "current/20" : color} text-${color} ${outlineStatusStyles}`;

	const lightOutlineStyles =
		"outline-[0.5px] outline-current/20 -outline-offset-[0.5px] hover:outline-current/30 focus:!outline-current/30 focus:!outline-[0.5px] focus:!-outline-offset-[0.5px]";

	const lightColor =
		color === "current"
			? "bg-current/5"
			: color === "base-200"
				? "bg-base-100"
				: color === "base-700"
					? "bg-base-500"
					: `bg-${color}-surface`;
	const lightTextColor = color === "base-700" ? "base-0" : color === "base-200" ? "base-content" : `${color}-content`;
	const lightStatusStyles = isDisabled || isLoading ? "" : `hover:bg-${lightColor}/75`;
	const lightStyle = `text-${lightTextColor} ${lightColor}  ${lightStatusStyles} ${lightOutlineStyles}`;

	/* Ghost */
	const ghostStatusStyles = isDisabled || isLoading ? "" : `hover:bg-current/5`;
	const ghostStyle = `text-${color} ${ghostStatusStyles}`;

	/* Link */
	const linkStatusStyles = !(isDisabled || isLoading) ? `hover:underline opacity-80 hover:opacity-100` : "";
	const linkStyle = `text-${color} ${linkStatusStyles}`;

	const styleMap = {
		filled: filledStyle,
		outlined: outlinedStyle,
		ghost: ghostStyle,
		light: lightStyle,
		link: linkStyle,
	};

	const typeStyles = styleMap[variant];

	const selfAlign = `self-${alignSelf}`;
	const sizeMap = {
		mini: `h-5 w-5 text-2xs rounded-xs`,
		small: `h-7 w-7 text-xs rounded-sm`,
		medium: `h-9 w-9 text-sm rounded-md`,
		large: `w-12 h-12 text-base rounded-lg`,
	};

	const sizeStyles = sizeMap[size || "medium"];

	const classes = `flex items-center justify-center group/directionalbutton
        ${buttonStyles} ${typeStyles} ${sizeStyles} ${selfAlign} cursor-pointer
        ${isDisabled ? "opacity-50 saturate-50 cursor-not-allowed" : ""}`;

	const iconSizeMap = {
		mini: "10px",
		small: "12px",
		medium: "14px",
		large: "20px",
	};
	const iconSize = iconSizeMap[size || "medium"];

	const iconWidthMap = {
		mini: "w-2 h-2",
		small: "w-3 h-3",
		medium: "w-[14px] h-[14px]",
		large: "w-5 h-5",
	};
	const iconWidth = iconWidthMap[size || "medium"];

	const scaleClass =
		direction === "horizontal" ? "!scale-y-110 hover:!scale-y-110" : "!scale-x-110 scale-hover:!scale-x-110";
	const iconProps = {
		size: iconSize as string,
		className: `transition-all duration-75 ${iconWidth} ${scaleClass}` as string,
	};

	const loaderColor = "current";

	const dividerDirection = direction === "horizontal" ? "w-px h-full" : "w-full h-px";
	const dividerStyleMap = {
		ghost: "group-hover/directionalbutton:bg-current/20",
		light: "bg-current/20",
		outlined: `bg-${color}`,
		filled: `bg-current`,
		link: "bg-current/20",
	};
	const dividerClasses = `${dividerDirection} ${dividerStyleMap[variant]}`;

	const Component = as === "button" ? "button" : "div";
	return (
		<Component
			{...buttonProps}
			className={`${classes} ${className}`}
			style={
				{
					...style,
				} as React.CSSProperties
			}
		>
			<div
				className={`${isLoading && "invisible"} ${color === "current" && variant === "filled" ? "text-base-0 mix-blend-difference" : ""}
      flex flex-col gap-0 items-stretch justify-stretch w-full overflow-hidden h-full rounded-sm cursor-pointer relative
      ${direction === "horizontal" ? "flex-row" : "flex-col rotate-180"}
      `}
			>
				<button
					type="button"
					className={`w-full h-full flex  active:bg-current/10
        ${noPrevious ? "opacity-50" : "active:bg-current/10 hover:bg-current/5"}
        items-center justify-center
        `}
					disabled={noPrevious || disabled}
					onClick={(e) => !(noPrevious || disabled) && onPrevious?.(e)}
				>
					{icons === "arrows" ? (
						direction === "horizontal" ? (
							<ChevronLeft {...iconProps} />
						) : (
							<ChevronUp {...iconProps} />
						)
					) : (
						<Minus {...iconProps} />
					)}
				</button>
				<div className={`${dividerClasses}`} />

				<button
					type="button"
					className={`w-full h-full flex  active:bg-current/10
        ${noNext ? "opacity-50" : "active:bg-current/10 hover:bg-current/5"}
        items-center justify-center
        `}
					disabled={noNext || disabled}
					onClick={(e) => !(noNext || disabled) && onNext?.(e)}
				>
					{icons === "arrows" ? (
						direction === "horizontal" ? (
							<ChevronRight {...iconProps} />
						) : (
							<ChevronDown {...iconProps} />
						)
					) : (
						<Add {...iconProps} />
					)}
				</button>
			</div>
			{isLoading && (
				<div
					className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${color === "current" && variant === "filled" ? "text-base-0 mix-blend-difference" : ""}`}
				>
					<Loader size={size === "small" ? "12px" : "16px"} color={loaderColor} variant="spin" />
				</div>
			)}
		</Component>
	);
}

export default DirectionalButton;

DirectionalButton.defaults = defaults;
