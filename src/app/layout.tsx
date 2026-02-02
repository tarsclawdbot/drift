import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DRIFT — Postcards from the Unexpected",
  description: "A collection of micro-adventures, creative prompts, and spontaneous activities. Break your routine, one card at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable} ${bebasNeue.variable}`}>
      <body className="antialiased min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
