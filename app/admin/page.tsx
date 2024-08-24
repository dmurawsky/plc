"use client";
import React, { useCallback, useState } from "react";

interface Admin {
  email: string;
  name: string;
}

export default function AdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const handleAddAdmin = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const newAdmin: Admin = {
        email: formData.get("admin-email") as string,
        name: formData.get("admin-name") as string,
      };
      setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
      event.currentTarget.reset();
    },
    []
  );

  return (
    <div
      data-soil-id="848236aa-4ac2-4488-a2f1-4c1095955fef"
      className="flex flex-col p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Admin User Management</h1>
      <ul className="admin-user-list mb-4">
        {admins.map((admin, index) => (
          <li key={index} className="mb-2">
            {admin.name} ({admin.email})
          </li>
        ))}
      </ul>
      <form
        className="new-admin-form bg-white p-4 rounded shadow-md mb-4"
        onSubmit={handleAddAdmin}
      >
        <div className="mb-4">
          <label
            htmlFor="admin-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="admin-email"
            name="admin-email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="admin-name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="admin-name"
            name="admin-name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Admin
        </button>
      </form>
    </div>
  );
}
