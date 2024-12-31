"use client";
import { Aboutsection } from "@/components/about-section";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { ModeToggle } from "@/components/theme-button";

export default function Home() {
  return (
    <div className="absolute inset-0 h-fit w-full">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <div className="mx-auto w-full max-w-3xl min-h-[100dvh]">
        <div className="flex items-center flex-col space-y-12 mx-2">
          <Header />
          <Aboutsection />
          <Skills />
          <Education />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  );
}
