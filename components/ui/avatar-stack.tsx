import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface AvatarListItem {
  avatarImageLink: string;
  avatarFallBackTwoLetters: string;
}

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLUListElement> {
  toShowCount?: number;
  avatarList?: AvatarListItem[];
  avatarContext?: "Maintaining" | "Planting";
}

const tempAvatarSource: AvatarListItem[] = [
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
  {
    avatarFallBackTwoLetters: "CN",
    avatarImageLink: "https://github.com/shadcn.png",
  },
];

const AvatarStack = React.forwardRef<HTMLUListElement, AvatarStackProps>(
  (
    {
      className,
      toShowCount = 3,
      avatarList = tempAvatarSource,
      avatarContext = "Maintaining",
      ...props
    },
    ref
  ) => {
    const leftOver = avatarList.length - toShowCount;
    return (
      <div className="flex justify-between items-center my-2">
        <ul
          className={cn("flex -space-x-2 rtl:space-x-reverse", className)}
          ref={ref}
          {...props}
        >
          {avatarList.slice(0, toShowCount).map((elem, idx) => {
            return (
              <li key={idx}>
                <Avatar className="border-2 border-inherit w-9 h-9">
                  <AvatarImage src={elem.avatarImageLink} alt={"user"} />
                  <AvatarFallback>
                    {elem.avatarFallBackTwoLetters}
                  </AvatarFallback>
                </Avatar>
              </li>
            );
          })}
          <li>
            <Avatar className="border-2 w-9 h-9">
              <AvatarFallback className="bg-border border-spacing-0">
                +{leftOver <= 0 ? "" : leftOver}
              </AvatarFallback>
            </Avatar>
          </li>
        </ul>

        <Badge className="rounded-l-sm rounded-r-none px-4 py-1.5 -mr-10">
          <p>{avatarContext}</p>
        </Badge>
      </div>
    );
  }
);
AvatarStack.displayName = "AvatarStack";

export { AvatarStack };
