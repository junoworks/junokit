type LoaderDataProps = {
	size?: "8px" | "12px" | "16px" | "20px" | "24px" | "28px" | "1em";
	variant?: "spin" | "beat" | "ping" | "type" | "dots" | "bars";
	color?:
		| "base-0"
		| "base-100"
		| "base-content"
		| "primary"
		| "accent"
		| "error"
		| "warning"
		| "success"
		| "info"
		| string;
	opacity?: number;
	pause?: boolean;
	className?: string;
};

type LoaderProps = LoaderDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof LoaderDataProps>;

type SizeKey = "8px" | "12px" | "16px" | "20px" | "24px" | "28px";

export const defaults = {
	size: "1em" as const,
	variant: "spin" as const,
	opacity: 70,
	pause: false,
};

function Loader(props: LoaderProps) {
	const { size, variant, color, opacity, className, pause, style, ...otherProps } = { ...defaults, ...props };

	const classes = `w-fit h-fit ${className}`;

	return (
		<div {...otherProps} className={classes} style={style}>
			{variant === "spin" && <Spin size={size} color={color} opacity={opacity} pause={pause} />}
			{variant === "type" && <TypingDots size={size} color={color} opacity={opacity} pause={pause} />}
			{variant === "ping" && <Ping size={size} color={color} opacity={opacity} pause={pause} />}
			{variant === "dots" && <Dots size={size} color={color} opacity={opacity} pause={pause} />}
			{variant === "beat" && <Beat size={size} color={color} opacity={opacity} pause={pause} />}
			{variant === "bars" && <Bars size={size} color={color} opacity={opacity} pause={pause} />}
		</div>
	);
}

function Spin({ size = "16px", color = "current", className = "", pause = false, opacity = 70, ...props }) {
	const borderSizeMap: Record<SizeKey, string> = {
		"8px": "border",
		"12px": "border-[1.5px]",
		"16px": "border-[2px]",
		"20px": "border-[2.5px]",
		"24px": "border-[3px]",
		"28px": "border-[4px]",
	};

	const outlineSizeMap: Record<SizeKey, string> = {
		"8px": "outline",
		"12px": "outline-[1.5px]",
		"16px": "outline-[2px]",
		"20px": "outline-[2.5px]",
		"24px": "outline-[3px]",
		"28px": "outline-[4px]",
	};

	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};

	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);
	const sizeClass = size === "1em" ? "" : sizeMap[sizeKey];
	const sizeStyle = size === "1em" ? { width: "1em", height: "1em" } : {};

	const typeClasses = `${borderSizeMap[sizeKey]} border-${color} border-r-transparent border-b-transparent border-l-transparent`;
	const animation = pause ? "animate-none rotate-45" : "animate-spin";
	const classes = `${typeClasses} ${animation} rounded-full ${sizeClass} ${className}`.trim();

	return (
		<div {...props} className={classes} style={{ opacity: opacity / 100, ...sizeStyle }}>
			<div
				className={`w-full h-full ${outlineSizeMap[sizeKey]} outline-${color} outline-${color}/20 rounded-full`}
			></div>
		</div>
	);
}

function Ping({ size = "16px", color = "current", pause = false, className = "", opacity = 70, ...props }) {
	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};
	const animation = pause ? "animate-none" : "animate-ping";
	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);

	return (
		<span
			className={`relative flex justify-center items-center ${sizeMap[sizeKey]}`}
			{...props}
			style={{ opacity: opacity / 100 }}
		>
			<span
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-1/2 w-1/2 ${animation} rounded-full bg-${color} ${pause ? "animate-none" : "animate-ping"}`}
			></span>
			<span className={`relative inline-flex h-1/2 w-1/2 rounded-full bg-${color}`}></span>
		</span>
	);
}

function TypingDots({ color = "current", size = "16px", pause = false, className = "", opacity = 70, ...props }) {
	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};

	const animation = pause ? "animate-none" : "animate-[typing-bounce_0.6s_ease-in-out_infinite]";
	const dotStyle = `w-1/4 h-1/4 bg-${color} rounded-full ${animation}`;
	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);

	return (
		<div
			className={`flex flex-row justify-between items-center ${sizeMap[sizeKey]} ${className}`}
			{...props}
			style={{ opacity: opacity / 100 }}
		>
			<div className={`${dotStyle}`}></div>
			<div className={`${dotStyle} [animation-delay:150ms]`}></div>
			<div className={`${dotStyle} [animation-delay:300ms]`}></div>
		</div>
	);
}

function Dots({ color = "current", size = "16px", pause = false, className = "", opacity = 70, ...props }) {
	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};

	const animation = pause ? "animate-none" : "animate-pulse [animation-duration:900ms]";
	const dotStyle = `w-1/4 h-1/4 bg-${color} rounded-full ${animation}`;
	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);

	return (
		<div
			className={`flex flex-row justify-between items-center ${sizeMap[sizeKey]} ${className}`}
			{...props}
			style={{ opacity: opacity / 100 }}
		>
			<div className={`${dotStyle}`}></div>
			<div className={`${dotStyle} [animation-delay:300ms]`}></div>
			<div className={`${dotStyle} [animation-delay:600ms]`}></div>
		</div>
	);
}

function Beat({ size = "16px", color = "current", opacity = 70, pause = false, className = "", ...props }) {
	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};
	const animation = pause ? "animate-none" : "animate-heartbeat";
	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);

	return (
		<span
			className={`relative flex justify-center items-center ${sizeMap[sizeKey]}`}
			{...props}
			style={{ opacity: opacity / 100 }}
		>
			<span className={`relative inline-flex h-3/4 w-3/4 rounded-full bg-${color} ${animation}`}></span>
		</span>
	);
}

function Bars({ size = "16px", color = "current", opacity = 70, pause = false, className = "", ...props }) {
	const sizeMap: Record<SizeKey, string> = {
		"8px": "size-2",
		"12px": "size-3",
		"16px": "size-4",
		"20px": "size-5",
		"24px": "size-6",
		"28px": "size-7",
	};
	const sizeKey = size === "1em" ? "16px" : (size as SizeKey);
	const barCount = 8;

	return (
		<span
			className={`relative flex justify-center items-center ${sizeMap[sizeKey]} ${className}`}
			{...props}
			style={{ opacity: opacity / 100 }}
		>
			{Array.from({ length: barCount }).map((_, i) => (
				<span
					key={i}
					className={`absolute left-1/2 top-0 w-[12%] h-[30%] bg-${color} rounded-full origin-[50%_170%]`}
					style={{
						transform: `rotate(${i * (360 / barCount)}deg)`,
						animation: pause ? "none" : `bars-fade 0.8s ease-in-out ${i * (0.8 / barCount)}s infinite`,
					}}
				/>
			))}
		</span>
	);
}

export default Loader;

Loader.defaults = defaults;