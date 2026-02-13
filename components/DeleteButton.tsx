"use client";
import React, { useState } from "react";
import { TrashIcon } from "lucide-react";
import { deletePost } from "@/app/blogs/deleteAction";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const DeleteButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deletePost(id);
    setLoading(false);
    if (result.success) {
      toast.success("Post deleted successfully");
      setOpen(false);
    } else {
      toast.error("Failed to delete post");
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
        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
        aria-label="Delete post"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm rounded-2xl border-neutral-200 p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-2 text-center">
            <DialogHeader>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <TrashIcon className="h-5 w-5 text-red-500" />
              </div>
              <DialogTitle className="text-lg font-semibold text-neutral-900">
                Delete post
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-1">
                This action cannot be undone. Are you sure you want to
                permanently delete this post?
              </DialogDescription>
            </DialogHeader>
          </div>

          <DialogFooter className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 gap-2 sm:justify-center">
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
