import type { Middleware, MiddlewareState, Side } from "./types";

type ShiftOptions = {
	padding?: number;
};

/**
 * Shift middleware - shifts floating element along axis to keep it in viewport.
 * Only implements padding option (what Popover uses).
 */
export function shift(options: ShiftOptions = {}): Middleware {
	const { padding = 0 } = options;

	return {
		name: "shift",
		fn(state: MiddlewareState) {
			const { placement, rects, x, y } = state;
			const side = placement.split("-")[0] as Side;

			const viewport = {
				width: window.innerWidth,
				height: window.innerHeight,
			};

			let shiftX = 0;
			let shiftY = 0;

			// For top/bottom placement, shift horizontally
			if (side === "top" || side === "bottom") {
				const leftOverflow = padding - x;
				const rightOverflow = x + rects.floating.width - (viewport.width - padding);

				if (leftOverflow > 0) {
					shiftX = leftOverflow;
				} else if (rightOverflow > 0) {
					shiftX = -rightOverflow;
				}
			}

			// For left/right placement, shift vertically
			if (side === "left" || side === "right") {
				const topOverflow = padding - y;
				const bottomOverflow = y + rects.floating.height - (viewport.height - padding);

				if (topOverflow > 0) {
					shiftY = topOverflow;
				} else if (bottomOverflow > 0) {
					shiftY = -bottomOverflow;
				}
			}

			return {
				x: x + shiftX,
				y: y + shiftY,
			};
		},
	};
}
