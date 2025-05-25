import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SignInBtn } from "../../components/SignInBtn";
import { SignOutBtn } from "../../components/SignOutBtn";
import { auth } from "./auth";
import {SessionProvider} from "@/context/SessionContext";
import { initDB } from "./init-db";


//Funkcija za initializaciju baze, pokrece se samo jednom prvi put kad se aplikacija ucita
initDB();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tv show encyclopedia | JuniorDev",
  description: "Browse tv shows, episodes and actors",
  keywords:["TvMazeId", "Next.js", "React", "TvShows", "Actors", "Hollywood"],
  icons:{
    icon: "/tvIcon.png"
  },
  authors:[{name: "Mariela Uvodić"}]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full px-8 py-3 flex items-center bg-black text-white">
          <nav className="flex justify-between items-center w-full">
            <Link href={"/"} className="h-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
              Homepage
            </Link>
            <ul className="flex items-center gap-8">
              <li className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
                <Link href={"/favorites"}>
                  Favorites
                </Link>
              </li>
              <li className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
                <Link href={"/people"}>
                  Actors
                </Link>
              </li>
              {session === null ? (
                <li>
                  <SignInBtn></SignInBtn>
                </li>
              ) : (
                <li>
                  <SignOutBtn></SignOutBtn>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <SessionProvider value={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
