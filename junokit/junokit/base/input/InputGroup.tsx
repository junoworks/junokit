import type { InputSize } from "./types";

type InputGroupDataProps = {
	size?: InputSize;
	labelPosition?: "top" | "left";
	hasLabel?: boolean;
	children: React.ReactNode;
};

type InputGroupProps = InputGroupDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof InputGroupDataProps>;

export default function InputGroup({
	size = "medium",
	labelPosition = "top",
	hasLabel,
	children,
	...rest
}: InputGroupProps) {
	const gapStyles = {
		small: "gap-0.5",
		medium: "gap-1",
		large: "gap-1.5",
	}[size ?? "medium"];

	const useGrid = hasLabel && labelPosition === "left";

	const classes = [useGrid ? "grid grid-cols-2 items-center" : "flex flex-col", "h-fit", gapStyles, rest?.className]
		.filter(Boolean)
		.join(" ")
		.trim();

	return (
		<div {...rest} className={classes}>
			{children}
		</div>
	);
}
