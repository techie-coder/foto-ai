import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import localFont from "next/font/local";
import "./globals.css";
import { Appbar } from "@/components/Appbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "foto-ai",
  description: "Your image generator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Appbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}