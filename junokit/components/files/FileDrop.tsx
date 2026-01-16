import { forwardRef, useEffect, useId, useRef, useState } from "react";
import InputLabel from "../../base/input/InputLabel";
import FileTag from "./FileTag";
import type { Accept } from "./types";

type FileUploadDataProps = {
	variant?: "light" | "solid";
	size?: "small" | "medium" | "large";
	width?: "fit" | "full";
	color?: "primary" | "accent" | "current";
	label?: string;
	maxFiles?: number;
	showFileList?: boolean;
	files?: File[];
	onChange?: (files: File[]) => void;
	accept?: Accept[];
	children?: React.ReactNode;
	id?: string;
	className?: string;
};

type FileUploadProps = FileUploadDataProps & Omit<React.HTMLAttributes<HTMLInputElement>, keyof FileUploadDataProps>;

export const defaults = {
	variant: "light" as const,
	size: "medium" as const,
	color: "primary" as const,
	maxFiles: 1,
	showFileList: true,
	files: [] as File[],
	onChange: () => {},
	children: "",
};

const FileDrop = forwardRef<HTMLInputElement, FileUploadProps>((props, _ref) => {
	const {
		variant,
		size,
		width,
		color,
		label,
		maxFiles,
		showFileList,
		files: passedFiles,
		onChange,
		accept,
		children,
		className,
		style,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const inputId = `${rest.id || generatedId}-file-drop`;

	const multiple = maxFiles > 1;
	const [files, setFiles] = useState<File[]>(passedFiles);

	const [isDragOver, setIsDragOver] = useState(false);

	useEffect(() => {
		if (passedFiles.length > 0) {
			setFiles(passedFiles.slice(0, maxFiles));
		}
	}, [passedFiles, maxFiles]);

	useEffect(() => {
		onChange(files);
	}, [files]);

	const widthStyle = `w-${width}`;
	const sizeStyles = size === "small" ? "gap-0.5 text-xs" : size === "large" ? "gap-1.5 text-base" : "gap-1 text-sm";
	const classes = `flex flex-col items-stretch justify-start ${sizeStyles} ${widthStyle} relative ${className}`;

	const borderMap = {
		small: variant === "solid" ? "border-1" : "border-[0.5px]",
		medium: variant === "solid" ? "border-1" : "border-[1px]",
		large: variant === "solid" ? "border-[1.5px]" : "border-[1.5px]",
	};

	const borderSize = borderMap[size || "medium"];
	const dropAreaSizeClasses = {
		small: "p-2 gap-0.5",
		medium: "p-4 gap-1",
		large: "p-6 gap-1.5",
	}[size || "medium"];

	const cornerStyles = {
		small: "rounded-sm",
		medium: "rounded-md",
		large: "rounded-lg",
	}[size || "medium"];

	const backgroundColor =
		color === "current"
			? variant === "solid"
				? "bg-base-0 hover:bg-base-100"
				: "bg-current/2 hover:bg-current/6"
			: variant === "solid"
				? isDragOver
					? "bg-base-0"
					: "bg-base-0"
				: isDragOver
					? "bg-primary/6"
					: "bg-current/2 hover:bg-primary/2";
	const textColor = variant === "solid" ? "text-current" : "";

	const borderStyle = isDragOver ? `border-dashed` : ``;
	const borderColor = isDragOver
		? color === "current"
			? "border-current"
			: `border-${color}`
		: color === "current"
			? `border-current/20 hover:border-current/30`
			: `border-current/20 hover:border-${color}`;
	// hover:border-primary hover:border-accent

	const outlineColor = isDragOver
		? `outline-[2px] outline-${color}/20`
		: `outline-[2px] outline-transparent hover:outline-${color}/20`;
	// hover:outline-primary/20 hover:outline-accent/20 hover:outline-primary/30 hover:outline-accent/30

	const dropAreaClasses = `w-full h-full relative flex flex-col items-center justify-center
    group/fileUpload transition-all duration-150 ${dropAreaSizeClasses} ${cornerStyles}
    ${borderSize} ${borderStyle} ${borderColor} ${backgroundColor} ${textColor} ${outlineColor}`;

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(false);
	};

	const mimes = accept ? accept.map((a) => a) : [];
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(false);
		let newFiles = Array.from(event.dataTransfer.files);
		if (accept) {
			newFiles = newFiles.filter((file) => {
				return mimes.includes(file.type);
			});
		}

		if (newFiles.length > 0) {
			if (multiple) {
				setFiles((prevFiles) => {
					const combinedFiles = [...prevFiles, ...newFiles];
					return combinedFiles.slice(0, maxFiles);
				});
			} else {
				const firstFile = newFiles[0];
				if (firstFile) {
					setFiles([firstFile]);
				}
			}
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(event.target.files || []);
		if (multiple) {
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		} else {
			setFiles(newFiles);
		}
	};

	const minWidth = {
		small: "120px",
		medium: "160px",
		large: "200px",
	}[size || "medium"];

	return (
		<div {...rest} className={classes} style={style}>
			<InputLabel size={size} htmlFor={inputId}>
				{label}
			</InputLabel>
			<div className={dropAreaClasses} style={{ minWidth: minWidth }}>
				<div
					className="absolute inset-0 w-full h-full"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					data-juno-block
				>
					<input
						type="file"
						style={{
							opacity: "0",
							position: "absolute",
							width: "100%",
							height: "100%",
							cursor: "pointer",
						}}
						ref={fileInputRef}
						onChange={handleFileChange}
						accept={mimes.join(",")}
						multiple={multiple}
						data-juno-block
					/>
				</div>

				{children}
				{showFileList && files.length > 0 && (
					<FileList size={size} files={files} setFiles={setFiles} maxFiles={maxFiles} />
				)}
			</div>
		</div>
	);
});

type FileListProps = {
	size?: "small" | "medium" | "large";
	files?: File[];
	setFiles?: (files: File[]) => void;
	maxFiles?: number;
};

function FileList({ size, files, setFiles, maxFiles }: FileListProps) {
	function handleDelete(file: File) {
		if (!files || !setFiles) return;
		const newFiles = files.filter((f) => f !== file);
		setFiles(newFiles);
	}

	const topMargin = {
		small: "mt-2",
		medium: "mt-3",
		large: "mt-4",
	}[size || "medium"];

	const gap = {
		small: "gap-1",
		medium: "gap-1.5",
		large: "gap-2",
	}[size || "medium"];

	const hasFiles = files && files.length > 0;
	const rerenderCount = useRef(0);
	rerenderCount.current++;

	return (
		<div className={`flex flex-wrap w-full ${maxFiles === 1 ? "justify-center" : "justify-start"} ${gap} ${topMargin}`}>
			{hasFiles &&
				files.map((file) => (
					<FileTag
						key={file.name}
						size={size === "large" ? "medium" : "small"}
						file={file}
						onDelete={() => handleDelete(file)}
					/>
				))}
		</div>
	);
}

const FileDropWithDefinitions = FileDrop as typeof FileDrop & {
	defaults: Record<string, unknown>;
};

export default FileDropWithDefinitions;
FileDropWithDefinitions.defaults = defaults;
