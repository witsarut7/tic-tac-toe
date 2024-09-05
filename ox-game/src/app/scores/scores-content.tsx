"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Scores() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVICE_URL}/api/scores`)
        .then((response) => {
          setData(response.data.scores);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;

  return (
    <>
      <main className="p-8 font-sans">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Player Scores
        </h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 text-gray-600">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr key={value.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-center">
                  {value.user.name}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  {value.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => {
            router.replace("/game", { scroll: true });
          }}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors"
        >
          Back to game
        </button>
      </div>
    </>
  );
}
