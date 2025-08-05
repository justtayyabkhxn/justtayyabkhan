import Image from "next/image";
import ProfilePic from "@/public/profile.png";
import { HeaderButtons } from "./header-buttons";
import ShinyButton from "./ui/shiny-button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex sm:flex-row flex-col-reverse justify-between items-center rounded-md mt-5 max-w-2xl w-full">
      <div className="flex flex-col py-4 space-y-1 px-2 lg:px-0 text-center md:text-start">
        <span className="text-5xl mb-4 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Hi, I&apos;m <span className="text-orange-300">Tayyab</span> 
        </span>
        <span className="font-light text-sm">
          <span className="font-semibold">
            Full-Stack Developer | Freelancer
          </span>
          <br />
          Focused on building things which can make an impact!
        </span>
        <div className="pt-3 flex sm:flex-row flex-col-reverse gap-2  items-center justify-center sm:justify-start">
          <HeaderButtons />
          <ShinyButton className="text-bold">
            <Link href={""}>Open for gigs</Link>
          </ShinyButton>
        </div>
      </div>
      <div>
        <Image
          src={ProfilePic}
          width={190}
          height={90}
          alt="Tayyab Khan"
          className="rounded-full cursor-pointer hover:scale-100 scale-90 transition-all duration-500 ease-in-out shadow-5xl border-[5px] border-white"

        />
      </div>
    </div>
  );
};
