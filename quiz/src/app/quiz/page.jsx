"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import quizData from "@/data/quizData"; // Make sure quizData is correct

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("playerName");
    if (!name) {
      router.push("/"); // Redirect to home if no name is found
      return;
    }
    setPlayerName(name);
  }, [router]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      localStorage.setItem("lastScore", score); // Save last score
      router.push("leaderboard"); // Redirect to leaderboard
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Hello, {playerName}!</h1>
      <div className="w-1/2 bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-4">{quizData[currentQuestion].question}</h2>
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="block w-full text-left p-2 mb-2 border rounded hover:bg-blue-100"
          >
            {option}
          </button>
        ))}
        <p className="mt-4">Score: {score}</p>
      </div>
    </div>
  );
}
