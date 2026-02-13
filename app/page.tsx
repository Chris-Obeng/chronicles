import React from "react";
import Blogs from "@/app/blogs/page";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const page = async () => {
  const user = await checkUser();

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
          Stories & Ideas
        </h1>
        <p className="text-base text-neutral-500 leading-relaxed max-w-md">
          A space for thoughts, explorations, and everything in between.
        </p>
        <SignedIn>
          <Link
            href="/create-blog"
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Write a post
          </Link>
        </SignedIn>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* Blog feed */}
      <Blogs />
    </div>
  );
};

export default page;
