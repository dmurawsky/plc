"use client";

import React, { useState, useCallback } from "react";

interface Officer {
  name: string;
  position: string;
}

const initialOfficers: Officer[] = [
  { name: "Officer Name 1", position: "Position" },
  { name: "Officer Name 2", position: "Position" },
  { name: "Officer Name 3", position: "Position" },
];

export default function OfficersPage() {
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (index: number, field: keyof Officer, value: string) => {
      const newOfficers = [...officers];
      newOfficers[index][field] = value;
      setOfficers(newOfficers);
    },
    [officers]
  );

  const renderOfficer = useCallback(
    (officer: Officer, index: number) => (
      <div
        key={officer.name}
        className="bg-white border border-gray-300 p-4 rounded-lg shadow-md text-center"
      >
        <div className="mb-2 w-24 h-24 bg-zinc-100" />
        {isEditing ? (
          <>
            <input
              type="text"
              value={officer.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="block w-full mb-2 border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              value={officer.position}
              onChange={(e) =>
                handleInputChange(index, "position", e.target.value)
              }
              className="block w-full mb-2 border border-gray-300 rounded-md p-2"
            />
          </>
        ) : (
          <>
            <div className="text-lg font-medium mb-2">{officer.name}</div>
            <div className="text-gray-500">{officer.position}</div>
          </>
        )}
      </div>
    ),
    [handleInputChange, isEditing]
  );

  return (
    <div
      data-soil-id="f52a9d19-283f-4428-b1e3-6026b7933273"
      className="relative flex flex-col p-4"
    >
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <h1 className="text-3xl font-bold mb-6">
        Officers of the Putnam Land Conservancy
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {officers.map(renderOfficer)}
      </div>
    </div>
  );
}
