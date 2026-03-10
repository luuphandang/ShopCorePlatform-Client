import 'react-day-picker/dist/style.css';

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { vi } from 'react-day-picker/locale';

import { cn } from '@/libs/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  fixedWeeks = true,
  footer,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={vi}
      animate={true}
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      navLayout="around"
      hideNavigation={true}
      captionLayout="dropdown"
      className={cn('p-3 pointer-events-auto', className)}
      classNames={{
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...chevronProps }) => {
          switch (orientation) {
            case 'left':
              return <ChevronLeft className={cn('w-4 h-4', className)} {...chevronProps} />;
            case 'right':
              return <ChevronRight className={cn('w-4 h-4', className)} {...chevronProps} />;
            case 'down':
              return <ChevronDown className={cn('w-4 h-4', className)} {...chevronProps} />;
            case 'up':
              return <ChevronUp className={cn('w-4 h-4', className)} {...chevronProps} />;
            default:
              return <Circle className={cn('w-4 h-4', className)} />;
          }
        },
      }}
      footer={footer}
      {...props}
      {...(props.mode === 'range' && { numberOfMonths: 2 })}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
