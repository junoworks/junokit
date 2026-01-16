import { allFlags } from "../../assets/flags/flags";
import * as Flags from "../../assets/flags/index";

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "height">;

type FlagProps = DivProps & {
	country: string;
	corners: "none" | "sm" | "base" | "md" | "lg" | "full";
	aspectRatio: "1By1" | "4By3";
	height: "12px" | "16px" | "20px" | "24px" | "28px" | "32px";
	className?: string;
};

export const defaults = {
	country: "United States of America" as const,
	corners: "none" as const,
	aspectRatio: "4By3" as const,
	height: "16px" as const,
	className: "",
	style: {} as React.CSSProperties,
};

function Flag(props: FlagProps) {
	const { country, corners, aspectRatio, height, className, style, ...divProps } = { ...defaults, ...props };

	const cornersStyle = corners ? `rounded-${corners}` : "";
	const classes = `flex-shrink-0 flex-grow-0 ${cornersStyle} ${className}`;

	// Find correct flag SVG
	const flag = allFlags.find((f) => f.name === country);
	const aspectSuffix = aspectRatio === "1By1" ? "1By1" : "4By3";
	const flagCodeCamel = flag?.code;
	const flagKey = flagCodeCamel ? (`${flagCodeCamel}${aspectSuffix}` as keyof typeof Flags) : undefined;
	const flagSvg = flagKey ? Flags[flagKey] : undefined;

	const imageStyles = {
		backgroundImage: flagSvg ? `url("${flagSvg}")` : undefined,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: height,
		width: aspectRatio === "1By1" ? height : `${parseInt(height, 10) * (4 / 3)}px`,
		...style,
	};

	return <div {...divProps} className={classes} style={imageStyles} />;
}

export default Flag;

Flag.defaults = defaults;
