import React from "react";
import Link from "next/link";
import { getBlogs } from "./actions";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import StopPropagation from "@/components/StopPropagation";
import { currentUser } from "@clerk/nextjs/server";

const Blogs = async () => {
  const user = await currentUser();
  const clerkUserId = user?.id;

  const blogs = await getBlogs();

  if ("error" in blogs) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
        <p className="text-sm text-red-600">{blogs.error}</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-400 text-sm">
          No posts yet. Be the first to write something.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0 divide-y divide-neutral-100">
      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`} className="group block">
          <article className="relative py-6 first:pt-0 last:pb-0">
            {/* Action buttons — top right */}
            {clerkUserId === blog.userId && (
              <StopPropagation className="absolute top-6 right-0 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <EditButton
                  id={blog.id}
                  currentTitle={blog.title}
                  currentContent={blog.content ?? ""}
                />
                <DeleteButton id={blog.id} />
              </StopPropagation>
            )}

            {/* Date */}
            <time className="block text-xs font-medium text-neutral-400 tracking-wide uppercase mb-2">
              {blog.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>

            {/* Title */}
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug pr-20">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-1.5 text-sm text-neutral-500 line-clamp-2 leading-relaxed pr-20">
              {blog.content}
            </p>

            {/* Read more hint */}
            <span className="inline-block mt-3 text-xs font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors">
              Read more &rarr;
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
