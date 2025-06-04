// Este archivo contendrá preguntas avanzadas de JavaScript extraídas del repositorio lydiahallie/javascript-questions
// Puedes agregar más preguntas siguiendo este formato

export const advancedQuestions = [
  {
    id: 1,
    question: `¿Qué devuelve la siguiente función?\n\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = "Lydia";\n  let age = 21;\n}\n\nsayHi();`,
    options: [
      "A: Lydia y undefined",
      "B: Lydia y ReferenceError",
      "C: ReferenceError y 21",
      "D: undefined y ReferenceError",
    ],
    answer: "D",
    explanation:
      "La variable name está declarada con var, por lo que es hoisted pero su valor es undefined hasta la asignación. age está declarada con let, por lo que no está disponible antes de la declaración (temporal dead zone).",
    difficulty: "advanced",
    source:
      "https://github.com/lydiahallie/javascript-questions/blob/main/es-ES/README-ES.md#L40-L61",
  },
  {
    id: 2,
    question: `¿Cuál es el resultado?\n\nconst obj = { a: "one", b: "two", a: "three" };\nconsole.log(obj);`,
    options: [
      'A: { a: "one", b: "two" }',
      'B: { b: "two", a: "three" }',
      'C: { a: "three", b: "two" }',
      "D: SyntaxError",
    ],
    answer: "C",
    explanation:
      "Si una propiedad se repite, la última sobrescribe a las anteriores.",
    difficulty: "advanced",
    source:
      "https://github.com/lydiahallie/javascript-questions/blob/main/es-ES/README-ES.md#L764-L779",
  },
  // ...puedes agregar más preguntas siguiendo este formato
];
