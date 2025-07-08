import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image, { StaticImageData } from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags?: string[];
  link?: string;
  image?: string | StaticImageData;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export const ProjectCard = ({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: ProjectCardProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden h-full transition-all duration-300 ease-out border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:shadow-2xl",
        className
      )}
    >
      <Link href={href || "#"} className="block cursor-pointer">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-48 w-full object-cover object-top"
          />
        )}
      </Link>

      <CardHeader className="px-3 text-white">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {dates && (
            <time className="font-sans text-xs text-white/60">{dates}</time>
          )}
          {link && (
            <div className="hidden font-sans text-xs underline print:visible text-white/60">
              {link.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
          )}
          <Markdown className="prose max-w-full font-sans text-xs text-white/80 dark:prose-invert prose-p:my-0">
            {description}
          </Markdown>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col px-3">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-white/10 border border-white/20 text-white text-[10px] px-1.5 py-0 rounded-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-3 pb-3">
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-start gap-2">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank">
                <Badge className="flex gap-2 bg-white/10 border border-white/20 text-white text-[10px] px-2 py-1 rounded-md">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
