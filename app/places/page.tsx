"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Highlighter } from "@/components/ui/highlighter";

type Place = {
  name: string;
  visited: boolean;
  date?: string; // month · year
  image?: string; // replace with your own photos
};

const PLACES: Place[] = [
  // ── been ──────────────────────────────────────────────────────
  {
    name: "Ahmedabad, Gujarat",
    visited: true,
    date: "May · 2016",
    image: "/ahmedabad.jpg",
  },
  {
    name: "Agra, India",
    visited: true,
    date: "Mar · 2022",
    image: "/agra.png",
  },
  {
    name: "New Delhi, India",
    visited: true,
    date: "Nov · 2023",
    image: "/delhi.png",
  },
  {
    name: "Manali, Himachal Pradesh",
    visited: true,
    date: "May · 2022",
    image: "/manali-22.png",
  },
  {
    name: "Manali, Himachal Pradesh",
    visited: true,
    date: "Oct · 2023",
    image: "/manali.png",
  },
  {
    name: "Fatehpur Sikri, Uttar Pradesh",
    visited: true,
    date: "Sept · 2024",
    image: "/sikri.png",
  },
  {
    name: "Mussoorie, Uttarakhand",
    visited: true,
    date: "Jan · 2025",
    image: "/mussorie.jpg",
  },
  {
    name: "Chakrata, Uttarakhand",
    visited: true,
    date: "Apr · 2025",
    image: "/chakrata.png",
  },
  {
    name: "Mcleodganj, Himachal Pradesh",
    visited: true,
    date: "May · 2025",
    image: "/mcleod.png",
  },
  {
    name: "Chopta, Himachal Pradesh",
    visited: true,
    date: "- · -",
    image: "/chopta.jpg",
  },

  // ── want to go ────────────────────────────────────────────────
  { name: "Shimla, Himachal Pradesh", visited: false },
  { name: "Kalpa, Himachal Pradesh", visited: false },
  { name: "Chitkul, Himachal Pradesh", visited: false },
  { name: "Spiti Valley, Himachal Pradesh", visited: false },
  { name: "Kasol, Himachal Pradesh", visited: false },
  { name: "Leh, Ladakh", visited: false },
  { name: "Ladakh", visited: false },
  { name: "Ziro, Arunachal Pradesh", visited: false },
  { name: "Tirthan Valley, Himachal Pradesh", visited: false },
];

export default function PlacesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visited = PLACES.filter((p) => p.visited);
  const wishlist = PLACES.filter((p) => !p.visited);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const [mobilePos, setMobilePos] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const flipX =
    cursor.x > (typeof window !== "undefined" ? window.innerWidth - 460 : 9999);

  return (
    <>
      {/* cursor-following image */}
      {hoveredImg && !isMobile && (
        <div
          className="fixed z-[9999] pointer-events-none
               rounded-md overflow-hidden shadow-lg"
          style={{
            top: cursor.y + 20,
            left: flipX ? cursor.x - 440 : cursor.x + 20,
            width: 420,
          }}
        >
          <img
            src={hoveredImg}
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />
        </div>
      )}

      {hoveredImg && isMobile && (
        <div
          className="fixed z-[9999] pointer-events-none rounded-md overflow-hidden shadow-lg"
          style={{ top: mobilePos.y, left: mobilePos.x, width: 140 }}
        >
          <img
            src={hoveredImg}
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />
        </div>
      )}

      {/* nav — consistent top-4 on all screen sizes */}
      <div className="fixed top-6 left-4 z-[999] flex items-center">
        <Link
          href="/"
          className="text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity"
        >
          (home)
        </Link>
      </div>
      <div className="fixed top-4 right-4 z-[999] flex items-center">
        <AnimatedThemeToggler className="p-2 rounded-full hover:bg-muted transition-colors" />
      </div>

      {/* content — left aligned */}
      <div className="pt-10 pb-16">
        <h1 className="text-xs font-medium text-muted-foregroun  mb-8">
          <Highlighter action="underline" color="#f97316">places i have been to</Highlighter>
        </h1>

        {/* visited */}
        <ul className="space-y-1.5 mb-8">
          {visited.map((place) => (
            <li
              key={place.name}
              className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground/40 line-through cursor-default select-none"
              onMouseEnter={() => place.image && setHoveredImg(place.image)}
              onMouseLeave={() => setHoveredImg(null)}
              onTouchStart={() => {
                if (!place.image) return;
                const imgW = 140;
                const imgH = 100;
                setMobilePos({
                  x: Math.random() * (window.innerWidth - imgW),
                  y: Math.random() * (window.innerHeight - imgH),
                });
                setHoveredImg(place.image);
              }}
              onTouchEnd={() => setHoveredImg(null)}
            >
              <span className="flex items-baseline gap-2">
                <span className="text-xs">·</span>
                {place.name}
              </span>
              {place.date && (
                <span className="text-xs tabular-nums shrink-0">
                  {place.date}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* divider */}
        <div className="h-px w-full mb-8 animate-pulse bg-muted-foreground/30" />

        {/* wishlist */}
        <p className="text-xs font-medium text-muted-foreground/50  mb-4">
          <Highlighter action="underline" color="#f97316">upcoming</Highlighter>
        </p>
        <ul className="space-y-1.5">
          {wishlist.map((place) => (
            <li
              key={place.name}
              className="flex items-baseline gap-2 text-sm text-muted-foreground cursor-default select-none"
            >
              <span className="text-xs opacity-40">·</span>
              {place.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
