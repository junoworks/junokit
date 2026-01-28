import type { BrandProps } from "../types";
import { defaults } from "../types";

function SymbolComponent(props: BrandProps) {
	const { src, size, inverted, className = "", style, ...rest } = { ...defaults, ...props };

	const imageVar = inverted ? "var(--symbol-inverted)" : "var(--symbol)";
	const imageUrl = src ? `url("${src}")` : imageVar;

	const wrapperStyles: React.CSSProperties = {
		width: size,
		height: size,
		backgroundImage: imageUrl,
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		aspectRatio: "1 / 1",
		...style,
	};

	return <div {...rest} className={`flex-shrink-0 ${className}`} style={wrapperStyles} />;
}

export const Symbol = Object.assign(SymbolComponent, { defaults });
