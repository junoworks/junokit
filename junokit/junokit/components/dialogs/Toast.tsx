import { XMark } from "../../icons";

type ToastProps = {
	content?: string;
	color?: "error" | "warning" | "success" | "info";
	position?: "bottom_right" | "top_right";
	onClose?: () => void;

	children?: React.ReactNode;
	className?: string;
	innerProps?: React.HTMLAttributes<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	content: "",
	color: undefined,
	onClose: undefined,
	children: undefined,
	position: "bottom_right" as const,
	className: "",
	innerProps: {} as React.HTMLAttributes<HTMLDivElement>,
	style: {} as React.CSSProperties,
};

function Toast(props: ToastProps) {
	const { content, color, position, className, innerProps, style, children, onClose, ...outerProps } = {
		...defaults,
		...props,
	};

	// CONTAINER STYLES
	const alertStyles = "flex flex-row items-start justify-between font-normal transition duration-100";

	const outlineColor = !color ? "current/20" : color;
	const alertOutlineStyles = `ring-[0.5px] ring-${outlineColor}`;

	const typeStyles = !color
		? `bg-base-0 text-base-content ${alertOutlineStyles} ring-${color}`
		: `bg-${color}-surface text-${color}-content ${alertOutlineStyles} ring-${color}`;

	const classes = `w-full flex flex-row relative text-base
    px-3 py-2 rounded-md gap-2 shadow-md
    items-start justify-start mx-auto ${alertStyles} ${typeStyles}`;

	const positionMap = {
		bottom_right: { bottom: 20, right: 20 },
		top_right: { top: 20, right: 20 },
	};

	return (
		<div
			{...outerProps}
			className={`!absolute flex flex-col ${className || ""}`}
			style={{
				...positionMap[position],
				maxWidth: 320,
				width: "100%",
				whiteSpace: "normal",
				wordBreak: "break-word",
				...style,
			}}
		>
			<div
				{...innerProps}
				className={`${classes} ${innerProps?.className || ""}`}
				style={{ ...innerProps?.style } as React.CSSProperties}
			>
				<div className="flex flex-col gap-2 flex-grow-1 w-full items-start">
					{content}
					{children}
				</div>
				<XMark
					className="flex-shrink-0 -mr-1 mt-0.5 hover:scale-110 cursor-pointer transition-all"
					size="20px"
					onClick={onClose}
				/>
			</div>
		</div>
	);
}

export default Toast;

Toast.defaults = defaults;
