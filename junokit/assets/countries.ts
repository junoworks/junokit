export type Country = {
	name: string;
	code: string;
	flagEmoji: string;
	phone: string;
	format: string;
};

export const COUNTRIES: Country[] = [
	{
		name: "United States",
		code: "US",
		flagEmoji: "🇺🇸",
		phone: "+1",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Canada",
		code: "CA",
		flagEmoji: "🇨🇦",
		phone: "+1",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Mexico",
		code: "MX",
		flagEmoji: "🇲🇽",
		phone: "+52",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "United Kingdom",
		code: "GB",
		flagEmoji: "🇬🇧",
		phone: "+44",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Australia",
		code: "AU",
		flagEmoji: "🇦🇺",
		phone: "+61",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Germany",
		code: "DE",
		flagEmoji: "🇩🇪",
		phone: "+49",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "China",
		code: "CN",
		flagEmoji: "🇨🇳",
		phone: "+86",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Russia",
		code: "RU",
		flagEmoji: "🇷🇺",
		phone: "+7",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Saudi Arabia",
		code: "SA",
		flagEmoji: "🇸🇦",
		phone: "+966",
		format: "(XXX) XXX-XXXX",
	},
	{
		name: "Singapore",
		code: "SG",
		flagEmoji: "🇸🇬",
		phone: "+65",
		format: "(XXX) XXX-XXXX",
	},
];

export const COUNTRY_CODES = COUNTRIES.map((country) => country.code);

// create a map of country codes from COUNTRIES array
export const COUNTRY_CODE_MAP = COUNTRIES.reduce(
	(acc, country) => {
		acc[country.code] = country;
		return acc;
	},
	{} as Record<string, Country>,
);
