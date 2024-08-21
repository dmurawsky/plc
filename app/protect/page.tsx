"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const [content, setContent] = useState<string>(
    "# Protecting the Land in Putnam County\n\nPutnam County is home to a variety of natural resources that need to be protected."
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = useCallback((): void => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <div
      data-soil-id="05ee6172-ffa6-4195-b1a0-fb4f03ae525a"
      className="flex flex-col p-4"
    >
      <div className="w-full flex justify-end p-2">
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-2 border rounded"
        />
      ) : (
        <ReactMarkdown className="prose prose-green">{content}</ReactMarkdown>
      )}
    </div>
  );
}
