import Image from "next/image";
import React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface CustomCheckItemProps extends React.HTMLAttributes<HTMLInputElement> {
  open: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  iconSource: string;
  height: number;
  width: number;
  alt: string;
}
const ImageCheckBox = React.forwardRef<HTMLInputElement, CustomCheckItemProps>(
  (
    { className, open, onChange, iconSource, height, width, alt, ...props },
    ref
  ) => {
    return (
      <div className="w-full h-full">
        <input
          type="checkbox"
          ref={ref}
          className={cn("peer sr-only", className)}
          id={alt}
          checked={open}
          onChange={onChange}
          aria-checked={open}
          {...props}
        />
        <Label
          htmlFor={alt}
          className="capitalize flex flex-col items-center justify-end gap-2 cursor-pointer rounded-md border-2 border-muted bg-card p-1 pb-2 transition-all peer-checked:border-primary peer-checked:shadow-check-spread-shadow w-full h-full"
        >
          <Image
            priority
            src={iconSource}
            alt={alt}
            width={width}
            height={height}
          />
          {alt}
        </Label>
      </div>
    );
  }
);
ImageCheckBox.displayName = "ImageCheckItem";

export { ImageCheckBox };
