"use client";

import React, { useCallback } from "react";

export default function SupportPage() {
  const handleDonateClick = useCallback((): void => {
    alert("Thank you for your donation!");
  }, []);

  return (
    <div
      data-soil-id="964b9238-f2dd-4ddb-89d1-853a9bea6023"
      className="flex flex-col p-4"
    >
      <h1>Support Putname Land Conservancy</h1>
      <p>
        We appreciate your support in preserving our natural landscapes. Your
        donation helps us maintain and protect these vital areas for future
        generations.
      </p>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        onClick={handleDonateClick}
      >
        Donate Now
      </button>
    </div>
  );
}
