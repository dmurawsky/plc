"use client";

import React, { useCallback } from "react";

export default function Page() {
  const renderList = useCallback((): JSX.Element => {
    return (
      <ul>
        <li>Finance</li>
        <li>Fundraiser</li>
        <li>Project</li>
      </ul>
    );
  }, []);

  return (
    <div
      data-soil-id="8fcb9a40-9535-4c95-b97b-5243c0b677d2"
      className="text-black dark:text-white flex flex-col p-4"
    >
      <h1>Committees</h1>
      {renderList()}
    </div>
  );
}
