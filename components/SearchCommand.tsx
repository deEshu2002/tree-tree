"use client";

import * as React from "react";
import {
  Locate,
  X,
  ChevronDown,
  MapPin,
  CalendarIcon,
  RocketIcon,
} from "lucide-react";

import { cn, useWindowSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import {
  FaceIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  GearIcon,
} from "@radix-ui/react-icons";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function SearchCommand({ className }: { className: string }) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { isClamp, isSmall } = useWindowSize();

  return (
    <>
      <Button
        className={cn(
          "h-14 rounded-full px-2 border-2 border-foreground",
          className
        )}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div
          className="w-full h-full aspect-square rounded-full flex justify-center
            items-center bg-foreground"
        >
          <MapPin color="hsl(var(--background))" width={18} />
        </div>
        {!isClamp && !isSmall && (
          <>
            <div className="ml-3 w-44 flex flex-col text-left">
              <p>Western Park</p>
              <span className="overflow-hidden text-xs text-ellipsis text-muted-foreground">
                59-A Swapna enclave, semapur, New Delhi, India, 203302
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select framework..."}
              </span>
            </div>
            <ChevronDown className="mx-2 h-4 w-4 shrink-0 " />
          </>
        )}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Locate className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
