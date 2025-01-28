"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [isClient, setIsClient] = useState(false); // Ensure we're client-side
  const router = useRouter();

  // Use useEffect to wait until the component is mounted on the client
  useEffect(() => {
    setIsClient(true); // Mark as client-side after component mounts
  }, []);

  const handleStart = () => {
    if (!name) {
      alert("Please enter your name!");
      return;
    }
    localStorage.setItem("playerName", name);

    router.push("/quiz"); 
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}