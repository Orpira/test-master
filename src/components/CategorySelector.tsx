import { useEffect, useState } from "react";
import { useQuizStore } from "../store/useQuizStore";

interface CategorySelectorProps {
  onStart: (category: string, numQuestions: number, difficulty: string) => void;
}

export default function CategorySelector({ onStart }: CategorySelectorProps) {
  const { questions, fetchQuestions } = useQuizStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("normal");

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Obtener categorías únicas y agregar 'JavaScript' si no existe
  const categories = Array.from(
    new Set([...questions.map((q) => q.category), "JavaScript"])
  );

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Selecciona tu quiz</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Categoría:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Elige una categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Número de preguntas:</label>
        <select
          className="w-full p-2 border rounded"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        >
          {[5, 15, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Nivel de dificultad:</label>
        <select
          className="w-full p-2 border rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 w-full"
        onClick={() => onStart(selectedCategory, numQuestions, difficulty)}
        disabled={!selectedCategory}
      >
        Comenzar
      </button>
    </div>
  );
}
