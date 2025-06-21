import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DefaultsProvider } from "./context/DefaultContext";
import { CardsProvider } from "./context/CardsContext";
import TopBar from "./components/molecules/TopBar";
import { UserProvider } from "./context/UserContext";
import { createClient } from "./utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrack",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={user}>
          <DefaultsProvider>
            <CardsProvider>
              <TopBar />
              {children}
            </CardsProvider>
          </DefaultsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
