import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../..";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import type { Option } from "../../base/select/types";
import { Check, XMark } from "../../icons";

export type ComboboxDataProps = {
  variant?: Exclude<InputVariant, "flat">;
  color?: InputColor;
  size?: InputSize;
  radius?: InputRadius;
  label?: React.ReactNode;
  labelPosition?: "top" | "left";
  message?: React.ReactNode;
  icon?: React.ReactElement;
  options: Option[];
  searchType?: "fuzzy" | "contains" | "startsWith";
  showClearButton?: boolean;
  maxHeight?: number;
  inputProps?: Omit<InputProps, "value" | "onChange"> & {
    placeholder?: string;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
  };
};

export type ComboboxProps = ComboboxDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ComboboxDataProps>;

export const defaults = {
  size: "medium" as const,
  variant: "light" as const,
  color: undefined,
  label: undefined,
  labelPosition: "top" as const,
  message: undefined,
  options: [] as Option[],
  searchType: "fuzzy" as const,
  showClearButton: true,
};

export default function Combobox(props: ComboboxProps) {
  const {
    size,
    variant,
    color,
    radius,
    label,
    labelPosition,
    message,
    icon,
    options,
    searchType,
    showClearButton,
    maxHeight: maxHeightProp,
    inputProps,
    className,
    ...rest
  } = { ...defaults, ...props };

  const { placeholder, value, onChange, disabled, id, onFocus, onBlur, ...restInputProps } = inputProps || {};

  const generatedId = useId();
  const inputId = id || generatedId;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | number | null>(value === undefined ? null : value);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const maxHeightMap = { small: 180, medium: 240, large: 320 };
  const maxHeight = maxHeightProp || maxHeightMap[size];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node) && (!contentRef.current || !contentRef.current.contains(event.target as Node))) {
        setOpen(false);
        setIsTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus option when dropdown opens
  useLayoutEffect(() => {
    if (open) {
      const index = filteredOptions.findIndex((o) => o.value === selectedValue);
      setFocusedIndex(index === -1 ? 0 : index);
    }
  }, [open, filteredOptions, selectedValue]);

  // Sync with external value
  useEffect(() => {
    setSelectedValue(value === undefined ? null : value);
  }, [value]);

  // Sync input display with selected value
  useEffect(() => {
    if (!isTyping) {
      const selectedOption = options.find((o) => o.value === selectedValue);
      setInputValue(selectedOption ? selectedOption.label || String(selectedOption.value) : "");
    }
  }, [selectedValue, options, isTyping]);

  // Filter options based on input
  useEffect(() => {
    if (!open) return;
    const query = inputValue.toLowerCase();

    const filterFn = (option: Option): boolean => {
      const label = (option.label || String(option.value)).toLowerCase();
      switch (searchType) {
        case "startsWith":
          return label.startsWith(query);
        case "contains":
          return label.includes(query);
        default: {
          if (!query) return true;
          let qIdx = 0;
          for (let i = 0; i < label.length && qIdx < query.length; i++) {
            if (query[qIdx] === label[i]) qIdx++;
          }
          return qIdx === query.length;
        }
      }
    };

    const results = options.filter(filterFn);
    if (results.length !== filteredOptions.length || results.some((o, i) => o.value !== filteredOptions[i]?.value)) {
      setFilteredOptions(results);
    }
  }, [inputValue, options, searchType, open, filteredOptions]);

  const handleSelect = (option: Option) => {
    setSelectedValue(option.value);
    setInputValue(option.label || String(option.value));
    setIsTyping(false);
    setOpen(false);
    onChange?.(option.value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(null);
    setInputValue("");
    setFilteredOptions(options);
    setOpen(false);
    onChange?.(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case "Enter":
        event.preventDefault();
        if (open && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setIsTyping(false);
        break;
    }
  };

  const buttonSize = { small: "mini", medium: "small", large: "medium" }[size] as "mini" | "small" | "medium";
  const buttonOffset = { small: "-mr-1", medium: "-mr-1.5", large: "-mr-2" }[size];
  const minWidth = { small: 140, medium: 180, large: 220 }[size];

  const showClear = showClearButton && inputValue && !disabled;
  const clearButton = showClearButton && <Button icon={<XMark />} size={buttonSize} variant="ghost" onMouseDown={handleClear} className={`${buttonOffset} ${showClear ? "" : "invisible"}`} />;

  const dropdownClasses = [
    "absolute left-0 right-0 z-50 flex flex-col overflow-y-auto",
    "bg-base-0 border border-base-200 shadow-xl shadow-black/5",
    size === "small" ? "rounded-md p-0.5 mt-1" : size === "large" ? "rounded-xl p-1.5 mt-2" : "rounded-lg p-1 mt-1.5",
  ].join(" ");

  const itemBaseClasses = {
    small: "px-1.5 py-0.5 gap-0.5 rounded-sm text-xs",
    medium: "px-2 py-1.5 gap-1 rounded-md text-sm",
    large: "px-2.5 py-1.5 gap-1.5 rounded-lg text-base",
  }[size];

  return (
    <InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} className={className} {...rest}>
      {label && (
        <InputLabel size={size} color={color} htmlFor={inputId}>
          {label}
        </InputLabel>
      )}
      <div ref={wrapperRef} className="relative w-full" onKeyDown={handleKeyDown}>
        <InputBox size={size} variant={variant} color={color} radius={radius} style={{ minWidth }}>
          {icon}
          <Input
            ref={inputRef}
            {...restInputProps}
            id={inputId}
            variant="unstyled"
            disabled={disabled}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={inputValue}
            onFocus={(e) => {
              setOpen(true);
              setIsTyping(false);
              onFocus?.(e);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsTyping(true);
              setOpen(true);
            }}
            onBlur={(e) => {
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (!wrapperRef.current?.contains(relatedTarget)) {
                setOpen(false);
                setIsTyping(false);
              }
              onBlur?.(e);
            }}
            className="w-full"
          />
          {clearButton}
        </InputBox>

        {open && (
          <div ref={contentRef} className={dropdownClasses} style={{ maxHeight, scrollbarWidth: "thin" }}>
            {filteredOptions.map((option, index) => (
              <ComboboxItem
                key={option.value}
                option={option}
                isSelected={selectedValue === option.value}
                isFocused={index === focusedIndex}
                itemClasses={itemBaseClasses}
                onSelect={() => handleSelect(option)}
              />
            ))}
            {filteredOptions.length === 0 && <div className={`${itemBaseClasses} text-current/50 cursor-default`}>no results</div>}
          </div>
        )}
      </div>
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

type ComboboxItemProps = {
  option: Option;
  isSelected: boolean;
  isFocused: boolean;
  itemClasses: string;
  onSelect: () => void;
};

function ComboboxItem({ option, isSelected, isFocused, itemClasses, onSelect }: ComboboxItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [isFocused]);

  const focusStyle = isFocused ? "bg-current/5" : "hover:bg-current/5";
  const textColor = isSelected ? "text-current" : "text-current/70 hover:text-current";

  return (
    <div
      ref={itemRef}
      className={`flex items-center justify-between cursor-pointer ${itemClasses} ${focusStyle} ${textColor}`}
      onMouseDown={(e) => {
        e.preventDefault();
        onSelect();
      }}
      role="option"
      aria-selected={isSelected}
    >
      <span className="flex-1 min-w-0 truncate">{option.label || option.value}</span>
      {isSelected && <Check className="flex-shrink-0" />}
    </div>
  );
}

Combobox.defaults = defaults;
