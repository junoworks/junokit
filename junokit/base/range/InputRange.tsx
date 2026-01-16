import { useEffect, useState } from "react";

export type SliderVariant = "default" | "soft" | "solid";

type InputRangeDataProps = {
	variant?: SliderVariant;
	thumbVariant?: "dark" | "light";
	thumbSize?: "small" | "medium" | "large";
	color?: "info" | "primary" | "accent" | "success" | "current" | "warning" | "error";
	size?: "small" | "medium" | "large";
	weight?: "slim" | "normal" | "thick";
	radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
	showDataLabels?: boolean;
	defaultValue?: number;
	disabled?: boolean;
	value?: number;
	min?: number;
	max?: number;
	id?: string;
	onChange?: (value: number) => void;
	className?: string;
};

type InputRangeProps = InputRangeDataProps &
	Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"size" | "width" | "value" | "defaultValue" | "onChange" | keyof InputRangeDataProps
	>;

export const defaults = {
	variant: "default" as const,
	color: "current" as const,
	thumbVariant: "light" as const,
	thumbSize: "medium" as const,
	defaultValue: 0,
	min: 0,
	max: 100,
	radius: undefined,
	size: "medium" as const,
	disabled: false,
	weight: "normal" as const,
};

export default function InputRange(props: InputRangeProps) {
	const {
		variant,
		color,
		thumbVariant,
		thumbSize,
		value,
		defaultValue,
		min,
		max,
		radius,
		size,
		id,
		disabled,
		weight,
		onChange,
		className,
		style,
		...rest
	} = { ...defaults, ...props };

	const [sliderValue, setSliderValue] = useState(value || defaultValue);
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value);
		setSliderValue(newValue);
		onChange?.(newValue);
	};

	useEffect(() => {
		setSliderValue(value || defaultValue);
	}, [value, defaultValue]);

	const trackHeightPx = {
		small: weight === "slim" ? 3 : weight === "thick" ? 8 : 6,
		medium: weight === "slim" ? 4 : weight === "thick" ? 12 : 10,
		large: weight === "slim" ? 5 : weight === "thick" ? 16 : 14,
	}[size];

	const thumbSizePx = {
		small: { small: 6, medium: 8, large: 10 }[thumbSize],
		medium: { small: 10, medium: 12, large: 14 }[thumbSize],
		large: { small: 14, medium: 16, large: 18 }[thumbSize],
	}[size];

	const marginY = {
		small: weight === "slim" ? 2.5 : weight === "thick" ? 0 : 1,
		medium: weight === "slim" ? 4 : weight === "thick" ? 0 : 1,
		large: weight === "slim" ? 5.5 : weight === "thick" ? 0 : 1,
	}[size || "medium"];

	// [&::-webkit-slider-thumb]:ring-info [&::-webkit-slider-thumb]:ring-success  [&::-webkit-slider-thumb]:ring-warning [&::-webkit-slider-thumb]:ring-error [&::-webkit-slider-thumb]:ring-accent [&::-webkit-slider-thumb]:ring-primary [&::-webkit-slider-thumb]:ring-base-content

	const cursorStyles = disabled ? `cursor-not-allowed` : ``; //`active:cursor-ew-resize`

	const thumbStyles = makeThumbStyles({
		size,
		color,
		radius,
		variant,
		thumbVariant,
		thumbSize,
	});
	const trackRadius = radius
		? `var(--border-radius-${radius})`
		: { small: "0.125rem", medium: "0.25rem", large: "0.25rem" }[size || "medium"];

	const roundedStyles = radius
		? `rounded-${radius}`
		: {
				small: `rounded-sm`,
				medium: `rounded-md`,
				large: `rounded-lg`,
			}[size || "medium"];

	const outlineSize = {
		small: `!outline-[0.5px] !-outline-offset-[0.5px]`,
		medium: `!outline-1 !-outline-offset-1`,
		large: `!outline-1 !-outline-offset-1`,
	}[size || "medium"];

	const outlineColor = {
		default: `!outline-current/15 hover:!outline-current/20`,
		soft: `!outline-transparent hover:!outline-transparent`,
		solid: `!outline-current/20 hover:!outline-current/30`,
	}[variant || "default"];

	const inputRangeStyles = `
        ${roundedStyles}
        ${thumbStyles}
        ${outlineSize} transition-all duration-75
        ${outlineColor}
        ${cursorStyles}`.trim();

	const numericValue = parseFloat(sliderValue.toString());

	const stopHere = ((numericValue - min) / (max - min)) * 100;
	const colorVar = color;
	const backgroundStyles = {
		default: `linear-gradient(to right, color-mix(in srgb, var(--${colorVar}) 60%, transparent) 0%, color-mix(in srgb, var(--${colorVar}) 60%, transparent) ${stopHere}%, var(--base-200) ${stopHere}%, var(--base-200) 100%)`,
		soft: `linear-gradient(to right, color-mix(in srgb, var(--${colorVar}) 40%, transparent) 0%, color-mix(in srgb, var(--${colorVar}) 40%, transparent) ${stopHere}%, var(--base-200) ${stopHere}%, var(--base-200) 100%)`,
		solid: `linear-gradient(to right, var(--${colorVar}) 0%, var(--${colorVar}) ${stopHere}%, var(--base-200) ${stopHere}%, var(--base-200) 100%)`,
	}[variant || "default"];

	return (
		<input
			{...rest}
			type="range"
			className={`juno-slider ${inputRangeStyles} ${className}`}
			disabled={disabled}
			min={min}
			value={sliderValue}
			onChange={handleSliderChange}
			max={max}
			data-juno-block
			style={
				{
					...style,
					width: "100%",
					height: trackHeightPx,
					marginTop: marginY,
					marginBottom: marginY,
					"--slider-track-bg": backgroundStyles,
					"--slider-track-radius": trackRadius,
					"--slider-track-height": `${trackHeightPx}px`,
					"--slider-thumb-size": `${thumbSizePx}px`,
				} as React.CSSProperties
			}
		/>
	);
}

