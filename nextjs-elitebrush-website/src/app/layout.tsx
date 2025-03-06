import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";

const myFont = Kode_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
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