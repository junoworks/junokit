import { fontColorMap } from "../../utils/colors";
import type { AvatarColor, AvatarOutline } from "./types";

export type AvatarSize = string | number;

type AdjustedDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "width" | "height">;

export type AvatarProps = AdjustedDivProps & {
	src?: string;
	children?: React.ReactNode;

	size?: AvatarSize;
	color?: AvatarColor;
	radius?: "sm" | "md" | "lg" | "xl" | "full";
	outline?: AvatarOutline;

	topRightSlot?: React.ReactNode;
	bottomRightSlot?: React.ReactNode;
};

export const defaults = {
	color: "primary" as const,
	size: undefined as AvatarSize | undefined,
	radius: undefined as string | undefined,
	style: {} as React.CSSProperties,
};

function Avatar(props: AvatarProps) {
	const {
		color,
		size,
		src,
		children,
		radius,
		outline,
		topRightSlot,
		bottomRightSlot,
		className,

		...rest
	} = { ...defaults, ...props };

	const cornerStyles = radius ? "" : "rounded-full";
	const bgStyles = `bg-${color}`;
	const fontColor =
		color && color in fontColorMap ? `text-${fontColorMap[color as keyof typeof fontColorMap]}` : "text-base-content";

	const classes = `juno-avatar relative flex-shrink-0 flex flex-row items-center justify-center font-medium select-none
    transition-all duration-75 relative group
    ${fontColor} ${cornerStyles} ${bgStyles} ${className}`;

	const styles = {
		...(size != null ? { "--avatar-size": typeof size === "number" ? `${size}px` : size } : {}),
		...(radius ? { borderRadius: "var(--border-radius-" + radius + ")" } : {}),
		...(src
			? {
					backgroundImage: `url(${src})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}
			: {}),
		...(src && color ? { "--avatar-color": `var(--${color})` } : {}),
		...rest.style,
	} as React.CSSProperties;

	const isCircle = !radius || radius === "full";
	const dataAttrs = {
		...(outline ? { "data-outline": outline } : {}),
		...(src ? { "data-has-image": "" } : {}),
		...(isCircle ? { "data-circle": "" } : {}),
	};

	return (
		<div {...rest} {...dataAttrs} className={classes} style={styles}>
			{children}

			{/* Slot positioning */}
			{topRightSlot && <div className="juno-avatar-slot-top-right">{topRightSlot}</div>}
			{bottomRightSlot && <div className="juno-avatar-slot-bottom-right">{bottomRightSlot}</div>}
		</div>
	);
}

export default Avatar;

Avatar.defaults = defaults;
