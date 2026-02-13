import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronicle — A Minimal Blog",
  description:
    "A beautifully crafted blog built with Next.js, Clerk, Prisma & Neon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#fafafa] text-foreground font-sans`}
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 animate-in-up">
              {children}
            </main>
            <footer className="w-full max-w-2xl mx-auto px-6 py-8 text-center">
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-xs text-neutral-400 tracking-wide">
                  &copy; {new Date().getFullYear()} Chronicle. Created by Chris.
                </p>
              </div>
            </footer>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
            toastClassName="!bg-white !text-neutral-900 !shadow-lg !border !border-neutral-100 !rounded-xl !text-sm"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
