import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export function Ranking() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function fetchResults() {
      const q = query(
        collection(db, "results"),
        orderBy("score", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setResults(data);
    }

    fetchResults();
  }, []);

  return (
    <div className="mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">🏆 Ranking</h2>
      <ol className="list-decimal ml-6">
        {results.map((r, i) => (
          <li key={i}>
            {r.userName || "Anónimo"} — {r.score} / {r.total} —{" "}
            {new Date(r.timestamp?.seconds * 1000).toLocaleString()}
          </li>
        ))}
      </ol>
    </div>
  );
}
