"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("playerName");
    const lastScore = parseInt(localStorage.getItem("lastScore"), 10) || 0;
    const existingScores = JSON.parse(localStorage.getItem("leaderboard")) || [];

    if (name) {
      // Create an updated leaderboard with the new entry
      const updatedScores = [...existingScores, { name, score: lastScore }];
      
      // Sort the leaderboard in descending order by score
      updatedScores.sort((a, b) => b.score - a.score);
      
      // Save the updated leaderboard to localStorage
      localStorage.setItem("leaderboard", JSON.stringify(updatedScores));
      
      // Update the state to render the leaderboard
      setLeaderboard(updatedScores);
    }

    setPlayerName(name || "Player");
  }, []); // This effect runs once when the component mounts

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Rank</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{entry.name}</td>
                <td className="border border-gray-400 px-4 py-2">{entry.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No scores yet!</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Again
      </button>
    </div>
  );
}