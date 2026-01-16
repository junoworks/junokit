import type { KeyboardEvent, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

type UseSelectKeyboardParams<T> = {
	options: T[];
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	focusedIndex: number;
	setFocusedIndex: (index: number | ((prev: number) => number)) => void;
	onSelect: (option: T) => void;
	contentRef?: RefObject<HTMLElement>;
};

export function useSelectKeyboard<T>({
	options,
	isOpen,
	setOpen,
	focusedIndex,
	setFocusedIndex,
	onSelect,
	contentRef,
}: UseSelectKeyboardParams<T>) {
	const optionRefs = useRef<Map<number, HTMLElement>>(new Map());

	const setOptionRef = useCallback((index: number, el: HTMLElement | null) => {
		if (el) {
			optionRefs.current.set(index, el);
		} else {
			optionRefs.current.delete(index);
		}
	}, []);

	// Scroll focused option into view
	useEffect(() => {
		if (!isOpen || focusedIndex < 0) return;

		const optionEl = optionRefs.current.get(focusedIndex);
		optionEl?.scrollIntoView({ block: "nearest" });
	}, [isOpen, focusedIndex]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLElement>) => {
			// Allow Tab to pass through
			if (event.key === "Tab") {
				if (isOpen) setOpen(false);
				return;
			}

			// Prevent default for navigation keys
			if (["ArrowDown", "ArrowUp", "Enter", " ", "Escape"].includes(event.key)) {
				event.preventDefault();
			}

			switch (event.key) {
				case "ArrowDown":
					if (!isOpen) {
						setOpen(true);
						setFocusedIndex(0);
					} else {
						setFocusedIndex((prev) => (prev + 1) % options.length);
					}
					break;

				case "ArrowUp":
					if (!isOpen) {
						setOpen(true);
						setFocusedIndex(options.length - 1);
					} else {
						setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
					}
					break;

				case "Enter":
				case " ":
					if (isOpen && focusedIndex >= 0 && options[focusedIndex]) {
						onSelect(options[focusedIndex]);
						setOpen(false);
					} else if (!isOpen) {
						setOpen(true);
						setFocusedIndex(0);
					}
					break;

				case "Escape":
					if (isOpen) setOpen(false);
					break;

				case "Home":
					if (isOpen) {
						event.preventDefault();
						setFocusedIndex(0);
					}
					break;

				case "End":
					if (isOpen) {
						event.preventDefault();
						setFocusedIndex(options.length - 1);
					}
					break;
			}
		},
		[options, isOpen, setOpen, focusedIndex, setFocusedIndex, onSelect],
	);

	return {
		handleKeyDown,
		setOptionRef,
	};
}
