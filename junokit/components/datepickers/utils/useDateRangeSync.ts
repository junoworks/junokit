import { useEffect, useRef } from "react";
import type { DateRange } from "../types";
import { isSameMonth, startOfMonth } from "./dateHelpers";

type UseDateRangeSyncParams = {
	value: DateRange | null | undefined;
	leftMonth: Date;
	rightMonth: Date;
	setStartDate: (date: Date | null) => void;
	setEndDate: (date: Date | null) => void;
	setLeftMonth: (date: Date) => void;
};

/**
 * Hook to sync controlled DateRange value with internal state.
 * Updates internal dates when value changes and ensures the
 * selected date is visible in one of the calendar panels.
 */
export function useDateRangeSync({
	value,
	leftMonth,
	rightMonth,
	setStartDate,
	setEndDate,
	setLeftMonth,
}: UseDateRangeSyncParams) {
	const prevValueRef = useRef<DateRange | null | undefined>(undefined);

	useEffect(() => {
		if (value !== undefined) {
			setStartDate(value?.from || null);
			setEndDate(value?.to || null);
		}

		const valueFromTime = value?.from?.getTime();
		const prevValueFromTime = prevValueRef.current?.from?.getTime();
		const valueToTime = value?.to?.getTime();
		const prevValueToTime = prevValueRef.current?.to?.getTime();
		const actualValueChanged = valueFromTime !== prevValueFromTime || valueToTime !== prevValueToTime;

		if (actualValueChanged) {
			const dateToFocus = value?.from || value?.to;
			if (dateToFocus) {
				const isVisibleInLeft = isSameMonth(dateToFocus, leftMonth);
				const isVisibleInRight = isSameMonth(dateToFocus, rightMonth);
				if (!isVisibleInLeft && !isVisibleInRight) {
					setLeftMonth(startOfMonth(dateToFocus));
				}
			}
		}
		prevValueRef.current = value;
	}, [value, leftMonth, rightMonth, setStartDate, setEndDate, setLeftMonth]);
}
