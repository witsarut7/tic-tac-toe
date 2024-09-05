"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { logout } from "./action";
import { useRouter } from "next/navigation";

// Initialize board and winning combinations
const initialBoard = Array(9).fill(null);
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board: string[]) => {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isBoardFull = (board: string[]) => {
  return board.every((cell) => cell !== null);
};

export default function GameContent(userData: {
  id: number;
  image: string;
  name: string;
}) {
  const router = useRouter();
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("");
  const [playerPoints, setPlayerPoints] = useState(0);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const imageUrl = userData.image.replace(/^"|"$/g, "");

  const updateScore = async (points: number) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/scores`,
      {
        userId: userData.id,
        points: points,
      }
    );

    if (res.data.status != 200) {
      console.error("Failed to update score");
    }
  };

  // Handle the player's move
  const handlePlayerMove = (index: number) => {
    if (board[index] || checkWinner(board) || !isPlayerTurn) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // Bot's move
  const botMove = () => {
    const availableMoves = board
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null) as number[];

    if (availableMoves.length > 0) {
      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = board.slice();
      newBoard[randomMove] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      if (winner === "X") {
        setMessage("Player wins!");
        const newConsecutiveWins = consecutiveWins + 1;
        let newPoints = playerPoints + 1;

        // Bonus point for winning 3 times in a row
        if (newConsecutiveWins === 3) {
          newPoints += 1;
          setConsecutiveWins(0); // Reset consecutive wins
          updateScore(2);
        } else {
          setConsecutiveWins(newConsecutiveWins);
          updateScore(1);
        }

        setPlayerPoints(newPoints);
      } else {
        setMessage("Bot wins!");
        const newPoints = playerPoints - 1;
        if (newPoints >= 0) {
          setPlayerPoints(newPoints);
          setConsecutiveWins(0); // Reset consecutive wins
          updateScore(-1);
        }
      }
    } else if (isBoardFull(board)) {
      setMessage("It's a tie!");
    } else if (!isPlayerTurn) {
      setTimeout(botMove, 500);
    }
  }, [board, isPlayerTurn]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setMessage("");
  };

  const handleLogout = async () => {
    await logout();
    return false;
  };

  return (
    <>
      <div className="flex items-center gap-5 p-3 justify-between bg-black">
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl}
            alt={userData.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-gray-300"
          />
          <span className="text-xl font-semibold text-white">
            {userData.name}
          </span>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="justify-end items-end mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">OX Game</h1>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handlePlayerMove(index)}
              className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg text-2xl font-bold flex items-center justify-center hover:bg-gray-200 transition-colors disabled:bg-gray-100"
              disabled={!!value || !!message}
            >
              {value}
            </button>
          ))}
        </div>

        <p className="text-lg text-gray-600 mb-4">{message}</p>
        <p className="text-xl font-semibold text-gray-700 mb-6">
          Points: {playerPoints}
        </p>
        <p className="text-xl font-semibold text-gray-700 mb-6">
          Continuous win: {consecutiveWins}
        </p>

        <div className="flex gap-5">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/scores");
            }}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            All player scores
          </button>
        </div>
      </div>
    </>
  );
}
