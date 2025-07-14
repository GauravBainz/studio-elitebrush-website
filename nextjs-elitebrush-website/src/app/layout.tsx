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
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D1XYK29N9W"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D1XYK29N9W');
            `,
          }}
        />
      </head>
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  );
}