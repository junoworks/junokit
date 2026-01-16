import * as FintechLogos from "../../assets/fintechs/index";

const allFintechs = [
	"visa",
	"mastercard",
	"discover",
	"amex",
	"alipay",
	"code-front",
	"code",
	"diners",
	"elo",
	"generic",
	"hiper",
	"hipercard",
	"jcb",
	"maestro",
	"mir",
	"paypal",
	"unionpay",
];

type Fintech = (typeof allFintechs)[number];

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "height">;

type FintechLogoProps = DivProps & {
	company: Fintech;
	corners: "none" | "sm" | "md" | "lg" | "xl";
	variant: "mono" | "flat" | "logo";
	height: "12px" | "16px" | "20px" | "24px" | "28px" | "32px" | "40px" | "60px";
	hasOutline: boolean;
	className?: string;
};

export const defaults = {
	company: "visa" as const,
	variant: "logo" as const,
	height: "24px" as const,
	hasOutline: false,
	corners: "none" as const,
	className: "",
	style: {} as React.CSSProperties,
};

function FinTech(props: FintechLogoProps) {
	const { company, corners, variant, height, hasOutline, className, style, ...divProps } = { ...defaults, ...props };

	const logoType = variant || "logo";
	const logoKey = `${company}${logoType.charAt(0).toUpperCase() + logoType.slice(1)}` as keyof typeof FintechLogos;
	const logoSvg = FintechLogos[logoKey];

	const borderStyle = hasOutline ? "outline-[0.5px] -outline-offset-[0.5px] outline-current/20" : "";
	const cornersStyle = corners ? `rounded-${corners}` : "";
	const classes = `flex-shrink-0 flex-grow-0 ${cornersStyle} ${borderStyle} ${className}`;

	const aspect = 780 / 500;
	const heightInt: number = parseInt(height, 10);
	const width = `${Math.round(heightInt * aspect)}px`;

	const imageStyles = {
		backgroundImage: `url("${logoSvg}")`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: height,
		width: width,
		...style,
	};

	return <div {...divProps} className={classes} style={imageStyles} />;
}

export default FinTech;

FinTech.defaults = defaults;
