import type { RadioSize } from "./types";

type RadioGroupDataProps = {
	size?: RadioSize;
	direction?: "row" | "column";
	children: React.ReactNode;
};

type RadioGroupProps = RadioGroupDataProps &
	Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, keyof RadioGroupDataProps>;

export default function RadioGroup({ size, direction = "column", children, className, ...rest }: RadioGroupProps) {
	const gapStyles = {
		small: "gap-2",
		medium: "gap-3",
		large: "gap-4",
	}[size ?? "medium"];

	const directionStyles = direction === "row" ? "flex-row" : "flex-col";
	const sizeClass =
		size === "small"
			? "juno-elements-small"
			: size === "large"
				? "juno-elements-large"
				: size === "medium"
					? "juno-elements-medium"
					: "";

	const classes = ["flex", directionStyles, gapStyles, sizeClass, className].filter(Boolean).join(" ");

	return (
		<fieldset {...rest} className={classes}>
			{children}
		</fieldset>
	);
}
