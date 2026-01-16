import type { Corners, Gap } from "../../base/containers/types";
import { type ExtendedColor, fontColorMap, resolveColor } from "../../utils/colors";
import { emptyPaddingDefaults, type LayoutPaddingProps, processLayoutPadding } from "../../utils/spacing";
import type { SpacingPreset } from "../layout/types";
import "../layout/layout.css";
import { DialogOverlay } from "./DialogOverlay";

export type ModalSizePreset = "sm" | "md" | "lg" | "xl";

const sizeToCornersMap: Record<ModalSizePreset, Corners> = {
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "xl",
};

const sizeToWidthMap: Record<ModalSizePreset, string> = {
	sm: "480px",
	md: "640px",
	lg: "960px",
	xl: "1200px",
};

const sizeToSpacingMap: Record<ModalSizePreset, SpacingPreset> = {
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "lg",
};

export type ModalProps = {
	bgColor?: ExtendedColor;
	width?: string;
	corners?: Corners;
	backdrop?: "none" | "darken" | "blur";
	size?: ModalSizePreset;
	gap?: Gap;
	outline?: boolean;
	children?: React.ReactNode;
	marginTop?: "0px" | "8px" | "12px" | "16px" | "24px" | "32px" | "48px" | "64px";
	className?: string;
	innerProps?: React.HTMLAttributes<HTMLDivElement>;
} & LayoutPaddingProps &
	React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	bgColor: "base-0" as ExtendedColor,
	width: undefined as string | undefined,
	corners: undefined as Corners | undefined,
	backdrop: "darken" as const,
	size: "md" as ModalSizePreset,
	gap: undefined as Gap,
	outline: true,
	marginTop: "48px" as const,
	className: "",
	innerProps: {} as React.HTMLAttributes<HTMLDivElement>,
	...emptyPaddingDefaults,
	style: {} as React.CSSProperties,
};

function Modal(props: ModalProps) {
	const {
		bgColor,
		width,
		corners,
		backdrop,
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
		marginTop,
		className,
		innerProps,
		style,
		...outerProps
	} = { ...defaults, ...props };

	// MODAL STYLES
	const fontColor =
		bgColor && bgColor in fontColorMap ? fontColorMap[bgColor as keyof typeof fontColorMap] : "base-content";
	const { className: bgClass } = resolveColor(bgColor, true);
	const { className: fontClass } = resolveColor(fontColor, false);

	// Use corners if provided, otherwise derive from size
	const effectiveCorners = corners ?? (size ? sizeToCornersMap[size] : undefined);
	const cornerStyles = !effectiveCorners || effectiveCorners === "none" ? "" : `md:rounded-${effectiveCorners}`;

	// Use width if provided, otherwise derive from size
	const effectiveWidth = width ?? (size ? sizeToWidthMap[size] : undefined);

	const shadowStyle =
		(typeof effectiveWidth === "string" &&
			{
				"480px": "shadow-md",
				"640px": "shadow-md",
				"780px": "shadow-lg",
				"960px": "shadow-lg",
				"1200px": "shadow-xl",
				"1440px": "shadow-xl",
			}[effectiveWidth]) ||
		"shadow-md";

	const outlineStyles = outline ? `outline-[0.5px] outline-current/20` : "";

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
		`flex flex-col h-full md:h-auto md:min-h-[120px] md:max-h-[calc(100vh_-_96px)] items-stretch justify-start mx-auto relative overflow-y-auto overflow-x-hidden`,
		"md:mt-12",
		outlineStyles,
		shadowStyle,
		bgClass,
		fontClass,
		spacingClass,
		cornerStyles,
		innerProps?.className,
	]
		.filter(Boolean)
		.join(" ");

	const inlineStyles = {
		...paddingVars,
		...gapVar,
		...paddingStyles,
		width: "100%",
		maxWidth: effectiveWidth,
		animation: "fadeInUp 100ms ease-in-out",
		...(marginTop ? { marginTop: marginTop } : {}),
		...innerProps?.style,
	} as React.CSSProperties;

	return (
		<DialogOverlay {...outerProps} backdrop={backdrop} className={className} style={style}>
			{/* Modal */}
			<div {...innerProps} className={classes} style={inlineStyles}>
				{children}
			</div>
		</DialogOverlay>
	);
}

export default Modal;

Modal.defaults = defaults;
