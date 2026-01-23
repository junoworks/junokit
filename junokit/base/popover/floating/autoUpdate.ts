/**
 * Auto-update - sets up listeners to recalculate position when needed.
 * Returns a cleanup function.
 */
export function autoUpdate(reference: Element | null, floating: HTMLElement | null, update: () => void): () => void {
	if (!reference || !floating) {
		return () => {};
	}

	// Update on resize
	const handleResize = () => update();
	window.addEventListener("resize", handleResize);

	// Update on scroll (any scrollable ancestor)
	const handleScroll = () => update();
	window.addEventListener("scroll", handleScroll, { capture: true, passive: true });

	// Use ResizeObserver if available for more accurate updates
	let resizeObserver: ResizeObserver | null = null;
	if (typeof ResizeObserver !== "undefined") {
		resizeObserver = new ResizeObserver(() => update());
		resizeObserver.observe(reference);
		resizeObserver.observe(floating);
	}

	// Cleanup function
	return () => {
		window.removeEventListener("resize", handleResize);
		window.removeEventListener("scroll", handleScroll, { capture: true });
		resizeObserver?.disconnect();
	};
}
