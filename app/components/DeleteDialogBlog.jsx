// components/DeleteDialogBox.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming you have these Shadcn UI components

const DeleteDialogBlog = ({ open, onOpenChange, onConfirm, title, description }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            {title || "Confirm Deletion"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-700 py-4">
          {description || "Are you sure you want to delete this item? This action cannot be undone."}
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)} // Close dialog on cancel
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Call the passed onConfirm function
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogBlog;