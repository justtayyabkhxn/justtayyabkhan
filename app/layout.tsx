import type { Metadata } from "next";
import { McLaren } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const mclaren = McLaren({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Tayyab Khan",
  description: "From this you'll know about me😊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mclaren.className} antialiased min-h-screen bg-background max-w-2xl mx-auto py-12 sm:py-24 px-4 sm:px-6`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
