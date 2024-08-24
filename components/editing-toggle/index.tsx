import { useCallback } from "react";
import { useSoilContext } from "@/services/soil/context";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export function EditingToggle({ dataKey }: { dataKey: string }) {
  const { editingDataKey, setEditingDataKey } = useSoilContext();

  const handleToggle = useCallback(
    () => setEditingDataKey((prev) => (prev ? undefined : dataKey)),
    [setEditingDataKey, dataKey]
  );

  return (
    <button className="absolute top-4 right-4" onClick={handleToggle}>
      <PencilSquareIcon
        className={editingDataKey ? "text-green-900" : "text-green-300"}
      />
    </button>
  );
}
