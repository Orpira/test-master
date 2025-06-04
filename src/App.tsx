import { useEffect, useState } from "react";
import { useQuizStore } from "./store/useQuizStore";
import CategorySelector from "./components/CategorySelector";
import QuizPage from "./components/QuizPage";
import { useAuth0 } from "@auth0/auth0-react";
// Make sure the file exists as ResultScreen.tsx or adjust the import if the file is named differently
import ResultScreen from "./components/ResultScreen";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { fetchAdvancedQuestions } from "./utils/fetchAdvancedQuestions";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { questions, fetchQuestions } = useQuizStore();
  const [quizConfig, setQuizConfig] = useState<{
    category: string;
    numQuestions: number;
    selectedQuestions: typeof questions;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingAdvanced, setLoadingAdvanced] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/tipotest", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Nuevo handleStart con dificultad
  const handleStart = async (
    category: string,
    numQuestions: number,
    difficulty: string = "normal"
  ) => {
    if (difficulty === "advanced") {
      setLoadingAdvanced(true);
      const advanced = await fetchAdvancedQuestions();
      // Adaptar las preguntas avanzadas al formato Question
      const selectedQuestions = advanced
        .sort(() => Math.random() - 0.5)
        .slice(0, numQuestions)
        .map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
          category: category || "Avanzado",
        }));
      setQuizConfig({ category, numQuestions, selectedQuestions });
      setLoadingAdvanced(false);
      setShowResults(false);
    } else {
      const filtered = questions.filter((q) => q.category === category);
      const shuffled = filtered.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, numQuestions);
      setQuizConfig({ category, numQuestions, selectedQuestions });
      setShowResults(false);
    }
  };

  const handleQuizFinish = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? (
        <Head logo="./logo.png" title="Movies React" />
      ) : (
        <NavbarGuest />
      )}
      {!quizConfig && !loadingAdvanced ? (
        <CategorySelector onStart={handleStart} />
      ) : showResults ? (
        <ResultScreen
          onRestart={() => setQuizConfig(null)}
          questions={quizConfig!.selectedQuestions}
        />
      ) : (
        quizConfig && (
          <QuizPage
            questions={quizConfig.selectedQuestions}
            onFinish={handleQuizFinish}
          />
        )
      )}
    </div>
  );
}
export default App;
