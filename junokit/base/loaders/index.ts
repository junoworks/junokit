// Main component with variant prop + compound pattern
export { Loader, type LoaderProps } from "./Loader";
export { Loader as default } from "./Loader";

// Direct named exports for each variant
export { Spinner } from "./variants/Spinner";
export { Ping } from "./variants/Ping";
export { TypingDots } from "./variants/TypingDots";
export { Dots } from "./variants/Dots";
export { Beat } from "./variants/Beat";
export { Bars } from "./variants/Bars";

// Types
export type { LoaderSize, LoaderColor } from "./types";
export { defaults as loaderDefaults } from "./types";
