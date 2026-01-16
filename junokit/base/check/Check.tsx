export type CheckSize = "small" | "medium" | "large" | undefined;
export type CheckColor = "primary" | "accent" | "error" | "success" | "warning" | "info" | undefined;
export type CheckVariant = "solid" | "light" | "soft" | undefined;

export type CheckProps = {
	size?: CheckSize;
	color?: CheckColor;
	variant?: CheckVariant;
	checked?: boolean | undefined;
	indeterminate?: boolean | undefined;
	className?: string | undefined;
	children?: React.ReactNode;
};

export const defaults = {
	variant: "solid" as CheckVariant,
};

function Check(props: CheckProps) {
	const { size, color, variant, checked, indeterminate, className, children, ...rest } = { ...defaults, ...props };

	const sizeClass =
		size === "small" ? "juno-check-sm" : size === "large" ? "juno-check-lg" : size === "medium" ? "juno-check-md" : "";
	const colorClass = color ? `juno-check-${color}` : "";
	const variantClass = `juno-check-${variant}`;
	const stateClass = checked ? "juno-check-checked" : "";

	const visualClasses = ["juno-check", variantClass, sizeClass, colorClass, stateClass].filter(Boolean).join(" ");

	const wrapperClasses = ["juno-check-wrapper", className].filter(Boolean).join(" ");
	const fillColor = {
		solid: "var(--base-0)",
		light: `var(--${color})`,
		soft: `var(--${color})`,
	}[variant ?? "solid"] as string;

	return (
		<span {...rest} className={wrapperClasses}>
			{children}
			<span className={visualClasses}>
				{checked ? (
					!indeterminate ? (
						<svg className="juno-check-icon" viewBox="0 0 20 20" aria-hidden="true" fill={fillColor}>
							<path
								fillRule="evenodd"
								d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg className="juno-check-icon" viewBox="0 0 20 20" aria-hidden="true" fill={fillColor}>
							<rect x="4" y="9" width="12" height="2" />
						</svg>
					)
				) : null}
			</span>
		</span>
	);
}

export default Check;

Check.defaults = defaults;
