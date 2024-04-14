import { useState, useEffect } from 'react';
import { mockQuestionnaire } from './mockQuestionnaire';

const SECONDS_PER_QUESTION = 25;

export const useQuestionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [inputError, setInputError] = useState<string>('');
  const [stage, setStage] = useState<QuestionnaireStage>('introduction');

  useEffect(() => {
    // here I am mocking the data fetching
    // in the real world the respondent would click a link with an id
    // and that id would be used to fetch the specific questionnaire
    // (this could also be done server side)
    setQuestionnaire(mockQuestionnaire);
  }, []);

  const setDefaultOptionAsAnswer = (question: Question) => {
    if (question.type === 'single_choice') {
      question.answer = question.options[0];
    }
  };

  const getEstimatedTime = (questionsCount: number): number => {
    return Math.ceil((questionsCount * SECONDS_PER_QUESTION) / 60);
  };

  const handleUpdateQuestionnaire = () => {
    setQuestionnaire((prev) => {
      if (prev === null) return null;
      const updatedQuestions = prev.questions.map((q) => {
        if (q.id !== currentQuestion?.id) return q;
        return currentQuestion;
      });
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputError) setInputError('');
    const value = e.target.value;
    setCurrentQuestion((question) => (question ? { ...question, answer: value } : null));
  };

  const handleChooseOption = (newOption: OptionTypes) => {
    setCurrentQuestion((question) => {
      if (question === null) return null; // should never happen, to satisfy TS
      if (question.type === 'free_text') return null; // should never happen, to satisfy TS;
      return { ...question, answer: newOption };
    });
  };

  const handleNavigation = (currentIndex: number, direction: 'next' | 'prev'): void => {
    if (direction == 'next' && currentQuestion?.required && !currentQuestion?.answer) {
      setInputError('Svar venligst på spørgsmålet');
      return;
    }
    if (inputError) setInputError('');

    handleUpdateQuestionnaire();
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const newQuestion = questionnaire?.questions.find((q) => q.index === newIndex);

    if (!newQuestion) return; // should never happen, to satisfy TS

    if (direction === 'next' && !newQuestion.answer) {
      setDefaultOptionAsAnswer(newQuestion);
    }

    setCurrentQuestion(newQuestion);
  };

  const handleSubmit = () => {
    handleUpdateQuestionnaire();
    setCurrentQuestion(null);
    setStage('done');
  };

  const handleStart = () => {
    // I am assuming the API serves sorted questions
    // const firstQuestion = mockQuestionnaire.questions[0];
    // setDefaultOptionAsAnswer(firstQuestion);
    // setCurrentQuestion(firstQuestion);

    handleNavigation(0, 'next');
    setStage('questions');
  };

  return {
    currentQuestion,
    getEstimatedTime,
    handleChangeAnswer,
    handleChooseOption,
    handleNavigation,
    handleStart,
    handleSubmit,
    inputError,
    questionnaire,
    stage,
  };
};
