import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { DATA } from "@/data/data";

export const HeaderButtons = () => {
  return (
    <div className="flex flex-row gap-x-2">
      <TooltipProvider>
        {DATA.socialButtons.map((button, key) => (
          <Tooltip key={key}>
            <span>
              <TooltipTrigger key={key} asChild>
                <a 
                  href={button.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button.icon className="border size-7 p-1 rounded-md group" />
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="bg-black text-white dark:text-black dark:bg-white"
              >
                <p>{button.message}</p>
              </TooltipContent>
            </span>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};
