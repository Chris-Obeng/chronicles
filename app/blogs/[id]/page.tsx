import React from "react";
import { getBlogById } from "./actions";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const blog = await getBlogById(id);

  if (blog && "error" in blog) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
        <p className="text-sm text-red-600">{blog.error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-400 text-sm">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      {/* Back navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <time className="block text-xs font-medium text-neutral-400 tracking-wide uppercase">
          {blog.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
          {blog.title}
        </h1>
      </header>

      {/* Divider */}
      <div className="border-t border-neutral-100" />

      {/* Content */}
      <div className="prose prose-neutral prose-sm max-w-none">
        <p className="text-base text-neutral-600 leading-[1.8] whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>
    </article>
  );
};

export default page;
