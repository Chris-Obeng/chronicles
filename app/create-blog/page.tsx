"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createPost } from "./actions";

const CreateBlog = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createPost(formData);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result?.success || "Post created!");
    formRef.current?.reset();
    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back
      </Link>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Write a new post
        </h1>
        <p className="text-sm text-neutral-500">
          Share something interesting with the world.
        </p>
      </div>

      {/* Form */}
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-neutral-700"
          >
            Title
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Give your post a title..."
            className="h-11 rounded-xl border-neutral-200 bg-white focus-visible:ring-neutral-900 focus-visible:ring-1 placeholder:text-neutral-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="content"
            className="text-sm font-medium text-neutral-700"
          >
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Start writing..."
            className="min-h-[240px] rounded-xl border-neutral-200 bg-white focus-visible:ring-neutral-900 focus-visible:ring-1 resize-y placeholder:text-neutral-300 leading-relaxed"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full transition-colors"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
