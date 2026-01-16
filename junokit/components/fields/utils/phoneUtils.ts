import { COUNTRY_CODE_MAP, type Country } from "../../../assets/countries";

type CountryCodeMap = Record<string, Country>;

export function formatPhoneNumber(value: string, countryCode: string): string {
	if (!value) return "";
	const digits = value.replace(/\D/g, "");
	const countryData = (COUNTRY_CODE_MAP as CountryCodeMap)[countryCode];
	const format = countryData?.format || "(XXX) XXX-XXXX";

	let result = "";
	let digitIndex = 0;
	for (let i = 0; i < format.length; i++) {
		if (format[i] === "X") {
			if (digitIndex < digits.length) {
				result += digits[digitIndex];
				digitIndex++;
			} else {
				break;
			}
		} else {
			const formatChar = format[i];
			if (digitIndex > 0 || (digitIndex === 0 && digits.length > 0 && formatChar && /[([]/.test(formatChar))) {
				result += formatChar;
			}
		}
	}
	return result.replace(/[^\d]+$/, "");
}

export function unformatPhoneNumber(value: string): string {
	return value.replace(/\D/g, "");
}

export function validatePhoneInput(value: string): string {
	return value.replace(/[^0-9\s\-()]/g, "");
}

export function getCountryData(countryCode: string): Country | undefined {
	return (COUNTRY_CODE_MAP as CountryCodeMap)[countryCode];
}

export function calculateNewCursorPosition(
	oldValue: string,
	newFormattedValue: string,
	oldCursorPosition: number,
): number {
	const digitsBeforeCursor = oldValue.slice(0, oldCursorPosition).replace(/\D/g, "").length;

	let newCursorPosition = 0;
	let digitCount = 0;

	for (let i = 0; i < newFormattedValue.length && digitCount < digitsBeforeCursor; i++) {
		const char = newFormattedValue[i];
		if (char && /\d/.test(char)) {
			digitCount++;
		}
		newCursorPosition = i + 1;
	}

	if (digitCount === digitsBeforeCursor && newCursorPosition < newFormattedValue.length) {
		const nextChar = newFormattedValue[newCursorPosition];
		if (nextChar && !/\d/.test(nextChar)) {
			newCursorPosition++;
		}
	}

	return newCursorPosition;
}
