import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/centurygothic.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/centurygothic_bold.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${roboto.className} min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
