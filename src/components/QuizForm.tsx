import { useState, useEffect } from "react";
import { useQuizStore } from "../store/useQuizStore";
// Componente para mostrar un formulario de quiz
// que permite a los usuarios responder preguntas y enviar sus respuestas

function QuizForm() {
  const { questions, fetchQuestions } = useQuizStore();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [respuestas, setRespuestas] = useState<string[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Actualiza la respuesta seleccionada para cada pregunta
  const handleRespuesta = (idx: number, value: string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[idx] = value;
    setRespuestas(nuevasRespuestas);
  };

  // Serializa las respuestas para enviarlas en el formulario
  const respuestasSerializadas = questions.map((q, idx) => ({
    pregunta: q.question,
    respuesta: respuestas[idx] || "",
  }));

  return (
    <form
      action="https://formsubmit.co/orpira@hotmail.com"
      method="POST"
      className="space-y-4 max-w-xl mx-auto"
    >
      <input
        type="text"
        name="nombre"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="input input-bordered w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input input-bordered w-full"
      />

      {questions.map((q, idx) => (
        <div key={idx} className="mb-4">
          <div className="font-bold">{q.question}</div>
          <div>
            {q.options.map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={`respuesta_${idx}`}
                  value={opt}
                  checked={respuestas[idx] === opt}
                  onChange={() => handleRespuesta(idx, opt)}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Campo oculto para serializar todas las respuestas */}
      <input
        type="hidden"
        name="respuestas"
        value={JSON.stringify(respuestasSerializadas)}
      />

      <input type="hidden" name="_next" value="https://tusitio.com/gracias" />
      <input type="hidden" name="_captcha" value="false" />
      <button type="submit" className="btn btn-primary w-full">
        Enviar respuestas
      </button>
    </form>
  );
}

export default QuizForm;
