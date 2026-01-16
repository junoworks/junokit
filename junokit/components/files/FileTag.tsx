import { Badge, Loader, Tag } from "../../base";
import type { TagColor } from "../../base/tag/Tag";

type FileTagDataProps = {
	size?: "small" | "medium";
	label?: string;
	extension?: string;
	loading?: boolean;
	maxWidth?: number | string;
	deleteIcon?: React.ReactNode;
	file?: File;
	color?: TagColor;
	onDelete?: () => void;
};

type FileTagProps = FileTagDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof FileTagDataProps>;

export const defaults = {
	size: "medium" as const,
	loading: false,
};

function FileTag(props: FileTagProps) {
	const { size, label, extension, loading, maxWidth, file, onDelete, className, ...otherProps } = {
		...defaults,
		...props,
	};

	const fileExtension = extension?.slice(0, 8)?.toUpperCase() || file?.name?.split(".").pop()?.toUpperCase();
	const isLoading = loading;
	// if (!fileExtension) return null

	const sheets = ["CSV", "XLS", "XLSX"];
	const words = ["DOC", "DOCX"];
	const adobe = ["PDF", "AI", "PSD", "SVG", "EPS", "XD"];
	const media = ["PNG", "JPG", "JPEG", "GIF", "WEBP", "MOV", "MP4", "M4V", "MP3", "M4A", "WAV", "OGG", "WEBM"];

	const fileCategory =
		fileExtension && sheets.includes(fileExtension)
			? "sheets"
			: fileExtension && words.includes(fileExtension)
				? "words"
				: fileExtension && adobe.includes(fileExtension)
					? "adobe"
					: fileExtension && media.includes(fileExtension)
						? "media"
						: "other";

	const colorMap: Record<string, TagColor> = {
		sheets: "success" as TagColor,
		words: "info" as TagColor,
		adobe: "warning" as TagColor,
		media: "info" as TagColor,
	};

	const color = colorMap[fileCategory || "other"];

	const classes = {
		small: "!h-3.5 text-2xs rounded-xs -ml-px",
		medium: "!h-4 !text-2xs",
	}[size || "medium"];

	const badgeSize = size === "medium" ? "small" : "mini";
	function renderBadge() {
		return (
			<Badge
				size={badgeSize}
				color={color as "current" | "primary" | "accent" | "info" | "success" | "warning" | "error"}
				variant={"solid"}
				label={fileExtension || ""}
				className={`${classes}`}
			/>
		);
	}

	function renderLoader() {
		const loaderSize = size === "medium" ? "16px" : "12px";
		return <Loader size={loaderSize} />;
	}

	return (
		<Tag
			variant={"solid"}
			size={size}
			color={"base-0" as TagColor}
			media={isLoading ? renderLoader() : renderBadge()}
			label={label || file?.name || ""}
			{...(onDelete !== undefined ? { onDelete } : {})}
			{...(maxWidth !== undefined ? { maxWidth } : {})}
			{...(className !== undefined ? { className } : {})}
			{...otherProps}
		/>
	);
}

export default FileTag;
FileTag.defaults = defaults;
