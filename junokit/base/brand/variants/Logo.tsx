import type { BrandProps } from "../types";
import { defaults } from "../types";

const logoDefaults = {
	...defaults,
	aspectRatio: 3,
};

function LogoComponent(props: BrandProps) {
	const { src, size, inverted, aspectRatio, className = "", style, ...rest } = { ...logoDefaults, ...props };

	const imageVar = inverted ? "var(--logo-inverted)" : "var(--logo)";
	const imageUrl = src ? `url("${src}")` : imageVar;

	const wrapperStyles: React.CSSProperties = {
		width: "auto",
		height: size,
		backgroundImage: imageUrl,
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		aspectRatio: `${aspectRatio} / 1`,
		...style,
	};

	return <div {...rest} className={`flex-shrink-0 ${className}`} style={wrapperStyles} />;
}

export const Logo = Object.assign(LogoComponent, { defaults: logoDefaults });
