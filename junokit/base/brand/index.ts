// Main component with type prop + compound pattern
export { Brand, type BrandProps } from "./Brand";
export { Brand as default } from "./Brand";

// Direct named exports for each variant
export { Logo } from "./variants/Logo";
export { Symbol } from "./variants/Symbol";

// Types
export type { BrandSize } from "./types";
export { defaults } from "./types";
