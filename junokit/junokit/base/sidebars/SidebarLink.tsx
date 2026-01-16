type SidebarLinkProps = {
	variant?: "soft" | "light";
	size?: "small" | "medium" | "large";
	color?: "primary" | "accent";
	indent?: 0 | 1 | 2;
	active?: boolean;
	disabled?: boolean;
	icon?: React.ReactElement;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	variant: "soft" as const,
	size: undefined,
	color: undefined,
	indent: undefined,
	active: false,
	disabled: false,
};

function SidebarLink(props: SidebarLinkProps) {
	const { variant, size, color, indent, active, disabled, icon, className, children, ...rest } = {
		...defaults,
		...props,
	};

	const variantClass = `juno-sidebar-link-${variant}`;
	const sizeClass = size ? `juno-sidebar-link-${size}` : "";
	const colorClass = color ? `juno-sidebar-link-${color}` : "";
	const indentClass = indent ? `juno-sidebar-link-indent-${indent}` : "";
	const activeClass = active ? "juno-sidebar-link-active" : "";
	const disabledClass = disabled ? "juno-sidebar-link-disabled" : "";

	const classes = [
		"juno-sidebar-link",
		variantClass,
		sizeClass,
		colorClass,
		indentClass,
		activeClass,
		disabledClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div {...rest} className={classes}>
			{icon && <span className="juno-sidebar-link-icon">{icon}</span>}
			<span className="juno-sidebar-link-label">{children}</span>
		</div>
	);
}

export default SidebarLink;
SidebarLink.defaults = defaults;
