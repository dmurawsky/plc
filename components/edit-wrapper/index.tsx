import { PropsWithChildren } from "react";
import { EditingToggle } from "../editing-toggle";

function EditWrapper({
  children,
  dataKey,
}: PropsWithChildren<{ dataKey: string }>) {
  return (
    <>
      <EditingToggle dataKey={dataKey} />
      {children}
    </>
  );
}

export default EditWrapper;
