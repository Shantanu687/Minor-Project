import type { Metadata } from "next";
import "../globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Welcome to e-commerce store",
  description: "Welcome to our e-commerce store built with Next.js, Sanity and Clerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body>
        <main>
        <Header />
        {children}
        </main>
        <SanityLive />
      </body>
    </html>
    </ClerkProvider>
  );
}
