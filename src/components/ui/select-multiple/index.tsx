'use client';

import { CheckIcon, ChevronDown, XCircle } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';

type MultipleSelectContextType = {
  selected: string[];
  toggle: (val: string) => void;
  isSelected: (val: string) => boolean;
};
const MultipleSelectContext = createContext<MultipleSelectContextType | null>(null);
const useMultipleSelect = () => {
  const context = useContext(MultipleSelectContext);
  if (!context) throw new Error('Must be used inside <MultipleSelect>');
  return context;
};

interface MultipleSelectProps {
  value: string[];
  onValueChange: (val: string[]) => void;
  children: React.ReactNode;
}
const MultipleSelect = ({ value, onValueChange, children }: MultipleSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggle = (val: string) => {
    const newVal = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
    onValueChange(newVal);
  };

  const contextValue: MultipleSelectContextType = {
    selected: value,
    toggle,
    isSelected: (v) => value.includes(v),
  };

  return (
    <MultipleSelectContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </MultipleSelectContext.Provider>
  );
};
MultipleSelect.displayName = 'MultipleSelect';

interface MultipleSelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  placeholder?: string;
}
const MultipleSelectTrigger = ({ children, placeholder, ...props }: MultipleSelectTriggerProps) => {
  const { selected } = useMultipleSelect();

  return (
    <PopoverTrigger asChild>
      <div
        className="w-full min-h-10 border rounded-md flex flex-wrap items-center px-2 py-1 gap-1 cursor-pointer"
        {...props}
      >
        {selected.length !== 0 && children ? (
          children
        ) : (
          <span className="text-muted-foreground text-sm">{placeholder}</span>
        )}
        <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
      </div>
    </PopoverTrigger>
  );
};
MultipleSelectTrigger.displayName = 'MultipleSelectTrigger';

interface MultipleSelectValueProps {
  children?: React.ReactNode;
  value: string;
}
const MultipleSelectValue = ({ children, value }: MultipleSelectValueProps) => {
  const { toggle } = useMultipleSelect();
  return (
    <Badge>
      <div className="flex items-center gap-1">
        <span>{children}</span>
      </div>
      <XCircle
        className="ml-1 h-4 w-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggle(value);
        }}
      />
    </Badge>
  );
};
MultipleSelectValue.displayName = 'MultipleSelectValue';

interface MultipleSelectContentProps {
  children: React.ReactNode;
  inputPlaceholder?: string;
  emptyPlaceholder?: string;
}
const MultipleSelectContent = ({
  children,
  inputPlaceholder = 'Tìm kiếm...',
  emptyPlaceholder = 'Không có lựa chọn nào.',
}: MultipleSelectContentProps) => (
  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
    <Command>
      <CommandInput placeholder={inputPlaceholder} />
      <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
      <CommandGroup className="flex flex-col gap-2">{children}</CommandGroup>
    </Command>
  </PopoverContent>
);
MultipleSelectContent.displayName = 'MultipleSelectContent';

interface MultipleSelectItemProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}
const MultipleSelectItem = ({ value, children, icon: Icon }: MultipleSelectItemProps) => {
  const { toggle, isSelected } = useMultipleSelect();
  const selected = isSelected(value);

  return (
    <CommandItem onSelect={() => toggle(value)} className="cursor-pointer flex items-center gap-2">
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
          selected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
        )}
      >
        <CheckIcon className="h-4 w-4" />
      </div>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <span>{children}</span>
    </CommandItem>
  );
};
MultipleSelectItem.displayName = 'MultipleSelectItem';

export {
  MultipleSelect,
  MultipleSelectContent,
  MultipleSelectItem,
  MultipleSelectTrigger,
  MultipleSelectValue,
};
