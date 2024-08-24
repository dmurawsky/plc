"use client";

import { useCallback, useState, useEffect } from "react";

export function Timer() {
  const [time, setTime] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, isPaused, time]);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }, []);

  const handleStop = useCallback(() => {
    setIsActive(false);
    setTime(300);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <section
      data-soil-id="HomePage"
      className="flex flex-col p-4 text-center relative"
    >
      <div className="animate__animated animate__bounceInDown flex flex-col items-center">
        <h1 className="text-4xl text-green-800">Putnam Land Conservancy</h1>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl">Be back in {formatTime(time)}</h2>
        <div className="mt-4">
          <button
            onClick={handleStart}
            className="mr-4 p-2.5 bg-green-600 text-white rounded-lg border border-green-800 hover:bg-green-700"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="mr-4 p-2.5 bg-yellow-600 text-white rounded-lg border border-yellow-800 hover:bg-yellow-700"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleStop}
            className="p-2.5 bg-red-600 text-white rounded-lg border border-red-800 hover:bg-red-700"
          >
            Stop
          </button>
        </div>
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
}
