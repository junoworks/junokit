type BadgeDataProps = {
	variant?: "light" | "solid" | "outline" | "soft";
	label?: string;
	icon?: React.ReactElement;
	color?: "current" | "primary" | "accent" | "info" | "success" | "warning" | "error";
	size?: "mini" | "small" | "medium";
	isPill?: boolean;
	alignSelf?: "auto" | "start" | "end" | "center";
	className?: string;
};

type BadgeProps = BadgeDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof BadgeDataProps>;

export const defaults = {
	variant: "light" as const,
	color: "current" as const,
	size: "small" as const,
	alignSelf: "auto" as const,
	isPill: false,
};

function Badge(props: BadgeProps) {
	const { variant, icon, label, color, size, isPill, alignSelf, className, style, ...otherProps } = {
		...defaults,
		...props,
	};

	const styleMap = {
		light:
			(color === "current" ? `bg-current/10` : `text-${color} bg-${color}-surface`) +
			" outline-[0.5px] -outline-offset-[0.5px] outline-current/30",
		solid: color === "current" ? "bg-current" : `bg-${color} text-base-0`,
		outline: `text-${color}-content outline-1 -outline-offset-1 outline-${color}`,
		soft: color === "current" ? "bg-current/10" : `bg-${color}-surface text-${color}`,
	};

	const noContent = !label || label === "";
	const sizeStyleMap = {
		mini: `text-2xs ${isPill ? "rounded-full" : "rounded-sm "} ${noContent ? "aspect-square p-0.5" : "py-0.5 px-[3px]"}`,
		small: `text-xs ${isPill ? "rounded-full" : "rounded-sm "} ${noContent ? "aspect-square p-0.5" : "py-0.5 px-[5px]"}`,
		medium: `text-sm ${isPill ? "rounded-full" : "rounded-md "} ${noContent ? "aspect-square p-[3px]" : "py-[3px] px-[7px]"}`,
	};

	const sizeStyles = sizeStyleMap[size];

	const classes = `flex w-fit h-fit font-medium items-center flex-shrink-0 justify-center leading-tight self-${alignSelf} ${sizeStyles} ${styleMap[variant]} ${className}`;

	return (
		<div {...otherProps} className={classes} style={style}>
			<span
				className={`flex flex-row gap-0.5 items-center justify-center transition-all duration-75 truncate max-w-[120px]
                ${variant === "solid" && color === "current" ? "text-base-0 mix-blend-difference" : ""}`}
			>
				{icon}
				{label}
			</span>
		</div>
	);
}

export default Badge;

Badge.defaults = defaults;
