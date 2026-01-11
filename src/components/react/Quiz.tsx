import { useState, useEffect } from "react";
import {
  type QuizQuestion,
  getQuizState,
  saveQuizState,
  clearQuizState,
  isAnswerCorrect,
  calculateScore,
  isQuizPassed,
} from "@/lib/quiz";
import { saveQuizScore } from "@/lib/progress";

interface QuizProps {
  quizId: string;
  moduleSlug: string;
  questions: QuizQuestion[];
  passingScore?: number;
  allowRetry?: boolean;
}

export default function Quiz({
  quizId,
  moduleSlug,
  questions,
  passingScore = 70,
  allowRetry = true,
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = getQuizState(moduleSlug, quizId);
    if (saved) {
      setAnswers(saved.answers);
      setSubmitted(saved.submitted);
      setScore(saved.score);
    }
    setIsLoaded(true);
  }, [moduleSlug, quizId]);

  // Save state when answers change
  useEffect(() => {
    if (isLoaded) {
      saveQuizState(moduleSlug, quizId, {
        answers,
        submitted,
        score,
        completedAt: submitted ? new Date().toISOString() : undefined,
      });
    }
  }, [answers, submitted, score, moduleSlug, quizId, isLoaded]);

  const question = questions[currentQuestion];
  const userAnswer = answers[question.id];
  const isCorrect = userAnswer ? isAnswerCorrect(question, userAnswer) : false;

  const handleSelectAnswer = (optionId: string) => {
    if (showExplanation) return;

    if (question.type === "multiple-select") {
      const current = (answers[question.id] as string[]) || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      setAnswers({ ...answers, [question.id]: updated });
    } else {
      setAnswers({ ...answers, [question.id]: optionId });
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const finalScore = calculateScore(questions, answers);
      setScore(finalScore);
      setSubmitted(true);

      // Save to progress
      saveQuizScore(`${moduleSlug}-${quizId}`, finalScore);

      // Trigger confetti if passed
      if (isQuizPassed(finalScore, passingScore)) {
        triggerConfetti();
      }
    }
  };

  const handleRetry = () => {
    clearQuizState(moduleSlug, quizId);
    setAnswers({});
    setCurrentQuestion(0);
    setShowExplanation(false);
    setSubmitted(false);
    setScore(0);
  };

  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="animate-pulse rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-dark-border dark:bg-dark-surface">
        <div className="h-6 w-1/3 rounded bg-neutral-200 dark:bg-dark-elevated" />
        <div className="mt-4 h-4 w-full rounded bg-neutral-200 dark:bg-dark-elevated" />
        <div className="mt-2 h-4 w-3/4 rounded bg-neutral-200 dark:bg-dark-elevated" />
      </div>
    );
  }

  if (submitted) {
    const passed = isQuizPassed(score, passingScore);

    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
        <div className="text-center">
          {/* Result icon */}
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
              passed
                ? "bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400"
                : "bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400"
            }`}
          >
            {passed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            )}
          </div>

          {/* Result text */}
          <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {passed ? "Great job!" : "Keep practicing!"}
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            You scored{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {score}%
            </span>
            {passed
              ? " - You've passed this knowledge check!"
              : ` - You need ${passingScore}% to pass.`}
          </p>

          {/* Score breakdown */}
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div>
              <div className="font-semibold text-success-600 dark:text-success-400">
                {
                  questions.filter((q) => isAnswerCorrect(q, answers[q.id]))
                    .length
                }
              </div>
              <div className="text-neutral-500">Correct</div>
            </div>
            <div>
              <div className="font-semibold text-warning-600 dark:text-warning-400">
                {
                  questions.filter((q) => !isAnswerCorrect(q, answers[q.id]))
                    .length
                }
              </div>
              <div className="text-neutral-500">Incorrect</div>
            </div>
          </div>

          {/* Actions */}
          {allowRetry && !passed && (
            <button onClick={handleRetry} className="btn-primary mt-6">
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
      {/* Progress indicator */}
      <div className="mb-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>Knowledge Check</span>
        <span>
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-dark-elevated">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="mb-4 text-lg font-medium text-neutral-900 dark:text-neutral-100">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected =
            question.type === "multiple-select"
              ? (userAnswer as string[] | undefined)?.includes(option.id)
              : userAnswer === option.id;

          const isCorrectOption =
            question.type === "multiple-select"
              ? (question.correctAnswer as string[]).includes(option.id)
              : question.correctAnswer === option.id;

          let optionClass =
            "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all";

          if (showExplanation) {
            if (isCorrectOption) {
              optionClass +=
                " border-success-500 bg-success-50 dark:bg-success-900/20";
            } else if (isSelected) {
              optionClass +=
                " border-warning-500 bg-warning-50 dark:bg-warning-900/20";
            } else {
              optionClass +=
                " border-neutral-200 bg-neutral-50 dark:border-dark-border dark:bg-dark-elevated opacity-60";
            }
          } else if (isSelected) {
            optionClass +=
              " border-primary-500 bg-primary-50 dark:bg-primary-900/20";
          } else {
            optionClass +=
              " border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 dark:border-dark-border dark:hover:border-primary-600 dark:hover:bg-dark-elevated";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectAnswer(option.id)}
              disabled={showExplanation}
              className={optionClass}
            >
              {/* Checkbox/radio indicator */}
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-primary-500 bg-primary-500"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 text-white"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>

              {/* Option text */}
              <span className="text-left text-neutral-900 dark:text-neutral-100">
                {option.text}
              </span>

              {/* Feedback icon */}
              {showExplanation && (
                <span className="ml-auto">
                  {isCorrectOption ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-success-500"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : isSelected ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-warning-500"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div
          className={`mt-4 rounded-lg p-4 ${
            isCorrect
              ? "bg-success-50 dark:bg-success-900/20"
              : "bg-warning-50 dark:bg-warning-900/20"
          }`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-600 dark:text-success-400"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-600 dark:text-warning-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            )}
            <div>
              <p
                className={`font-medium ${
                  isCorrect
                    ? "text-success-700 dark:text-success-300"
                    : "text-warning-700 dark:text-warning-300"
                }`}
              >
                {isCorrect ? "Correct!" : "Not quite right"}
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end">
        {!showExplanation ? (
          <button
            onClick={handleCheckAnswer}
            disabled={
              !userAnswer ||
              (Array.isArray(userAnswer) && userAnswer.length === 0)
            }
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="btn-primary">
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
