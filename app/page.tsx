"use client";
import CardsSection from "@/components/CardsSection";
import { SearchCommand } from "@/components/SearchCommand";
import { SlidingMenu } from "@/components/SlidingMenu";
import { cn, useWindowSize } from "@/lib/utils";
import React from "react";

export default function Home() {
  const size = useWindowSize();
  return (
    <main className="min-h-screen">
      <SlidingMenu
        className={cn(
          "z-50 fixed w-full flex justify-center align-middle",
          size.isSmall ? "bottom-3" : "top-3"
        )}
      />
      {/* <SearchCommand
        className={cn(
          "z-50 absolute",
          size.isSmall ? "top-2 right-2" : "top-6 left-2"
        )}
      /> */}
      <CardsSection className="w-[350px] md:w-[450px] lg:w-[550px] absolute bottom-20 lg:right-4 lg:top-20 lg:over-y-scroll" />
    </main>
  );
}