function makeThumbStyles({
	size,
	color,
	radius,
	variant,
	thumbVariant,
	thumbSize,
}: {
	size: "small" | "medium" | "large";
	color: "current" | "info" | "primary" | "accent" | "success" | "warning" | "error";
	radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
	variant: SliderVariant;
	thumbVariant: "dark" | "light";
	thumbSize: "small" | "medium" | "large";
}) {
	const thumbRingSize = {
		small: `[&::-webkit-slider-thumb]:ring [&:focus::-webkit-slider-thumb]:ring-[2px]`,
		medium: `[&::-webkit-slider-thumb]:ring-[1.5px] [&:focus::-webkit-slider-thumb]:ring-[2.5px]`,
		large: `[&::-webkit-slider-thumb]:ring-[2px] [&:focus::-webkit-slider-thumb]:ring-[3px]`,
	}[size || "medium"];

	const thumbRingColor = {
		default:
			color === "current" ? `[&::-webkit-slider-thumb]:ring-current/30` : `[&::-webkit-slider-thumb]:ring-${color}/50`,
		soft:
			color === "current" ? `[&::-webkit-slider-thumb]:ring-current/30` : `[&::-webkit-slider-thumb]:ring-${color}/50`,
		solid:
			color === "current" ? `[&::-webkit-slider-thumb]:ring-current/50` : `[&::-webkit-slider-thumb]:ring-${color}/50`,
	}[variant || "default"];

	const thumbBorder = {
		small: `[&::-webkit-slider-thumb]:border-[0.5px] [&::-webkit-slider-thumb]:border-${color}`,
		medium: `[&::-webkit-slider-thumb]:border-[1px] [&::-webkit-slider-thumb]:border-${color}`,
		large: `[&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-${color}`,
	}[size || "medium"];

	const thumbColor =
		thumbVariant === "dark"
			? `[&::-webkit-slider-thumb]:bg-base-content`
			: `[&::-webkit-slider-thumb]:bg-base-0 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10`;

	const thumbCorners = radius
		? `[&::-webkit-slider-thumb]:rounded-${radius}`
		: {
				small: `[&::-webkit-slider-thumb]:rounded-sm`,
				medium: `[&::-webkit-slider-thumb]:rounded-md`,
				large: `[&::-webkit-slider-thumb]:rounded-lg`,
			}[size || "medium"];

	const thumbScaleMap = {
		small: `active:[&::-webkit-slider-thumb]:scale-125`,
		medium: `active:[&::-webkit-slider-thumb]:scale-115`,
		large: `active:[&::-webkit-slider-thumb]:scale-110`,
	}[thumbSize];

	const thumbStyles = `
        ${thumbColor} ${thumbRingSize} ${thumbRingColor}
        ${thumbCorners} ${thumbBorder}
        ${thumbScaleMap}
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:shadow-sm
        transition-all duration-150 ease-in-out
    `;

	return thumbStyles;
}

