import { useCallback, useEffect, useRef, useState } from "react";
import type { Middleware, MiddlewareState, Placement, Rect, Side, Strategy } from "./types";

type UseFloatingOptions = {
	open?: boolean;
	placement?: Placement;
	elements?: {
		reference?: Element | null;
	};
	middleware?: (Middleware | false | null | undefined)[];
	whileElementsMounted?: (reference: Element | null, floating: HTMLElement | null, update: () => void) => () => void;
};

type UseFloatingReturn = {
	x: number | null;
	y: number | null;
	strategy: Strategy;
	placement: Placement;
	refs: {
		setReference: (node: Element | null) => void;
		setFloating: (node: HTMLElement | null) => void;
	};
	update: () => void;
};

function getElementRect(element: Element | null): Rect {
	if (!element) {
		return { x: 0, y: 0, width: 0, height: 0 };
	}
	const rect = element.getBoundingClientRect();
	return {
		x: rect.left + window.scrollX,
		y: rect.top + window.scrollY,
		width: rect.width,
		height: rect.height,
	};
}

function computePosition(
	reference: Element | null,
	floating: HTMLElement | null,
	placement: Placement,
	middleware: Middleware[],
): { x: number; y: number; placement: Placement } {
	if (!reference || !floating) {
		return { x: 0, y: 0, placement };
	}

	const referenceRect = getElementRect(reference);
	const floatingRect = getElementRect(floating);

	// Calculate initial position based on placement
	const side = placement.split("-")[0] as Side;
	const alignment = placement.split("-")[1] as "start" | "end" | undefined;

	let x = 0;
	let y = 0;

	// Position based on side
	switch (side) {
		case "top":
			x = referenceRect.x;
			y = referenceRect.y - floatingRect.height;
			break;
		case "bottom":
			x = referenceRect.x;
			y = referenceRect.y + referenceRect.height;
			break;
		case "left":
			x = referenceRect.x - floatingRect.width;
			y = referenceRect.y;
			break;
		case "right":
			x = referenceRect.x + referenceRect.width;
			y = referenceRect.y;
			break;
	}

	// Adjust for alignment
	if (side === "top" || side === "bottom") {
		switch (alignment) {
			case "start":
				// x already at reference start
				break;
			case "end":
				x = referenceRect.x + referenceRect.width - floatingRect.width;
				break;
			default:
				// center
				x = referenceRect.x + (referenceRect.width - floatingRect.width) / 2;
		}
	} else {
		// left or right
		switch (alignment) {
			case "start":
				// y already at reference start
				break;
			case "end":
				y = referenceRect.y + referenceRect.height - floatingRect.height;
				break;
			default:
				// center
				y = referenceRect.y + (referenceRect.height - floatingRect.height) / 2;
		}
	}

	// Run middleware
	let currentPlacement = placement;

	for (const mw of middleware) {
		const state: MiddlewareState = {
			x,
			y,
			placement: currentPlacement,
			initialPlacement: placement,
			strategy: "absolute",
			rects: {
				reference: referenceRect,
				floating: floatingRect,
			},
			elements: {
				reference,
				floating,
			},
		};

		const result = mw.fn(state);

		if (result.x !== undefined) x = result.x;
		if (result.y !== undefined) y = result.y;

		// Handle flip middleware reset
		if (result.reset && result.data?.placement) {
			currentPlacement = result.data.placement as Placement;
			// Recalculate with new placement
			const newSide = currentPlacement.split("-")[0] as Side;
			const newAlignment = currentPlacement.split("-")[1] as "start" | "end" | undefined;

			switch (newSide) {
				case "top":
					x = referenceRect.x;
					y = referenceRect.y - floatingRect.height;
					break;
				case "bottom":
					x = referenceRect.x;
					y = referenceRect.y + referenceRect.height;
					break;
				case "left":
					x = referenceRect.x - floatingRect.width;
					y = referenceRect.y;
					break;
				case "right":
					x = referenceRect.x + referenceRect.width;
					y = referenceRect.y;
					break;
			}

			if (newSide === "top" || newSide === "bottom") {
				switch (newAlignment) {
					case "end":
						x = referenceRect.x + referenceRect.width - floatingRect.width;
						break;
					case "start":
						break;
					default:
						x = referenceRect.x + (referenceRect.width - floatingRect.width) / 2;
				}
			} else {
				switch (newAlignment) {
					case "end":
						y = referenceRect.y + referenceRect.height - floatingRect.height;
						break;
					case "start":
						break;
					default:
						y = referenceRect.y + (referenceRect.height - floatingRect.height) / 2;
				}
			}
		}
	}

	return { x, y, placement: currentPlacement };
}

export function useFloating(options: UseFloatingOptions = {}): UseFloatingReturn {
	const {
		open = true,
		placement: initialPlacement = "bottom",
		elements,
		middleware = [],
		whileElementsMounted,
	} = options;

	const [x, setX] = useState<number | null>(null);
	const [y, setY] = useState<number | null>(null);
	const [placement, setPlacement] = useState<Placement>(initialPlacement);

	const referenceRef = useRef<Element | null>(elements?.reference ?? null);
	const floatingRef = useRef<HTMLElement | null>(null);

	const setReference = useCallback((node: Element | null) => {
		referenceRef.current = node;
	}, []);

	const setFloating = useCallback((node: HTMLElement | null) => {
		floatingRef.current = node;
	}, []);

	const update = useCallback(() => {
		const filteredMiddleware = middleware.filter((m): m is Middleware => Boolean(m));
		const result = computePosition(referenceRef.current, floatingRef.current, initialPlacement, filteredMiddleware);
		setX(result.x);
		setY(result.y);
		setPlacement(result.placement);
	}, [initialPlacement, middleware]);

	// Set up auto-update when elements are mounted
	useEffect(() => {
		if (!open || !referenceRef.current || !floatingRef.current) {
			return undefined;
		}

		// Initial position calculation
		update();

		// Set up whileElementsMounted if provided
		if (whileElementsMounted) {
			return whileElementsMounted(referenceRef.current, floatingRef.current, update);
		}
		return undefined;
	}, [open, update, whileElementsMounted]);

	// Sync with elements prop
	useEffect(() => {
		if (elements?.reference !== undefined) {
			referenceRef.current = elements.reference ?? null;
		}
	}, [elements?.reference]);

	return {
		x,
		y,
		strategy: "absolute",
		placement,
		refs: {
			setReference,
			setFloating,
		},
		update,
	};
}
