import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { ConditionalNav, ConditionalFooter } from "./ConditionalNav";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

const nunito = Nunito({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Playfuli — Where great gifts come from",
  description:
    "Create a play profile for your kid and share it with party guests — so every gift is something they'll actually love. No registry. No guessing.",
  openGraph: {
    type: "website",
    url: "https://playfuli.co/",
    title: "Playfuli — Where great gifts come from",
    description:
      "Create a play profile for your kid and share it with party guests — so every gift is something they'll actually love. No registry. No guessing.",
    images: [{ url: "https://playfuli.co/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playfuli — Where great gifts come from",
    description:
      "Create a play profile for your kid and share it with party guests — so every gift is something they'll actually love.",
    images: ["https://playfuli.co/og-image.png"],
  },
  alternates: { canonical: "https://playfuli.co/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <style>{`
          :root {
            --font-fredoka: ${fredoka.style.fontFamily};
            --font-nunito: ${nunito.style.fontFamily};
          }
        `}</style>
      </head>
      <body>
        <ConditionalNav />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
