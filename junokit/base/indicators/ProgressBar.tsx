type ProgressBarDataProps = {
	label?: string;
	color?: "base-300" | "primary" | "accent" | "info" | "success" | "warning" | "error";
	progress?: "0%" | "10%" | "20%" | "30%" | "40%" | "50%" | "60%" | "70%" | "80%" | "90%" | "100%";
	showProgress?: boolean;
	barHeight?: "8px" | "12px" | "16px" | "20px" | "24px" | "28px" | "32px";
	corners?: "xs" | "sm" | "md" | "lg" | "full";
	className?: string;
};

type ProgressBarProps = ProgressBarDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ProgressBarDataProps>;

export const defaults = {
	color: "info" as const,
	progress: "50%" as const,
	showProgress: false,
	corners: "sm" as const,
	barHeight: "16px" as const,
};

function ProgressBar(props: ProgressBarProps) {
	const { label, color, progress, showProgress, corners, barHeight, className, style, ...rest } = {
		...defaults,
		...props,
	};

	const noLabel = !label || label === "";

	const classes = `flex flex-col w-full items-start justify-start whitespace-nowrap text-inherit ${className}`;
	const truncateStyle = {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	};

	return (
		<div {...rest} className={classes} style={style}>
			{label && (
				<div className="flex flex-row items-center justify-between w-full mb-1">
					<span style={truncateStyle} className="font-semibold">
						{label}
					</span>
					<div className="flex-shrink-0 leading-none">{progress}</div>
				</div>
			)}
			<div className="flex flex-row gap-2 w-full items-center">
				<div className={`relative flex-grow w-full rounded-${corners}`}>
					<div className={`rounded-${corners} w-full h-full bg-current/5`} style={{ height: barHeight }} />
					<div
						className={`absolute top-0 left-0 rounded-${corners} bg-${color}`}
						style={{ width: progress, height: barHeight }}
					/>
				</div>
				{showProgress && noLabel && <div className="flex-shrink-0 leading-none">{progress}</div>}
			</div>
		</div>
	);
}

export default ProgressBar;

ProgressBar.defaults = defaults;
