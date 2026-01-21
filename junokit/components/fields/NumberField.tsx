import { useId, useRef, useState } from "react";
import { DirectionalButton } from "../..";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { clamp, formatNumber, parseNumber, stepValue } from "./utils/numberUtils";

export type NumberFieldDataProps = {
  variant?: Exclude<InputVariant, "flat">;
  color?: InputColor;
  size?: InputSize;
  radius?: InputRadius;
  label?: React.ReactNode;
  labelPosition?: "top" | "left";
  message?: React.ReactNode;
  icon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  prefix?: string;
  suffix?: string;
  showArrows?: boolean;
  inputProps?: InputProps & { min?: number; max?: number; step?: number }; // native input of type 'text' does not accept numeric min, max, step attributes
};

export type NumberFieldProps = NumberFieldDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof NumberFieldDataProps>;

export const defaults = {
  size: "medium" as const,
  variant: "light" as const,
  color: undefined,
  label: undefined,
  labelPosition: "top" as const,
  message: undefined,
  showArrows: true,
};

export default function NumberField(props: NumberFieldProps) {
  const { size, variant, color, radius, label, labelPosition, message, icon, rightIcon, prefix, suffix, showArrows, inputProps, className, ...rest } = { ...defaults, ...props };

  const { min, max, step = 1, value, defaultValue, onChange, onBlur, onKeyDown, ...restInputProps } = inputProps || {};

  const isControlled = value !== undefined && !Array.isArray(value);
  const controlledValue = isControlled ? (value as string | number) : undefined;

  // Internal state for uncontrolled mode and mid-edit display
  const [internalValue, setInternalValue] = useState(() => {
    if (typeof defaultValue === "number" || typeof defaultValue === "string") {
      return formatNumber(defaultValue);
    }
    return "";
  });
  const [isEditing, setIsEditing] = useState(false);

  // Derive display value: use internal while editing, otherwise use controlled value if available
  const displayValue = isEditing ? internalValue : isControlled ? formatNumber(controlledValue!) : internalValue;

  const inputRef = useRef<HTMLInputElement>(null);
  const skipFocusSyncRef = useRef(false);
  const generatedId = useId();
  const inputId = restInputProps?.id || generatedId;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(true);
    // Sync internal to current display on focus, unless triggered by arrow buttons
    if (!skipFocusSyncRef.current) {
      setInternalValue(isControlled ? formatNumber(controlledValue!) : internalValue);
    }
    skipFocusSyncRef.current = false;
    restInputProps?.onFocus?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.-]/g, "");
    setInternalValue(raw);

    const parsed = parseNumber(raw);
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: parsed?.toString() ?? "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    const parsed = parseNumber(internalValue);
    if (parsed !== null) {
      const clamped = clamp(parsed, min, max);
      const formatted = formatNumber(clamped);
      setInternalValue(formatted);
      if (clamped !== parsed) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: clamped.toString() },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    }
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      increment(-1);
    }
    onKeyDown?.(e);
  };

  const increment = (direction: 1 | -1) => {
    const current = parseNumber(displayValue) || 0;
    const newValue = stepValue(current, step, direction);
    const clamped = clamp(newValue, min, max);

    if (clamped !== newValue && clamped === current) return;

    const formatted = formatNumber(clamped);
    setInternalValue(formatted);

    if (onChange) {
      const syntheticEvent = {
        target: { value: clamped.toString() },
        currentTarget: { value: clamped.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    skipFocusSyncRef.current = true;
    inputRef.current?.focus();
  };

  const currentNumericValue = parseNumber(displayValue) || 0;
  const inputClasses = ["w-full", restInputProps?.className].filter(Boolean).join(" ");

  const arrowButton = showArrows && !rightIcon && <ArrowButtons size={size} currentValue={currentNumericValue} min={min} max={max} onIncrement={increment} />;

  return (
    <InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} className={className} {...rest}>
      {label && (
        <InputLabel size={size} color={color} htmlFor={inputId}>
          {label}
        </InputLabel>
      )}
      <InputBox size={size} variant={variant} color={color} radius={radius}>
        {icon}
        {prefix && <span className="opacity-60 select-none">{prefix}</span>}
        <Input
          ref={inputRef}
          {...restInputProps}
          id={inputId}
          type="text"
          inputMode="decimal"
          variant="unstyled"
          value={displayValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClasses}
        />
        {suffix && <span className="opacity-60 select-none">{suffix}</span>}
        {rightIcon || arrowButton}
      </InputBox>
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

type ArrowButtonsProps = {
  size: InputSize;
  currentValue: number;
  min: number | undefined;
  max: number | undefined;
  onIncrement: (direction: 1 | -1) => void;
};

function ArrowButtons({ size, currentValue, min, max, onIncrement }: ArrowButtonsProps) {
  const buttonSize = {
    small: "mini",
    medium: "small",
    large: "medium",
  }[size] as "mini" | "small" | "medium";

  const offset = {
    small: "-mr-1",
    medium: "-mr-1.5",
    large: "-mr-2",
  }[size];

  // Prevent input blur when clicking arrows
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <DirectionalButton
      size={buttonSize}
      direction="vertical"
      variant="ghost"
      className={offset}
      noPrevious={min !== undefined && currentValue <= min}
      noNext={max !== undefined && currentValue >= max}
      onNext={() => onIncrement(1)}
      onPrevious={() => onIncrement(-1)}
      onMouseDown={handleMouseDown}
    />
  );
}

NumberField.defaults = defaults;
