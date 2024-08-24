"use client";

import React, { useCallback } from 'react';

interface StaffMember {
  name: string;
  position: string;
}

export default function StaffPage() {
  const staffMembers: StaffMember[] = [
    { name: 'John Doe', position: 'Manager' },
    { name: 'Jane Smith', position: 'Developer' },
    { name: 'Alice Johnson', position: 'Designer' },
    { name: 'Bob Brown', position: 'Sales' }
  ];

  const renderStaffMember = useCallback((member: StaffMember, index: number) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
      <p className="text-gray-700">{member.position}</p>
    </div>
  ), []);

  return (
    <div 
      data-soil-id="aa9db045-d7d4-4de7-aea9-8f8842a70ed6" 
      className="min-h-screen p-4 bg-gray-100"
    >
      <h1 className="text-2xl font-bold text-center mb-4">Staff Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {staffMembers.map(renderStaffMember)}
      </div>
    </div>
  );
}
