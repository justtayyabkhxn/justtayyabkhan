import Image from "next/image";
import ProfilePic from "@/public/profile.png";
import { HeaderButtons } from "./header-buttons";
import ShinyButton from "./ui/shiny-button";
import Link from "next/link";
import { Barriecito } from "next/font/google";
import { Highlighter } from "./ui/highlighter";

const barriecito = Barriecito({
  subsets: ["latin"],
  weight: ["400"],
});

export const Header = () => {
  return (
    <div className="flex sm:flex-row flex-col-reverse items-center justify-between w-full pt-4 gap-6">
      <div className="flex flex-col space-y-3 min-w-0 items-center sm:items-start text-center sm:text-left">
        <h1 className={`${barriecito.className} text-4xl sm:text-5xl font-bold tracking-tight`}>Tayyab Khan</h1>
        <p className="text-sm text-muted-foreground"><Highlighter action="underline" color="#f97316"><span className=" font-semibold">Full-Stack Developer</span></Highlighter> · Freelancer</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Physics major turned web dev. Building things that matter.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <HeaderButtons />
          <ShinyButton>
            <Link href="">Open for gigs</Link>
          </ShinyButton>
        </div>
      </div>
      <Image
        src={ProfilePic}
        width={120}
        height={120}
        alt="Tayyab Khan"
        className="size-28 sm:size-[120px] rounded-full opacity-90 shrink-0"
      />
    </div>
  );
};
