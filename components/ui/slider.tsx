"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("w-full touch-none select-none pt-4", className)}
    {...props}
  >
    <div className="relative flex  items-center">
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {props.defaultValue &&
        props.defaultValue.map((_, i) => {
          return (
            <SliderPrimitive.Thumb
              key={i}
              className="block relative h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <div className="inline-flex justify-center items-center z-50 absolute top-[-2.5rem] left-[-.75rem] overflow-hidden rounded-md border bg-primary px-3 py-1.5 text-xs text-primary-foreground w-10">
                {props.value && props.value[i]}
              </div>
            </SliderPrimitive.Thumb>
          );
        })}
    </div>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
