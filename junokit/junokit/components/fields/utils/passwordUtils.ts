export type PasswordRequirement = {
	re: RegExp;
	label: string;
};

export type PasswordPreset = "minimum" | "default" | "enterprise";

export const PASSWORD_PRESETS: Record<PasswordPreset, PasswordRequirement[]> = {
	minimum: [
		{ re: /.{8,}/, label: "Minimum 6 characters" },
		{ re: /^[^\s]+$/, label: "No spaces" },
	],
	default: [
		{ re: /.{8,}/, label: "Minimum 8 characters" },
		{ re: /^[^\s]+$/, label: "No spaces" },
		{ re: /[A-Za-z]/, label: "Includes letters" },
		{ re: /[0-9]/, label: "Includes numbers" },
	],
	enterprise: [
		{ re: /.{16,}/, label: "Minimum 16 characters" },
		{ re: /^[^\s]+$/, label: "No spaces" },
		{ re: /[A-Za-z]/, label: "Include letters" },
		{ re: /[0-9]/, label: "Includes numbers" },
		{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Has special characters" },
	],
};

export const DEFAULT_PRESET: PasswordPreset = "default";

export function getStrength(password: string, preset: PasswordPreset = DEFAULT_PRESET): number {
	const requirements = PASSWORD_PRESETS[preset];
	const metCount = requirements.filter((req) => req.re.test(password)).length;
	return Math.round((metCount / requirements.length) * 100);
}
