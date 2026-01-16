type AlertProps = {
	variant?: "light" | "soft" | "solid" | "outline";
	size?: "small" | "medium";
	color?: "info" | "base-0" | "error" | "warning" | "success";
	direction?: "row" | "column";
	children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "size">;

export const defaults = {
	color: undefined,
	size: "medium" as const,
	variant: "light" as const,
	direction: "column" as const,
};

function Alert(props: AlertProps) {
	const { color, size, direction, variant, children, className, style, ...otherProps } = {
		...defaults,
		...props,
	};

	const colorClass = color ? `juno-alert-${color}` : "juno-alert-inherit";
	const sizeClass = `juno-alert-${size}`;
	const variantClass = `juno-alert-${variant}`;
	const directionClass = `juno-alert-${direction}`;

	const classes = ["juno-alert", colorClass, sizeClass, variantClass, directionClass, className]
		.filter(Boolean)
		.join(" ");

	return (
		<div {...otherProps} className={classes} style={style}>
			{children}
		</div>
	);
}

export default Alert;

Alert.defaults = defaults;
