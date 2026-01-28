import { Button } from "../../..";
import { getPresets, type PresetOption, type PresetType, type PresetValue } from "../lib/presets";
import type { CalendarSize } from "../types";

type PresetOptionsProps = {
  size?: CalendarSize;
  presetType: PresetType;
  onSelectPreset: (value: PresetValue, isToday?: boolean, isClear?: boolean) => void;
  customPresets?: PresetOption[];
} & React.HTMLAttributes<HTMLDivElement>;

export function PresetOptions({ size = "medium", presetType, onSelectPreset, customPresets, ...rest }: PresetOptionsProps) {
  const presets = customPresets ?? getPresets(presetType);
  if (presets.length === 0) return null;

  const buttonHeight = size === "small" ? "!h-6" : "!h-7";

  return (
    <div {...rest} className={`min-w-[140px] flex flex-col gap-1 transition-all duration-75 ${rest.className}`}>
      {presets.map((preset) => (
        <Button key={preset.label} className={`${buttonHeight} !px-2`} justify="start" variant={"ghost"} onClick={() => onSelectPreset(preset.value, preset.isToday, preset.isClear)}>
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
