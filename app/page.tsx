"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE = 100;

const Home: React.FC = () => {
  const handleLinkClick = useCallback(() => {
    // Add any logic needed for the link click here
  }, []);

  return (
    <section
      data-soil-id="HomePage"
      className="flex flex-col p-4 text-center relative"
    >
      <div className="animate__animated animate__bounceInDown flex flex-col items-center">
        <h1 className="text-4xl text-green-800">Putnam Land Conservancy</h1>
      </div>

      <a
        href="https://putnamlandconservancy.org/get-involved"
        target="_blank"
        className="mt-8 p-2.5 bg-green-600 text-white rounded-lg border border-green-800 hover:bg-green-700"
        rel="noopener noreferrer"
      >
        Get Involved
      </a>
    </section>
  );
};

export default Home;
