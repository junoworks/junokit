import AppShell from "./AppShell";
import Container from "./AppShellContainer";

export type { AppShellProps } from "./AppShell";
export { makeInlineStyle, makeTailwindClasses } from "./AppShell";
export type { AppShellContainerProps } from "./AppShellContainer";
export { defaults, makeAppShellContainerClasses } from "./AppShellContainer";

AppShell.Container = Container;

export default AppShell;
