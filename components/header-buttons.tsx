import React from "react";
import { DATA } from "@/data/data";

export const HeaderButtons = () => {
  return (
    <div className="flex flex-row gap-x-3">
      {DATA.socialButtons.map((button, key) => (
        <a
          key={key}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          title={button.message}
        >
          <button.icon className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        </a>
      ))}
    </div>
  );
};
