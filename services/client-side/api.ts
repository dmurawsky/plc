import axios from "axios";
import { AddAdminPayload } from "@/services/types";
import { forgotPassword, getIdToken } from "@/services/soil/auth";
import { toast } from "react-toastify";

export async function addAdmin(email: string, displayName: string) {
  try {
    const token = await getIdToken();
    const { data } = await axios.post(
      "/api/admin",
      {
        email,
        displayName,
      } as AddAdminPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await forgotPassword(email);

    toast.success("Admin added successfully");

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error("Failed to create user");
    throw error;
  }
}

export async function getAdmins() {
  const token = await getIdToken();
  const { data } = await axios.get("/api/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export async function fetchUsers() {
  try {
    const token = await getIdToken();
    const { data } = await axios.get("/api/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Users fetched successfully");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users");
    throw error;
  }
}

export async function updateAdminUser(
  uid: string,
  email: string,
  displayName: string
) {
  try {
    const token = await getIdToken();
    await axios.put(
      "/api/admin",
      { uid, email, displayName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user");
    throw error;
  }
}

export async function deleteAdminUser(uid: string) {
  try {
    const token = await getIdToken();
    await axios.delete("/api/admin", {
      data: { uid },
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
    throw error;
  }
}

export async function getData<T>(dataKey: string) {
  return axios
    .get<T>(
      `https://putnam-land-default-rtdb.firebaseio.com/publicData/${dataKey}.json`
    )
    .then((res) => res.data);
}
