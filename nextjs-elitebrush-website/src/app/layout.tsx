import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";


const myFont = Orbitron({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: "--my-font",
});

export const metadata: Metadata = {
  title: "EliteBrush Co.",
  description: "Elevate Your Space With Elite Precision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  );
}