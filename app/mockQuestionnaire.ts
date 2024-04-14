export const mockQuestionnaire: Questionnaire = {
  title: 'Vigtige spørgsmål',
  createdAt: new Date(),
  introductoryMessage:
    'Tak fordi du vil deltage i denne undersøgelse. Dine svar vil hjælpe os med at finde svar på menneskehedens store spørgsmål',
  messageAfterCompletion: 'Tusind tak for din tid',
  questions: [
    {
      id: 115124,
      index: 1,
      type: 'single_choice',
      question: 'Hvad har du størst problemer med?',
      options: ['Håndsved', 'Fodsved', 'Kløe i armhulerne', 'Vigende hårgrænse'],
      required: true,
      answer: null,
    },
    {
      id: 71212,
      index: 2,
      type: 'free_text',
      question: 'Beskriv din livsfilosofi (nævn gerne 1-3 typer ost)',
      required: true,
      answer: null,
    },
    {
      id: 315623,
      index: 3,
      type: 'single_choice',
      question: 'Hvilket af følgende tal kan du mindst lide?',
      options: [1, 2, 3, 4, 5],
      required: true,
      answer: null,
    },
    {
      id: 21432,
      index: 4,
      type: 'free_text',
      question:
        'Fortæl om din barndom eller om noget andet, eller muligvis noget helt tredje. Vi skal se hvordan en lang titel ser ud.',
      required: false,
      answer: null,
    },
  ],
};
