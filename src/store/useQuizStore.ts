import { create } from "zustand";
import {
  collection,
  CollectionReference,
  getDocs,
  type DocumentData,
  addDoc as firebaseAddDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

interface QuizState {
  questions: Question[];
  userAnswers: number[];
  score: number;
  submitted: boolean;
  userName: string;
  setUserName: (name: string) => void;
  setAnswer: (questionIndex: number, optionIndex: number) => void;
  submitQuiz: () => void;
  fetchQuestions: () => Promise<void>;
  setUserAnswers: (answers: number[]) => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  userAnswers: [],
  score: 0,
  submitted: false,
  userName: "",
  setUserName: (name) => set({ userName: name }),

  fetchQuestions: async () => {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const questions: Question[] = querySnapshot.docs.map(
      (doc) => doc.data() as Question
    );
    set({ questions, score: 0, submitted: false, userAnswers: [] });
    set({
      questions,
      userAnswers: Array(questions.length).fill(-1), // -1 indica "sin responder"
    });
  },

  setAnswer: (questionIndex, optionIndex) =>
    set((state) => {
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[questionIndex] = optionIndex;
      return { userAnswers: updatedAnswers };
    }),

  setUserAnswers: (answers: number[]) => set({ userAnswers: answers }),

  submitQuiz: async () => {
    const { questions, userAnswers, userName } = get();
    let score = 0;

    questions.forEach((q, i) => {
      const userAnswerIndex = userAnswers[i];
      const correctIndex =
        typeof q.correctAnswer === "number"
          ? q.correctAnswer
          : q.options.findIndex((opt) => opt === q.correctAnswer);

      if (userAnswerIndex === correctIndex) {
        score++;
      }
    });

    await addDoc(collection(db, "results"), {
      timestamp: new Date(),
      score,
      total: questions.length,
      userAnswers,
      userName: userName || "Anónimo",
    });

    set({ score, submitted: true });
  },
}));

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string | number;
  category: string;
}

export interface Result {
  timestamp: Date;
  score: number;
  total: number;
  userAnswers: Record<number, number>;
  userName: string;
}

export interface ResultDocument extends DocumentData {
  timestamp: Date;
  score: number;
  total: number;
  userAnswers: Record<number, number>;
  userName: string;
}

export interface QuestionDocument extends DocumentData {
  question: string;
  options: string[];
  correctAnswer: string | number;
  category: string;
}

async function addDoc(
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  data: {
    timestamp: Date;
    score: number;
    total: number;
    userAnswers: Record<number, number>;
    userName: string;
  }
) {
  // Convert Date to Firestore Timestamp if needed
  const docData = {
    ...data,
    timestamp:
      data.timestamp instanceof Date
        ? data.timestamp
        : new Date(data.timestamp),
  };
  return await firebaseAddDoc(collectionRef, docData);
}