InputRange.defaults = defaults;

// for tailwind
// [&::-webkit-slider-thumb]:ring-current/20 [&::-webkit-slider-thumb]:ring-info/20 [&::-webkit-slider-thumb]:ring-primary/20 [&::-webkit-slider-thumb]:ring-accent/20 [&::-webkit-slider-thumb]:ring-success/20 [&::-webkit-slider-thumb]:ring-warning/20 [&::-webkit-slider-thumb]:ring-error/20
// [&::-webkit-slider-thumb]:ring-current/50 [&::-webkit-slider-thumb]:ring-info/50 [&::-webkit-slider-thumb]:ring-primary/50 [&::-webkit-slider-thumb]:ring-accent/50 [&::-webkit-slider-thumb]:ring-success/50 [&::-webkit-slider-thumb]:ring-warning/50 [&::-webkit-slider-thumb]:ring-error/50
// [&::-webkit-slider-thumb]:ring-current [&::-webkit-slider-thumb]:ring-info [&::-webkit-slider-thumb]:ring-primary [&::-webkit-slider-thumb]:ring-accent [&::-webkit-slider-thumb]:ring-success [&::-webkit-slider-thumb]:ring-warning [&::-webkit-slider-thumb]:ring-error
// [&::-webkit-slider-thumb]:ring-info-focus [&::-webkit-slider-thumb]:ring-primary-focus [&::-webkit-slider-thumb]:ring-accent-focus [&::-webkit-slider-thumb]:ring-success-focus [&::-webkit-slider-thumb]:ring-warning-focus [&::-webkit-slider-thumb]:ring-error-focus
// [&::-webkit-slider-thumb]:ring-info-content [&::-webkit-slider-thumb]:ring-primary-content [&::-webkit-slider-thumb]:ring-accent-content [&::-webkit-slider-thumb]:ring-success-content [&::-webkit-slider-thumb]:ring-warning-content [&::-webkit-slider-thumb]:ring-error-content

// [&::-webkit-slider-thumb]:border-current/20 [&::-webkit-slider-thumb]:border-info/20 [&::-webkit-slider-thumb]:border-primary/20 [&::-webkit-slider-thumb]:border-accent/20 [&::-webkit-slider-thumb]:border-success/20 [&::-webkit-slider-thumb]:border-warning/20 [&::-webkit-slider-thumb]:border-error/20
// [&::-webkit-slider-thumb]:border-current/80 [&::-webkit-slider-thumb]:border-info/80 [&::-webkit-slider-thumb]:border-primary/80 [&::-webkit-slider-thumb]:border-accent/80 [&::-webkit-slider-thumb]:border-success/80 [&::-webkit-slider-thumb]:border-warning/80 [&::-webkit-slider-thumb]:border-error/80
// [&::-webkit-slider-thumb]:border-current [&::-webkit-slider-thumb]:border-info [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:border-success [&::-webkit-slider-thumb]:border-warning [&::-webkit-slider-thumb]:border-error
// [&::-webkit-slider-thumb]:rounded-full
