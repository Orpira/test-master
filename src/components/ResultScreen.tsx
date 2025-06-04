import { useQuizStore } from "../store/useQuizStore";

interface ResultScreenProps {
  questions: import("../store/useQuizStore").Question[];
  onRestart: () => void;
}

export default function ResultScreen({
  questions,
  onRestart,
}: ResultScreenProps) {
  const { score, userAnswers, userName } = useQuizStore();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resultados</h1>
      <div className="mb-4 text-lg">
        <strong>Nombre:</strong> {userName || "Anónimo"}
      </div>
      <div className="mb-4 text-lg">
        <strong>Puntuación:</strong> {score} de {questions.length}
      </div>
      <ul className="mb-6">
        {questions.map((q, i) => {
          const correctIndex =
            typeof q.correctAnswer === "number"
              ? q.correctAnswer
              : q.options.findIndex((opt) => opt === q.correctAnswer);
          const userIndex = userAnswers[i];
          return (
            <li key={i} className="mb-2">
              <div className="font-semibold">{q.question}</div>
              <div>
                Tu respuesta:{" "}
                {userIndex !== -1 ? q.options[userIndex] : "Sin responder"}
                {userIndex === correctIndex ? (
                  <span className="ml-2 text-green-600">✔️</span>
                ) : (
                  <span className="ml-2 text-red-600">❌</span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Respuesta correcta:{" "}
                {q.options.map((opt, idx) => (
                  <span
                    key={idx}
                    className={
                      idx === correctIndex
                        ? "font-bold text-green-700 bg-green-100 px-1 rounded"
                        : ""
                    }
                  >
                    {idx === correctIndex ? <b>{opt}</b> : opt}
                    {idx < q.options.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <ResultForm />
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onRestart}
      >
        Volver a empezar
      </button>
    </div>
  );
}

function ResultForm() {
  const { score, userName, userAnswers } = useQuizStore();
  return (
    <form
      action="https://formsubmit.co/your@email.com"
      method="POST"
      className="mb-6"
    >
      <input type="hidden" name="nombre" value={userName} />
      <input type="hidden" name="puntuacion" value={score} />
      <input
        type="hidden"
        name="respuestas"
        value={JSON.stringify(userAnswers)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-2"
      >
        Enviar mis resultados
      </button>
    </form>
  );
}
