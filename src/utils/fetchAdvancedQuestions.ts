// src/utils/fetchAdvancedQuestions.ts

/**
 * Descarga el markdown de preguntas avanzadas desde GitHub y extrae las preguntas en formato básico.
 * Este ejemplo extrae solo las primeras 3 preguntas para demostración.
 */

export interface AdvancedQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: string;
  source: string;
}

export async function fetchAdvancedQuestions(): Promise<AdvancedQuestion[]> {
  const url = "../../public/questions.json";
  const res = await fetch(url);
  const md = await res.text();

  // Expresión regular para extraer bloques de preguntas tipo "¿Cuál es el resultado?" con opciones y respuesta
  const regex =
    /###### (\d+). ([^\n]+)\n+```javascript\n([\s\S]*?)```\n+([\s\S]*?)- A: ([^\n]+)\n- B: ([^\n]+)\n- C: ([^\n]+)\n- D: ([^\n]+)\n[\s\S]*?Respuesta correcta: ([A-D])/g;

  const questions: AdvancedQuestion[] = [];
  let match;
  let count = 1;
  while ((match = regex.exec(md)) && count <= 3) {
    // Solo 3 para demo
    questions.push({
      id: count,
      question: `${match[2]}\n\n${match[3]}`.trim(),
      options: [
        `A: ${match[5]}`,
        `B: ${match[6]}`,
        `C: ${match[7]}`,
        `D: ${match[8]}`,
      ],
      answer: match[9],
      explanation: "", // Se puede mejorar extrayendo la explicación
      difficulty: "advanced",
      source: url + `#L${match.index}`,
    });
    count++;
  }
  return questions;
}
