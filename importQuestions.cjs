// importQuestions.cjs
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const questions = require("./public/questions.json"); // Corrige la ruta
// Importa las preguntas desde el archivo JSON

// Configuración igual a tu src/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyDOeeWMorvBHrgPdGp-Xg28UrbHO2P2OEM",
  authDomain: "test-frontend-b6721.firebaseapp.com",
  projectId: "test-frontend-b6721",
  storageBucket: "test-frontend-b6721.appspot.com",
  messagingSenderId: "208711899902",
  appId: "1:208711899902:web:23a5475df2f1c1e62423af",
  measurementId: "G-73YMEGCX2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importQuestions() {
  let count = 0;
  for (const q of questions) {
    if (q.question && q.options && q.options.length > 0 && q.category) {
      let correctAnswer = q.correctAnswer;
      if (typeof correctAnswer === "string" && Array.isArray(q.options)) {
        const idx = q.options.findIndex(
          (opt) => opt.trim() === correctAnswer.trim()
        );
        correctAnswer = idx !== -1 ? idx : 0;
      }
      await addDoc(collection(db, "questions"), {
        question: q.question,
        options: q.options,
        correctAnswer,
        category: q.category,
      });
      count++;
    }
  }
  console.log(`Importadas ${count} preguntas a Firestore.`);
}

importQuestions();
