"use client";
import * as React from "react";
import { Button } from "./ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Filter } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Card, CardContent, CardFooter } from "./ui/card";

import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { switches } from "./CardsSection";
import { cn, useWindowSize } from "@/lib/utils";
import { Label } from "./ui/label";
import { ImageCheckBox } from "./ui/image-checkbox";

type filterContentProps = {
  plantingEvent: boolean;
  setPlantingEvent: React.Dispatch<React.SetStateAction<boolean>>;
  maintainingEvent: boolean;
  setMaintainingEvent: React.Dispatch<React.SetStateAction<boolean>>;
  distanceFrame: number[];
  setDistanceFrame: React.Dispatch<React.SetStateAction<number[]>>;
  switchesGroup: Array<switches>;
};

function FilterContentMapper({
  distanceFrame,
  maintainingEvent,
  plantingEvent,
  setDistanceFrame,
  setMaintainingEvent,
  setPlantingEvent,
  switchesGroup,
}: filterContentProps) {
  return (
    <Card className="h-[78svh] overflow-scroll rounded-md border-none shadow-lg p-1">
      <CardContent className="grid gap-8 pb-0 first:mt-4">
        <div className="flex flex-col items-start space-y-6">
          <Label className="font-semibold leading-none tracking-tight">
            Events
          </Label>
          <div className="flex flex-row justify-between w-full gap-8 lg:gap-16 px-1 lg:px-10">
            <ImageCheckBox
              iconSource="/planting.svg"
              width={99.59}
              height={61.46}
              alt={"Planting"}
              open={plantingEvent}
              onChange={() =>
                setPlantingEvent(
                  (plantingEvent) => maintainingEvent !== plantingEvent
                )
              }
            />
            <ImageCheckBox
              iconSource={"/maintenance.svg"}
              width={103}
              height={85}
              alt={"Maintaining"}
              open={maintainingEvent}
              onChange={() =>
                setMaintainingEvent(
                  (maintainingEvent) => plantingEvent !== maintainingEvent
                )
              }
            />
          </div>
        </div>

        <div className="flex flex-col items-start space-y-16">
          <Label htmlFor="distance-frame">
            <span className="font-semibold leading-none tracking-tight">
              Distance Frame (In KM)
            </span>
          </Label>
          <div className="w-full px-2 lg:px-6">
            <Slider
              id="distance-frame"
              defaultValue={[0, 100]}
              value={distanceFrame}
              minStepsBetweenThumbs={2}
              onValueChange={(e: [number, number]) =>
                setDistanceFrame([Math.min(e[0], e[1]), Math.max(e[0], e[1])])
              }
            />
          </div>
        </div>
        {switchesGroup.map((sElem, idx) => {
          const id = sElem[0].toLowerCase().split(" ").join("-");
          return (
            <div
              className="flex items-center justify-between space-x-2"
              key={idx}
            >
              <Label htmlFor={id} className="flex flex-col space-y-1">
                <span className="font-semibold tracking-tight">{sElem[0]}</span>
                <span className="font-normal text-sm w-[200px] md:w-[300px] lg:w-[340px] leading-snug text-muted-foreground">
                  {sElem[1]}
                </span>
              </Label>
              <Switch
                id={id}
                checked={sElem[2]}
                onCheckedChange={() => sElem[3]((checked) => !checked)}
              />
            </div>
          );
        })}

        <CardFooter className="justify-end p-0 mb-4 lg:mb-2">
          <Button variant="default">Save Filter</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

const Filters = ({
  filterOpen,
  setFilterOpen,
  plantingEvent,
  setPlantingEvent,
  maintainingEvent,
  setMaintainingEvent,
  distanceFrame,
  setDistanceFrame,
  switchesGroup,
}: filterContentProps & {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isSmall } = useWindowSize();
  if (isSmall) {
    return (
      <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="rounded-full gap-2 absolute right-0 -top-10 px-2.5"
            aria-expanded={filterOpen}
          >
            <Filter className="ml-auto" width={18} height={18} />
            {isSmall ? "" : "Filter"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <FilterContentMapper
            distanceFrame={distanceFrame}
            maintainingEvent={maintainingEvent}
            plantingEvent={plantingEvent}
            setDistanceFrame={setDistanceFrame}
            setMaintainingEvent={setMaintainingEvent}
            setPlantingEvent={setPlantingEvent}
            switchesGroup={switchesGroup}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="rounded-full gap-2"
          aria-expanded={filterOpen}
        >
          <Filter className="ml-auto" width={18} height={18} />
          {isSmall ? "" : "Filter"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[340px] md:w-[440px] lg:w-[540px] p-0 shadow-xl"
        align="end"
        sideOffset={10}
        alignOffset={-15}
      >
        <FilterContentMapper
          distanceFrame={distanceFrame}
          maintainingEvent={maintainingEvent}
          plantingEvent={plantingEvent}
          setDistanceFrame={setDistanceFrame}
          setMaintainingEvent={setMaintainingEvent}
          setPlantingEvent={setPlantingEvent}
          switchesGroup={switchesGroup}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Filters;
