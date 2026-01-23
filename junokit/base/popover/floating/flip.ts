import type { Middleware, MiddlewareState, Placement, Side } from "./types";

const oppositeSide: Record<Side, Side> = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left",
};

/**
 * Flip middleware - flips placement when floating element overflows viewport.
 * Only implements the basic flip behavior used by Popover (no options).
 */
export function flip(): Middleware {
	return {
		name: "flip",
		fn(state: MiddlewareState) {
			const { placement, rects, x, y } = state;
			const side = placement.split("-")[0] as Side;
			const alignment = placement.split("-")[1] as "start" | "end" | undefined;

			const viewport = {
				width: window.innerWidth,
				height: window.innerHeight,
			};

			// Check if current placement overflows
			let shouldFlip = false;

			switch (side) {
				case "top":
					shouldFlip = y < 0;
					break;
				case "bottom":
					shouldFlip = y + rects.floating.height > viewport.height;
					break;
				case "left":
					shouldFlip = x < 0;
					break;
				case "right":
					shouldFlip = x + rects.floating.width > viewport.width;
					break;
			}

			if (!shouldFlip) {
				return {};
			}

			// Check if opposite side has enough space
			const flippedSide = oppositeSide[side];
			let hasSpaceOnFlippedSide = false;

			switch (flippedSide) {
				case "top":
					hasSpaceOnFlippedSide = rects.reference.y - rects.floating.height >= 0;
					break;
				case "bottom":
					hasSpaceOnFlippedSide = rects.reference.y + rects.reference.height + rects.floating.height <= viewport.height;
					break;
				case "left":
					hasSpaceOnFlippedSide = rects.reference.x - rects.floating.width >= 0;
					break;
				case "right":
					hasSpaceOnFlippedSide = rects.reference.x + rects.reference.width + rects.floating.width <= viewport.width;
					break;
			}

			if (!hasSpaceOnFlippedSide) {
				return {};
			}

			// Calculate new placement
			const newPlacement: Placement = alignment ? `${flippedSide}-${alignment}` : flippedSide;

			// Return reset to trigger recalculation with new placement
			return {
				reset: true,
				data: { placement: newPlacement },
			};
		},
	};
}
