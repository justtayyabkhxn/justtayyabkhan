"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?: string;
}

export const HorizontalCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  period,
  description,
  location,
}: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block group"
      onClick={handleClick}
      target="_blank"
    >
      <div className="flex items-start gap-3 py-2 ">
        <div className="rounded-full aspect-square bg-white ">

        <img
          src={logoUrl}
          alt={altText}
          className="size-9 p-1 rounded-full object-cover  "
          />
          </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm group-hover:text-foreground transition-colors truncate min-w-0">
              {title}
              {description && (
                <ChevronRight
                  className={cn(
                    "inline size-3 ml-0.5 opacity-30 transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )}
                />
              )}
            </span>
            <span className="text-xs text-muted-foreground shrink-0 tabular-nums ml-auto pl-1">{period}</span>
          </div>
          {(subtitle || location) && (
            <div className="flex items-center justify-between gap-1.5 mt-0.5">
              {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              {location && <span className="text-xs text-muted-foreground/50 ml-auto">{location}</span>}
            </div>
          )}
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs text-muted-foreground mt-1.5 leading-relaxed overflow-hidden"
            >
              {description}
            </motion.div>
          )}
        </div>
      </div>
    </Link>
  );
};
