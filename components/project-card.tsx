import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  image,
  video,
  links,
  className,
}: ProjectCardProps) => {
  const plainDesc = description.replace(/\*\*(.*?)\*\*/g, "$1");

  return (
    <div className={cn("flex flex-col border border-border rounded-lg overflow-hidden", className)}>
      <Link href={href || "#"} target="_blank" className="block">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-36 object-cover object-top"
          />
        )}
        {!video && image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="w-full h-36 object-cover object-top"
          />
        )}
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={href || "#"} target="_blank" className="text-sm font-medium hover:underline underline-offset-2">
            {title}
          </Link>
          {dates && (
            <span className="text-xs text-muted-foreground shrink-0 tabular-nums">{dates}</span>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
          {plainDesc}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-border">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUpRight className="size-3" />
                {link.type}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
