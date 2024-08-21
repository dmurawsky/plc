import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Services
import { SoilContextProviderComponent } from "@/services/soil/context";

// Components
import { SoilAi } from "soil-react";
import { Header } from "@/components/header";
import { ToastContainer } from "react-toastify";

// Components
import "animate.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const FIREBASE_OPTIONS = {
  apiKey: "AIzaSyBKlbGaF-t6U6xFslGBJoSL-PG_eSYhBls",
  authDomain: "putnam-land.firebaseapp.com",
  projectId: "putnam-land",
  storageBucket: "putnam-land.appspot.com",
  messagingSenderId: "978256788558",
  appId: "1:978256788558:web:7e350310b42ace9f43d71f",
};

export const metadata: Metadata = {
  title: "My Soil App",
  description: "Build your own Soil app",
  openGraph: {
    type: "website",
    title: "Soil",
    siteName: "Soil",
    url: "https://soilai.dev",
    description: "Optimizing Next.js development",
    images: [{ url: "https://soilai.dev/soil.png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-green-200`}>
        <div className="background" />
        <Header />
        <main className="relative pt-10">
          <SoilContextProviderComponent firebaseOptions={FIREBASE_OPTIONS}>
            {children}
          </SoilContextProviderComponent>
        </main>
        <ToastContainer />
        <SoilAi />
      </body>
    </html>
  );
}
