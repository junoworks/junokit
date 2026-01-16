import type { Gap } from "../../base/containers/types";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../utils/spacing";
import type { SpacingPreset } from "../layout/types";
import "../layout/layout.css";
import { DialogOverlay } from "./DialogOverlay";

export type DrawerSizePreset = "sm" | "md" | "lg" | "xl";

const sizeToWidthMap: Record<DrawerSizePreset, string> = {
	sm: "360px",
	md: "480px",
	lg: "640px",
	xl: "780px",
};

const sizeToSpacingMap: Record<DrawerSizePreset, SpacingPreset> = {
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "lg",
};

export type DrawerProps = {
	bgColor?: ExtendedColor;
	width?: string;
	backdrop?: "none" | "darken" | "blur";
	position?: "right" | "left";
	size?: DrawerSizePreset;
	gap?: Gap;
	outline?: boolean;
	children?: React.ReactNode;
	className?: string;
	innerProps?: React.HTMLAttributes<HTMLDivElement>;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	bgColor: "base-0" as ExtendedColor,
	width: undefined as string | undefined,
	backdrop: "none" as const,
	position: "right" as const,
	size: "md" as DrawerSizePreset,
	gap: undefined as Gap,
	outline: true,
	className: "",
	innerProps: {} as React.HTMLAttributes<HTMLDivElement>,
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

function Drawer(props: DrawerProps) {
	const {
		bgColor,
		width,
		backdrop,
		position,
		size,
		gap,
		outline,
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
		children,
		className,
		innerProps,
		style,
		...outerProps
	} = { ...defaults, ...props };

	// DRAWER STYLES
	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: bgClass } = resolveColor(bgColor, true);
	const { className: fontClass } = resolveColor(fontColor, false);

	// Use width if provided, otherwise derive from size
	const effectiveWidth = width ?? (size ? sizeToWidthMap[size] : undefined);

	// Border/outline styles based on position
	const borderStyles = outline
		? position === "left"
			? "border-r-[0.5px] border-current/20"
			: "border-l-[0.5px] border-current/20"
		: "";

	// Determine if padding props are explicitly provided (to override size-based padding)
	const hasExplicitPadding =
		p !== undefined ||
		px !== undefined ||
		py !== undefined ||
		pt !== undefined ||
		pr !== undefined ||
		pb !== undefined ||
		pl !== undefined;

	// Use spacing class from size if no explicit padding props (gap can still override spacing class gap)
	const sizeSpacing = size ? sizeToSpacingMap[size] : undefined;
	const spacingClass = !hasExplicitPadding && sizeSpacing ? `juno-spacing-${sizeSpacing}` : "";

	// Process padding props (will override spacing class if provided)
	const { vars: paddingVars, styles: paddingStyles } = processLayoutPadding({
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
	});

	// Convert Gap type to CSS variable (will override spacing class if provided)
	const gapVar: Record<string, string> = {};
	if (gap !== undefined) {
		const gapValue = typeof gap === "number" ? `${gap}px` : gap;
		gapVar["--juno-section-gap"] = gapValue;
	}

	const classes = [
		"flex flex-col relative h-full w-full flex-grow-0 flex-shrink-0",
		position === "left" ? "self-start" : "self-end",
		bgClass,
		fontClass,
		borderStyles,
		spacingClass,
		innerProps?.className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<DialogOverlay
			{...outerProps}
			backdrop={backdrop}
			className={className}
			style={{
				overflowX: "auto",
				overflowY: "hidden",
				...style,
			}}
		>
			<div
				{...innerProps}
				className={classes}
				style={
					{
						...paddingVars,
						...gapVar,
						...paddingStyles,
						width: "100%",
						maxWidth: effectiveWidth,
						pointerEvents: "auto",
						...innerProps?.style,
					} as React.CSSProperties
				}
			>
				{children}
			</div>
		</DialogOverlay>
	);
}

export default Drawer;

Drawer.defaults = defaults;
