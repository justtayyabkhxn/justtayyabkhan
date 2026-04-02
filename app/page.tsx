"use client";
import { motion } from "framer-motion";
import { Aboutsection } from "@/components/about-section";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Particles } from "@/components/ui/particles";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "@/components/useLenis";

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  useLenis();

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const particleColor = isDark ? "#ffffff" : "#1a1a1a";

  return (
    <div className="absolute inset-0 h-fit w-full">
      <Particles key={particleColor} className="fixed inset-0 -z-10 h-full w-full" quantity={120} color={particleColor} size={0.6} />
      <div className="fixed top-6  left-4 z-[999] flex gap-4">
        <Link href="/gallery" className="text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity no-underline">
          (gallery)
        </Link>
        <Link href="/places" className="text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity">
          (places)
        </Link>
      </div>
      <div className="fixed top-4 right-4 z-[999]">
        <AnimatedThemeToggler className="p-2 rounded-full hover:bg-muted transition-colors" />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center flex-col space-y-10 mx-2">
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
