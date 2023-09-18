import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/header";
import SideBar from "@/components/SideBar/sidebar";
import Footer from "@/components/Footer/footer";
import visbyCF from "@/config/fonts";
import { NextAuthProvider } from "./providers";
import { ProposalProvider } from "../contexts/ProposalContext";
import { SideBarProvider } from "@/contexts/SideBarContext";

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
      <body className={`${visbyCF.className} ${inter.className}`}>
        <NextAuthProvider>
          <ProposalProvider>
            <SideBarProvider>
              <Header />
              <div className="w-full flex">
                <SideBar />
                <main className="w-full min-h-screen ml-16 sm:ml-0 pt-20 flex flex-col items-center justify-between">
                  {children}
                </main>
              </div>
              <Footer />
            </SideBarProvider>
          </ProposalProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
