import { XMark } from "../../icons";

export type TagColor = "primary" | "accent" | "info" | "success" | "warning" | "error" | "base-0";

type TagDataProps = {
	label?: string;
	variant?: "light" | "solid" | "outline" | "soft";
	color?: TagColor;
	size?: "small" | "medium";
	media?: React.ReactElement;
	radius?: "none" | "xs" | "sm" | "md" | "lg" | "full";
	onDelete?: () => void;
};

type TagProps = TagDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof TagDataProps>;

export const defaults = {
	variant: "light" as const,
	color: undefined,
	size: "small" as const,
};

function Tag(props: TagProps) {
	const { label, variant, color, size, media, radius, onDelete, style, className, ...otherProps } = {
		...defaults,
		...props,
	} as TagProps;

	const hasMedia = !!media;
	const hasDelete = !!onDelete;

	const colorClass = color ? `juno-tag-${color}` : "juno-tag-inherit";
	const sizeClass = `juno-tag-${size}`;
	const variantClass = `juno-tag-${variant}`;
	const radiusClass = radius ? `juno-tag-radius-${radius}` : "";
	const mediaClass = hasMedia && size === "medium" ? "juno-tag-has-media" : "";
	const deleteClass = hasDelete && size === "medium" ? "juno-tag-has-delete" : "";

	const classes = ["juno-tag", colorClass, sizeClass, variantClass, radiusClass, mediaClass, deleteClass, className]
		.filter(Boolean)
		.join(" ");

	return (
		<div {...otherProps} className={classes} style={style}>
			{media}
			<span className="juno-tag-label">{label}</span>
			{hasDelete && <XMark className="juno-tag-delete" onClick={onDelete} />}
		</div>
	);
}

export default Tag;
Tag.defaults = defaults;
