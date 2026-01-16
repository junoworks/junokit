import { forwardRef, useState } from "react";
import "./toggle.css";

export type ToggleSize = "small" | "medium" | "large";
export type ToggleColor = "primary" | "accent" | "error" | "success" | "warning" | "info";
export type ToggleVariant = "solid" | "soft" | "light";

export type ToggleProps = {
	size?: ToggleSize | undefined;
	color?: ToggleColor | undefined;
	variant?: ToggleVariant | undefined;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color" | "type">;

export const defaults = {
	size: "medium" as ToggleSize,
	variant: "solid" as ToggleVariant,
};

const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
	const { size, color, variant, checked, defaultChecked, disabled, className, ...inputProps } = {
		...defaults,
		...props,
	};

	const isControlled = checked !== undefined;
	const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
	const isChecked = isControlled ? checked : internalChecked;

	const sizeClass = size === "small" ? "juno-toggle-sm" : size === "large" ? "juno-toggle-lg" : "juno-toggle-md";
	const variantClass = `juno-toggle-${variant}`;
	const colorClass = color ? `juno-toggle-${color}` : "";
	const stateClass = isChecked ? "juno-toggle-checked" : "";

	const toggleClasses = ["juno-toggle", variantClass, sizeClass, colorClass, stateClass].filter(Boolean).join(" ");
	const wrapperClasses = ["juno-toggle-wrapper", className].filter(Boolean).join(" ");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) {
			setInternalChecked(event.target.checked);
		}
		props.onChange?.(event);
	};

	return (
		<span className={wrapperClasses}>
			<input
				ref={ref}
				{...inputProps}
				type="checkbox"
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				onChange={handleChange}
				className="juno-toggle-input"
			/>
			<span className={toggleClasses}>
				<span className="juno-toggle-knob" />
			</span>
		</span>
	);
});

Toggle.displayName = "Toggle";

export default Toggle;

(Toggle as typeof Toggle & { defaults: typeof defaults }).defaults = defaults;
