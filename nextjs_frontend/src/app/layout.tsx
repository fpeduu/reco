import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/header";
import SideBar from "@/components/SideBar/sidebar";
import Footer from "@/components/Footer/footer";
import { NextAuthProvider } from "./providers";
import { NotificationProvider } from "../contexts/NotificationContext";
import { SideBarProvider } from "@/contexts/SideBarContext";
import NoirPro from "@/config/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reco",
  description: "Uma plataforma de resolução de acordos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${NoirPro.className} ${inter.className}`}>
        <NextAuthProvider>
          <NotificationProvider>
            <SideBarProvider>
              <Header />
              <div className="w-screen flex">
                <SideBar />
                <main className="w-full min-h-screen ml-16 sm:ml-0 pt-20 flex flex-col items-center justify-between">
                  {children}
                </main>
              </div>
              <Footer />
            </SideBarProvider>
          </NotificationProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
