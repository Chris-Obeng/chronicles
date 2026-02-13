"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-neutral-200/60" />
      <div className="relative max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 hover:opacity-70 transition-opacity"
        >
          Chronicle
        </Link>

        <nav className="flex items-center gap-1">
          <SignedIn>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80 rounded-lg text-[13px] font-medium"
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80 rounded-lg text-[13px] font-medium"
            >
              <Link href="/create-blog">Write</Link>
            </Button>
            <div className="ml-2 pl-2 border-l border-neutral-200">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                size="sm"
                className="rounded-full px-5 text-[13px] font-medium h-9 bg-neutral-900 hover:bg-neutral-800 text-white shadow-none"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
