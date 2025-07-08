import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ChevronRightIcon } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";

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
  badges,
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
      className="block cursor-pointer"
      onClick={handleClick}
      target="_blank"
    >
      <Card className="flex border-none items-center">
        <div className="flex-none">
          <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain border-[2px] border-white"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow items-center flex-col group">
          <CardHeader className="px-4">
            <div className="flex items-center justify-between sm:gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
              {location && (
                <div className="font-sans text-xs flex items-center gap-x-1">
                  <FaLocationDot />
                  {location}
                </div>
              )}
            </div>
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
