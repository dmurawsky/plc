import axios from "axios";
import { AddAdminPayload } from "@/services/types";
import { forgotPassword, getIdToken } from "@/services/soil/auth";
import { toast } from "react-toastify";

export async function addAdmin(email: string, displayName: string) {
  const token = await getIdToken();
  const { data } = await axios.post("/api/add-admin", {
    token,
    email,
    displayName,
  } as AddAdminPayload);

  await forgotPassword(email);

  toast.success("Admin added successfully");

  return data;
}
