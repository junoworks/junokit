import type { RadioColor, RadioSize, RadioVariant } from "./types";

export type RadioProps = {
	size?: RadioSize;
	color?: RadioColor;
	variant?: RadioVariant;
	checked?: boolean;
	className?: string;
	children?: React.ReactNode;
};

export const defaults = {
	variant: "solid" as RadioVariant,
};

function Radio(props: RadioProps) {
	const { size, color, variant, checked, className, children, ...rest } = { ...defaults, ...props };

	const sizeClass =
		size === "small" ? "juno-radio-sm" : size === "large" ? "juno-radio-lg" : size === "medium" ? "juno-radio-md" : "";
	const colorClass = color ? `juno-radio-${color}` : "";
	const variantClass = `juno-radio-${variant}`;
	const stateClass = checked ? "juno-radio-checked" : "";

	const visualClasses = ["juno-radio", variantClass, sizeClass, colorClass, stateClass].filter(Boolean).join(" ");

	const wrapperClasses = ["juno-radio-wrapper", className].filter(Boolean).join(" ");

	return (
		<span {...rest} className={wrapperClasses}>
			{children}
			<span className={visualClasses}>
				<span className="juno-radio-dot" />
			</span>
		</span>
	);
}

export default Radio;
Radio.defaults = defaults;
