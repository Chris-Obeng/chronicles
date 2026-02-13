"use client";
import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import { updatePost } from "@/app/blogs/updateAction";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditButtonProps {
  id: string;
  currentTitle: string;
  currentContent: string;
}

const EditButton = ({ id, currentTitle, currentContent }: EditButtonProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    setLoading(true);
    const result = await updatePost(id, title, content);
    setLoading(false);
    if ("success" in result) {
      toast.success("Post updated successfully");
      setOpen(false);
    } else {
      toast.error("Failed to update post");
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
        aria-label="Edit post"
      >
        <PencilIcon className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl border-neutral-200 p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-2">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                Edit post
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500">
                Make changes to your post below.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 px-6 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="edit-title"
                className="text-sm font-medium text-neutral-700"
              >
                Title
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="h-11 rounded-xl border-neutral-200 bg-white focus-visible:ring-neutral-900 focus-visible:ring-1 placeholder:text-neutral-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-content"
                className="text-sm font-medium text-neutral-700"
              >
                Content
              </Label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content..."
                rows={6}
                className="rounded-xl border-neutral-200 bg-white focus-visible:ring-neutral-900 focus-visible:ring-1 resize-none placeholder:text-neutral-300 leading-relaxed"
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 gap-2">
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
