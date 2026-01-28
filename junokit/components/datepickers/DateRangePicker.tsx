import { useEffect, useId, useState } from "react";
import { Button, DateTime, Select } from "../..";
import { InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import { useBreakpoints } from "../../hooks/matchMedia";
import { ArrowRight, Calendar, XMark } from "../../icons";
import { getPresets, type PresetValue } from "./lib/presets";
import MiniCalendarRange from "./MiniCalendarRange";
import { PresetOptions } from "./parts";
import type { DateRange } from "./types";
import { getDateRangeFromPreset } from "./utils";

export type DateRangePickerDataProps = {
  variant?: Exclude<InputVariant, "flat">;
  color?: InputColor;
  size?: InputSize;
  radius?: InputRadius;
  label?: React.ReactNode;
  labelPosition?: "top" | "left";
  message?: React.ReactNode;
  placeholder?: string;
  showClearButton?: boolean;
  presetOptions?: "future" | "past";
  closeOnSelect?: boolean;
  value?: DateRange | null;
  id?: string;
};

export type DateRangePickerProps = DateRangePickerDataProps & {
  onChange?: (dateRange: DateRange | null) => void;
  onClear?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
  size: "medium" as const,
  variant: "light" as const,
  color: undefined,
  label: undefined,
  labelPosition: "top" as const,
  message: undefined,
  placeholder: "Select dates",
  showClearButton: true,
  presetOptions: undefined as "future" | "past" | undefined,
  closeOnSelect: false,
};

export default function DateRangePicker(props: DateRangePickerProps) {
  const { size, variant, color, radius, label, labelPosition, message, placeholder, showClearButton, presetOptions, closeOnSelect, value, onChange, onClear, id, ...rest } = { ...defaults, ...props };

  const generatedId = useId();
  const fieldId = id || generatedId;

  const [currentRange, setCurrentRange] = useState<DateRange | null>(value === undefined ? null : value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentRange(value === undefined ? null : value);
  }, [value]);

  const handleDateRangeChange = (newRange: DateRange | null) => {
    setCurrentRange(newRange);
    onChange?.(newRange);
    if (closeOnSelect && newRange?.from && newRange?.to) {
      setIsOpen(false);
    }
  };

  const clearRange = () => {
    const clearedRange = { from: null, to: null };
    setCurrentRange(clearedRange);
    setIsOpen(false);
    if (onClear) {
      onClear();
    } else {
      onChange?.(clearedRange);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearRange();
  };

  const handlePreset = (presetValue: PresetValue, isToday?: boolean, isClear?: boolean) => {
    if (isClear) {
      clearRange();
      return;
    }
    const range = getDateRangeFromPreset(presetValue, isToday);
    setCurrentRange(range);
    onChange?.(range);
  };

  const hasValue = currentRange?.from || currentRange?.to;
  const isPlaceholder = !hasValue;

  const iconSize = {
    small: "16px",
    medium: "20px",
    large: "24px",
  }[size] as string;

  const clearButtonSize = {
    small: "mini",
    medium: "small",
    large: "medium",
  }[size] as "mini" | "small" | "medium";

  const clearButtonOffset = {
    small: "-mr-1",
    medium: "-mr-1.5",
    large: "-mr-2",
  }[size];

  const minWidth = {
    small: 248,
    medium: 292,
    large: 352,
  }[size];

  const calendarIcon = <Calendar size={iconSize} />;

  const clearButton = showClearButton && hasValue && <Button icon={<XMark size={iconSize} />} size={clearButtonSize} variant="ghost" onMouseDown={handleClear} className={clearButtonOffset} />;

  const displayContent = hasValue ? (
    <div className="flex flex-row gap-2 items-center">
      <DateTime value={currentRange?.from} format="medium" type="date" className="tabular-nums" />
      {(currentRange?.from || currentRange?.to) && <ArrowRight size={iconSize} className="opacity-60 scale-90" />}
      <DateTime value={currentRange?.to} format="medium" type="date" className="tabular-nums" />
    </div>
  ) : (
    placeholder
  );

  const popoverContentClasses = {
    small: "!p-2 !rounded-sm",
    medium: "!p-3 !rounded-md",
    large: "!p-3 !rounded-lg",
  }[size] as string;
  const { sm } = useBreakpoints();
  const isMobile = !sm;

  return (
    <InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} {...rest}>
      {label && (
        <InputLabel size={size} color={color} htmlFor={fieldId}>
          {label}
        </InputLabel>
      )}
      <Popover size={size} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <InputBox id={fieldId} size={size} variant={variant} color={color} radius={radius} className="cursor-pointer" style={{ minWidth }}>
            {calendarIcon}
            <span className={`flex-1 select-none ${isPlaceholder ? "opacity-60" : ""}`}>{displayContent}</span>
            {clearButton}
          </InputBox>
        </PopoverTrigger>
        <PopoverContent className={`${popoverContentClasses} overflow-visible`}>
          <div className={`flex flex-col ${size === "small" ? "gap-2" : "gap-3"}`}>
            <div className={`flex flex-row ${size === "small" ? "gap-2" : "gap-3"}`}>
              {presetOptions && !isMobile && <PresetOptions size={size === "large" ? "medium" : size} presetType={presetOptions} onSelectPreset={handlePreset} />}
              <MiniCalendarRange
                value={currentRange}
                onChange={handleDateRangeChange}
                size={size === "large" ? "medium" : size}
                color={color === "primary" || color === "accent" ? color : "primary"}
                layout={isMobile ? "single" : "double"}
              />
            </div>
            {isMobile && (
              <div className="flex flex-row justify-between items-center gap-2 pt-1">
                {presetOptions ? (
                  <Select
                    size="small"
                    variant="light"
                    placeholder="Presets"
                    options={getPresets(presetOptions).map((p) => ({
                      label: p.label,
                      value: String(p.value),
                    }))}
                    onChange={(val) => {
                      const preset = getPresets(presetOptions).find((p) => String(p.value) === val);
                      if (preset) handlePreset(preset.value, preset.isToday, preset.isClear);
                    }}
                  />
                ) : (
                  <Button size="small" variant="ghost" onClick={() => clearRange()}>
                    Clear
                  </Button>
                )}
                <Button size="small" variant="light" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {message && (
        <>
          {label && labelPosition === "left" && <div />}
          <InputMessage size={size} color={color}>
            {message}
          </InputMessage>
        </>
      )}
    </InputGroup>
  );
}

DateRangePicker.defaults = defaults;
