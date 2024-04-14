type QuestionTypes = 'free_text' | 'single_choice';

interface BaseQuestion {
  id: number;
  index: number;
  question: string;
  required: boolean;
}

interface FreeTextQuestion extends BaseQuestion {
  type: 'free_text';
  answer: string | null;
}

interface SingleChoiceQuestion<T> extends BaseQuestion {
  type: 'single_choice';
  options: T[];
  answer: T | null;
}

type OptionTypes = string | number;
type Question = FreeTextQuestion | SingleChoiceQuestion<OptionTypes>;

type Questionnaire = {
  title: string;
  createdAt: date;
  introductoryMessage: string;
  messageAfterCompletion: string;
  questions: Question[];
};

type QuestionnaireStage = 'introduction' | 'questions' | 'done';
