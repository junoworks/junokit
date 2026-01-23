import type { Middleware, MiddlewareState, Side } from "./types";

/**
 * Offset middleware - adds distance between reference and floating element.
 * Only implements simple numeric offset (what Popover uses).
 */
export function offset(value: number): Middleware {
	return {
		name: "offset",
		fn(state: MiddlewareState) {
			const { placement } = state;
			const side = placement.split("-")[0] as Side;

			// Apply offset based on which side the floating element is on
			switch (side) {
				case "top":
					return { y: state.y - value };
				case "bottom":
					return { y: state.y + value };
				case "left":
					return { x: state.x - value };
				case "right":
					return { x: state.x + value };
				default:
					return {};
			}
		},
	};
}
