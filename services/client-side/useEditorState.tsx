import { useState, useEffect, useCallback, FormEvent } from "react";
import { get, set } from "@/services/soil/firebase";
import { toast } from "react-toastify";
import { TitleAndContent } from "../types";

export function useEditorState(
  /** This can either be the key to page data or a nested key to a list item on that page */
  dataKey?: string
) {
  const [data, setData] = useState<TitleAndContent | null>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (dataKey) {
      get<TitleAndContent>(`publicData/${dataKey}`).then((d) => {
        setData(d);
        setTitle(d?.title || "");
        setContent(d?.content || "");
      });
    }
  }, [dataKey]);

  const handleSave = useCallback(
    async (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      if (!dataKey) throw Error("dataKey is required");

      const now = Date.now();

      await set<TitleAndContent>(
        `publicData/${dataKey}`,
        data
          ? { ...data, title, content, updateAt: now }
          : { title, content, createdAt: now }
      );

      toast.success("Saved!");
    },
    [title, content, data, dataKey]
  );

  return { title, setTitle, content, setContent, handleSave };
}
