import { useEffect } from "react";
import { useQuizStore } from "../store/useQuizStore";

interface QuizPageProps {
  questions: import("../store/useQuizStore").Question[];
  onFinish: () => void;
}

function QuizPage({ questions, onFinish }: QuizPageProps) {
  const {
    userAnswers,
    score,
    submitted,
    setAnswer,
    submitQuiz,
    userName,
    setUserName,
    setUserAnswers,
  } = useQuizStore();

  // Inicializar userAnswers con la longitud correcta al montar el quiz
  useEffect(() => {
    if (userAnswers.length !== questions.length) {
      setUserAnswers(Array(questions.length).fill(-1));
    }
    // eslint-disable-next-line
  }, [questions]);

  const getOptionStyle = (
    questionIdx: number,
    optionIdx: number,
    correctIdx: number
  ) => {
    if (!submitted) return "";

    if (optionIdx === correctIdx) return "bg-green-200";
    if (userAnswers[questionIdx] === optionIdx) return "bg-red-200";
    return "";
  };

  if (questions.length === 0)
    return <p>No hay preguntas para esta categoría.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cuestionario</h1>

      {/* Campo para ingresar el nombre */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Tu nombre:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={submitted}
          placeholder="Escribe tu nombre para aparecer en el ranking"
        />
      </div>

      {/* Lista de preguntas fijas */}
      {questions.map((q, i) => {
        const correctIndex =
          typeof q.correctAnswer === "number"
            ? q.correctAnswer
            : q.options.findIndex((opt) => opt === q.correctAnswer);

        return (
          <div key={i} className="mb-4 p-4 border rounded shadow">
            <pre className="font-semibold mb-2">{q.question}</pre>
            {/* Radios sin <li> */}
            <div>
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center space-x-2 mb-2 ${getOptionStyle(
                    i,
                    idx,
                    correctIndex
                  )}`}
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    checked={userAnswers[i] === idx}
                    disabled={submitted}
                    onChange={() => setAnswer(i, idx)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {/* Botón de enviar */}
      {!submitted && (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={() => {
            submitQuiz();
            onFinish();
          }}
          disabled={
            userAnswers.length !== questions.length || userAnswers.includes(-1)
          }
        >
          Enviar respuestas
        </button>
      )}

      {!submitted &&
        (userAnswers.length !== questions.length ||
          userAnswers.includes(-1)) && (
          <p className="mt-2 text-red-600">
            ⚠️ Responde todas las preguntas antes de enviar.
          </p>
        )}

      {submitted && (
        <div className="mt-4 text-xl font-bold text-green-600">
          ✅ Obtuviste {score} de {questions.length} correctas.
        </div>
      )}
    </div>
  );
}

export default QuizPage;
