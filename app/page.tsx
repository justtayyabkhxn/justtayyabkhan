"use client";
import { motion } from "framer-motion";
import { Aboutsection } from "@/components/about-section";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { ModeToggle } from "@/components/theme-button";

const sectionVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.3, // staggered delay
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  return (
    <div className="absolute inset-0 h-fit w-full">
      <div className="absolute top-4 right-4 z-[999]">
        <ModeToggle />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center flex-col space-y-12 mx-2">
          {[
            <Header key="header" />,
            <Aboutsection key="about" />,
            <Experience key="experience" />,
            <Skills key="skills" />,
            <Education key="education" />,
            <Projects key="projects" />,
            <Contact key="contact" />,
          ].map((Component, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              {Component}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
