import { type ReactNode, type RefObject, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { autoUpdate, flip, offset, type Placement, shift, size as sizeMiddleware, useFloating } from "./floating";
import { PopoverContext, type PopoverSize } from "./PopoverContext";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

const OFFSET_BY_SIZE: Record<PopoverSize, number> = {
	none: 0,
	small: 2,
	medium: 4,
	large: 6,
};

const getPortalTarget = (trigger: HTMLElement | null): HTMLElement => {
	const themed = trigger?.closest("[data-theme-root]") as HTMLElement;
	if (!themed) return document.body;

	let portal = themed.querySelector(":scope > [data-portal]") as HTMLElement;
	if (!portal) {
		portal = document.createElement("div");
		portal.setAttribute("data-portal", "");
		themed.appendChild(portal);
	}
	return portal;
};

type PopoverContentProps = React.HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	side?: Side;
	align?: Align;
	sideOffset?: number;
	closeOnOutsideClick?: boolean;
	closeOnContentClick?: boolean;
	closeOnScroll?: boolean | number;
	autoFocus?: boolean;
	matchTriggerWidth?: boolean;
	maxWidth?: number | string;
	// Standalone mode props
	open?: boolean;
	onClose?: () => void;
	triggerRef?: RefObject<HTMLElement>;
	size?: PopoverSize;
};

export function PopoverContent({
	children,
	side = "bottom",
	align = "start",
	sideOffset,
	closeOnOutsideClick = true,
	closeOnContentClick = false,
	closeOnScroll = false,
	autoFocus = false,
	matchTriggerWidth = false,
	maxWidth,
	className = "",
	style,
	open: openProp,
	onClose,
	triggerRef: triggerRefProp,
	size: sizeProp,
	...rest
}: PopoverContentProps) {
	// Try context, fall back to props
	const context = useContext(PopoverContext);
	const open = context?.open ?? openProp ?? false;
	const setOpen = context?.setOpen ?? onClose ?? (() => {});
	const triggerRef = context?.triggerRef ?? triggerRefProp ?? null;
	const size = sizeProp ?? context?.size ?? "medium";

	// Use provided sideOffset or derive from size
	const resolvedOffset = sideOffset ?? OFFSET_BY_SIZE[size];

	const contentRef = useRef<HTMLDivElement | null>(null);

	// Floating UI placement
	const placement: Placement = align === "center" ? side : `${side}-${align}`;

	const { x, y, strategy, refs, update } = useFloating({
		open,
		placement,
		elements: {
			reference: triggerRef?.current ?? null,
		},
		middleware: [
			offset(resolvedOffset),
			flip(),
			shift({ padding: 8 }),
			(matchTriggerWidth || maxWidth !== undefined) &&
				sizeMiddleware({
					apply({ rects, elements }: { rects: { reference: { width: number } }; elements: { floating: HTMLElement } }) {
						const styles: Record<string, string> = {};
						if (matchTriggerWidth) {
							styles.minWidth = `${rects.reference.width}px`;
						}
						if (maxWidth) {
							if (typeof maxWidth === "string" && maxWidth.endsWith("%")) {
								const percent = parseFloat(maxWidth) / 100;
								styles.maxWidth = `${rects.reference.width * percent}px`;
							} else {
								styles.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
							}
						}
						Object.assign(elements.floating.style, styles);
					},
				}),
		].filter(Boolean),
		whileElementsMounted: autoUpdate,
	});

	// Sync trigger ref with Floating UI - useLayoutEffect runs before paint
	useLayoutEffect(() => {
		if (open && triggerRef?.current) {
			refs.setReference(triggerRef.current);
			update();
		}
	}, [open, triggerRef, refs, update]);

	// Close on outside click
	useEffect(() => {
		if (!open || !closeOnOutsideClick) return;

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			// Check if click is inside any popover content (handles nested popovers)
			const isInsideAnyPopover = target.closest("[data-popover-content]");
			if (isInsideAnyPopover) return;

			if (!triggerRef?.current?.contains(target) && !contentRef.current?.contains(target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open, closeOnOutsideClick, setOpen, triggerRef]);

	// Focus first focusable element on open
	useEffect(() => {
		if (!open || !autoFocus) return;

		const firstFocusable = contentRef.current?.querySelector<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		firstFocusable?.focus();
	}, [open, autoFocus]);

	// Close on scroll
	useEffect(() => {
		if (!open || !closeOnScroll) return;

		const threshold = typeof closeOnScroll === "number" ? closeOnScroll : 5;
		const startScrollY = window.scrollY;
		const startScrollX = window.scrollX;

		const handleScroll = () => {
			const deltaY = Math.abs(window.scrollY - startScrollY);
			const deltaX = Math.abs(window.scrollX - startScrollX);

			if (deltaY > threshold || deltaX > threshold) {
				setOpen(false);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
		return () => window.removeEventListener("scroll", handleScroll, { capture: true });
	}, [open, closeOnScroll, setOpen]);

	if (!open) return null;

	const sizeClass = `popover-${size}`;

	// Hide until position is calculated to prevent flicker
	const isPositioned = x !== null && y !== null;

	const handleContentClick = () => {
		if (closeOnContentClick) {
			setOpen(false);
		}
	};

	return createPortal(
		<div
			{...rest}
			ref={(node) => {
				contentRef.current = node;
				refs.setFloating(node);
			}}
			role="dialog"
			data-popover-content
			className={`popover-content ${sizeClass} ${className}`}
			style={{
				position: strategy,
				top: y ?? 0,
				left: x ?? 0,
				visibility: isPositioned ? "visible" : "hidden",
				...style,
			}}
			onClick={handleContentClick}
		>
			{children}
		</div>,
		getPortalTarget(triggerRef?.current ?? null),
	);
}
