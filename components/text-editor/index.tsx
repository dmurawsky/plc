"use client";

// Services
import { useEditorState } from "@/services/client-side/useEditorState";
import { useSoilContext } from "@/services/soil/context";

// Components
import ReactMarkdown from "react-markdown";

export function TextEditor() {
  const { isEditing } = useSoilContext();

  return (
    <div
      data-soil-id="05ee6172-ffa6-4195-b1a0-fb4f03ae525a"
      className="flex flex-col p-4"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full p-2 border rounded"
      />
    </div>
  );
}

export function AdminTextEditor({ dataKey }: { dataKey: string }) {
  const { isAdmin, isEditing } = useSoilContext();
  const { title, setTitle, content, setContent, handleSave } =
    useEditorState(dataKey);

  if (!isAdmin || isEditing) {
    return (
      <ReactMarkdown className="prose prose-green">{content}</ReactMarkdown>
    );
  }

  return { TitleEditor, ContentEditor };
}
