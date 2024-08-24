"use client";

import { useSoilContext } from "@/services/soil/context";
import { Dialog } from "@/components/dialog";
import { useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEditorState } from "@/services/client-side/useEditorState";

export function EditorModal() {
  const { editingDataKey, setEditingDataKey } = useSoilContext();
  const { title, setTitle, content, setContent, handleSave } =
    useEditorState(editingDataKey);

  const handleClose = useCallback(() => {
    setEditingDataKey(undefined);
  }, [setEditingDataKey]);

  return (
    <Dialog
      open={Boolean(editingDataKey)}
      onClose={handleClose}
      className="relative"
    >
      <div className="absolute right-8 top-8 sm:block">
        <button
          type="button"
          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <form onSubmit={handleSave}>
        <input
          placeholder="Title"
          className="mb-2"
          maxLength={100}
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          className="mb-2"
          onChange={({ target: { value } }) => setContent(value)}
          rows={9}
          maxLength={900}
        />
        <div className="mt-4">
          <button type="submit" className="w-full uppercase">
            Save
          </button>
        </div>
      </form>
    </Dialog>
  );
}
