import { MediaImage } from "../../icons";
import type { ColorValue } from "../../utils/colors";

type ObjectFit = "contain" | "cover" | "fill" | "none" | "scale-down";

type ImageProps = {
	src?: string;
	objectFit?: ObjectFit;
	altText?: string;
	width?: number | string;
	minWidth?: number | string;
	maxWidth?: number | string;
	height?: number | string;
	minHeight?: number | string;
	maxHeight?: number | string;
	corners?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
	background?: ColorValue;
	outline?: boolean;
	onClick?: () => void;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	src: null,
	objectFit: "cover" as const,
	width: undefined,
	minWidth: undefined,
	maxWidth: undefined,
	height: undefined,
	minHeight: undefined,
	maxHeight: undefined,
	corners: undefined,
	background: undefined,
	outline: false,
	className: "",
	style: {} as React.CSSProperties,
};

function Image(props: ImageProps) {
	const {
		src,
		objectFit,
		altText,
		background,
		width,
		height,
		minWidth,
		maxWidth,
		minHeight,
		maxHeight,
		corners,
		outline,
		onClick,
		className,
		style,
		...divProps
	} = { ...defaults, ...props };

	const noImage = !src;
	const bgClass = background ? "bg-" + background : "";
	const classes = [
		"flex-shrink-0",
		`rounded-${corners}`,
		outline && "outline-[0.5px] outline-current/15",
		bgClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const imageStyles = {
		width: width,
		height: height,
		minWidth: minWidth,
		maxWidth: maxWidth,
		minHeight: minHeight,
		maxHeight: maxHeight,
		backgroundImage: !noImage ? `url(${src})` : undefined,
		backgroundSize: objectFit,
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		...style,
	};

	return (
		<div {...divProps} className={classes} aria-label={altText} onClick={onClick} style={imageStyles}>
			{noImage && (
				<div
					className={`relative w-full h-full flex items-center justify-center oveflow-hidden flex-col gap-2 text-xs rounded-${corners}`}
					style={{
						backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
						color: "var(--primary)",
						// borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
					}}
				>
					{<MediaImage />}
				</div>
			)}
		</div>
	);
}

export default Image;

Image.defaults = defaults;
