type ProgressCircleDataProps = {
	label?: string;
	circleRadius?: "32px" | "48px" | "60px" | "80px";
	color?: "base-300" | "primary" | "accent" | "info" | "success" | "warning" | "error";
	value?: number;
	showProgressValue?: boolean;
	type?: "full" | "semi";
	className?: string;
};

type ProgressCircleProps = ProgressCircleDataProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, keyof ProgressCircleDataProps>;

export const defaults = {
	label: undefined,
	circleRadius: "48px" as const,
	color: "info" as const,
	value: undefined,
	showProgressValue: true,
	type: "full" as const,
};

function ProgressCircle(props: ProgressCircleProps) {
	const { label, circleRadius, color, value, showProgressValue, type, className, style, ...rest } = {
		...defaults,
		...props,
	};

	// If type is 'semi', render ProgressSemiCircle instead
	if (type === "semi") {
		return (
			<ProgressSemiCircle
				{...(label !== undefined ? { label } : {})}
				circleRadius={circleRadius}
				color={color}
				{...(value !== undefined ? { value } : {})}
				showProgressValue={showProgressValue}
				{...(className !== undefined ? { className } : {})}
				{...(style !== undefined ? { style } : {})}
				{...rest}
			/>
		);
	}

	const noLabel = !label || label === "";
	const radius = parseInt(circleRadius, 10);
	const strokeWidth =
		{
			"32px": 8,
			"48px": 10,
			"60px": 12,
			"80px": 14,
		}[circleRadius] || 10;

	const normalizedRadius = radius - strokeWidth / 2;
	const circumference = normalizedRadius * 2 * Math.PI;

	const strokeDashoffset = circumference - ((value || 0) / 100) * circumference;

	const fontSizeMap = {
		"32px": "text-lg",
		"48px": "text-xl",
		"60px": "text-2xl",
		"80px": "text-3xl",
	};
	const labelFontSizeMap = {
		"32px": "text-sm",
		"48px": "text-sm",
		"60px": "text-base",
		"80px": "text-base",
	};

	const classes = `flex flex-col items-center gap-1 ${className}`;

	return (
		<div {...rest} className={classes} style={style}>
			{/* Circle */}
			<div style={{ position: "relative", width: radius * 2, height: radius * 2 }}>
				<svg height={radius * 2} width={radius * 2} style={{ transform: "rotate(-90deg)" }}>
					{/* Background circle in light gray */}
					<circle
						stroke="currentColor"
						style={{ strokeOpacity: 0.1 }}
						fill="transparent"
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						r={normalizedRadius}
						cx={radius}
						cy={radius}
						strokeLinecap="round"
					/>
					{/* Foreground circle in blue showing the progress */}
					<circle
						stroke={`var(--${color})`}
						fill="transparent"
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						style={{
							strokeDashoffset,
							transition: "stroke-dashoffset 150ms ease-in-out",
						}}
						r={normalizedRadius}
						cx={radius}
						cy={radius}
						strokeLinecap="round"
					/>
				</svg>

				{/* LABELING */}
				<div
					className={`flex flex-col items-center justify-center max-w-full gap-1 leading-tight font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
				>
					{radius >= 60 && !noLabel ? (
						<h3
							className={`whitespace-nowrap text-center font-normal ${labelFontSizeMap[circleRadius]}
                overflow-hidden text-ellipsis
                `}
							style={{ maxWidth: radius * 1.2 }}
						>
							{label}
						</h3>
					) : null}
					{showProgressValue && <span className={`${fontSizeMap[circleRadius]}`}>{value || 0}</span>}
				</div>
			</div>
			{radius < 60 && !noLabel ? (
				<h3 className={`whitespace-nowrap font-normal ${labelFontSizeMap[circleRadius]}`}>{label}</h3>
			) : null}
		</div>
	);
}

export default ProgressCircle;

ProgressCircle.defaults = defaults;

function ProgressSemiCircle(props: ProgressCircleProps) {
	const { label, circleRadius, color, value, showProgressValue, className, style, ...rest } = {
		...defaults,
		...props,
	};

	const radius = parseInt(circleRadius, 10);
	const strokeWidth =
		{
			"32px": 8,
			"48px": 10,
			"60px": 12,
			"80px": 14,
		}[circleRadius] || 10;

	const normalizedRadius = radius - strokeWidth / 2;
	const circumference = normalizedRadius * Math.PI;

	const progressValue = value || 0;

	const fontSizeMap = {
		"32px": "text-base",
		"48px": "text-lg",
		"60px": "text-xl",
		"80px": "text-2xl",
	};
	const labelFontSizeMap = {
		"32px": "text-sm",
		"48px": "text-sm",
		"60px": "text-sm",
		"80px": "text-base",
	};

	const classes = `flex flex-col items-center gap-1 ${className}`;

	return (
		<div {...rest} className={classes} style={style}>
			<div
				style={{
					position: "relative",
					width: radius * 2,
					height: radius + strokeWidth / 2,
					overflow: "hidden",
				}}
			>
				{/* Semicircle */}
				<svg height={radius * 2} width={radius * 2} style={{ transform: "rotate(180deg)" }}>
					<circle
						stroke="currentColor"
						style={{ strokeOpacity: 0.1 }}
						fill="transparent"
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						r={normalizedRadius}
						cx={radius}
						cy={radius}
						strokeLinecap="round"
					/>
					<circle
						stroke={progressValue > 0 ? `var(--${color})` : "transparent"}
						fill="transparent"
						strokeWidth={strokeWidth}
						strokeDasharray={`${(progressValue / 100) * circumference} ${circumference - ((progressValue - strokeWidth) / 100) * circumference}`}
						style={{
							transition: "stroke-dasharray 150ms ease-in-out, stroke 150ms ease-in-out",
						}}
						r={normalizedRadius}
						cx={radius}
						cy={radius}
						strokeLinecap="round"
					/>
				</svg>

				{/* Label */}
				<div
					className={`flex flex-col items-center justify-center leading-tight font-semibold absolute bottom-0 left-1/2 -translate-x-1/2`}
				>
					{/* {radius >= 60 && label &&
                <h3 className={`whitespace-nowrap text-center font-normal ${labelFontSizeMap[circleRadius]}`} style={{ maxWidth: radius * 1.2 }}>
                {label}
                </h3>} */}
					{showProgressValue && <span className={`${fontSizeMap[circleRadius]}`}>{value || 0}</span>}
				</div>
			</div>
			{label ? <h3 className={`whitespace-nowrap font-normal ${labelFontSizeMap[circleRadius]}`}>{label}</h3> : null}
		</div>
	);
}
