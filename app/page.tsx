'use client';
import { Stepper } from './components/Stepper';
import { motion } from 'framer-motion';
import { StyledListbox } from './components/StyledListbox';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useQuestionnaire } from './useQuestionnaire';

export default function Home() {
  const {
    questionnaire,
    currentQuestion,
    inputError,
    stage,
    getEstimatedTime,
    handleChangeAnswer,
    handleChooseOption,
    handleNavigation,
    handleSubmit,
    handleStart,
  } = useQuestionnaire();

  return (
    <main className='flex w-full min-h-screen flex-col items-center p-24'>
      {questionnaire && (
        <div className='flex flex-col items-center gap-10 w-1/2'>
          <h1 className='text-center'>{questionnaire.title}</h1>

          <div aria-hidden={stage !== 'questions'} aria-live='polite'>
            <Stepper
              steps={questionnaire.questions.length}
              currentStep={
                currentQuestion?.index ? currentQuestion?.index - 1 : undefined
              }
            />
          </div>

          <div aria-live='polite'>
            {stage === 'introduction' && (
              <motion.div className='custom-card'>
                <div>
                  <h2 className='text-xl mb-2'>{questionnaire?.introductoryMessage}</h2>
                  <div className='flex gap-1 items-center'>
                    <p className='text'>{questionnaire?.questions.length} spørgsmål</p>
                    <p className='text'>
                      &bull;&ensp;Cirka {getEstimatedTime(questionnaire.questions.length)}{' '}
                      minutter
                    </p>
                  </div>
                </div>
                <div id='card-actions' className='w-full flex justify-end'>
                  <button className='btn-orange' type='button' onClick={handleStart}>
                    Start
                  </button>
                </div>
              </motion.div>
            )}

            {currentQuestion && stage === 'questions' && (
              <>
                {questionnaire.questions.map((question) => {
                  if (question.id === currentQuestion.id)
                    return (
                      <motion.div
                        key={question.id}
                        id='question-container'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className='custom-card'>
                        <div id='question'>
                          <h2>
                            {currentQuestion.question}
                            {currentQuestion.required ? ' *' : ''}
                          </h2>
                        </div>

                        {currentQuestion.type === 'free_text' && (
                          <label htmlFor='svar' className='text-label'>
                            Skriv dit svar her
                            <input
                              id='svar'
                              value={currentQuestion.answer || ''}
                              type='text'
                              className='text-input'
                              onChange={handleChangeAnswer}
                              required={currentQuestion.required}
                            />
                          </label>
                        )}

                        {currentQuestion.type === 'single_choice' && (
                          <StyledListbox
                            options={currentQuestion.options || []}
                            value={currentQuestion.answer!}
                            onChange={handleChooseOption}
                          />
                        )}

                        {inputError && (
                          <motion.div
                            className='error'
                            id='input-error'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}>
                            <ExclamationCircleIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                            {inputError}
                          </motion.div>
                        )}

                        <div className='w-full flex justify-between'>
                          <button
                            onClick={() =>
                              handleNavigation(currentQuestion.index, 'prev')
                            }
                            disabled={currentQuestion.index === 1}
                            className='btn-darkblue'
                            type='button'>
                            Tilbage
                          </button>
                          {currentQuestion.index < questionnaire.questions.length ? (
                            <button
                              className='btn-orange'
                              type='button'
                              onClick={() =>
                                handleNavigation(currentQuestion.index, 'next')
                              }>
                              Videre
                            </button>
                          ) : (
                            <button
                              className='btn-orange'
                              type='submit'
                              onClick={handleSubmit}>
                              Indsend og afslut
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                })}
              </>
            )}

            {stage === 'done' && (
              <motion.div
                className='custom-card items-center'
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}>
                <h2 className='text-xl text-center'>
                  {questionnaire?.messageAfterCompletion}
                </h2>
                <CheckBadgeIcon className='w-16' />
                <div id='card-actions' className='w-full flex justify-end'>
                  <button
                    className='btn-orange'
                    type='button'
                    onClick={() => (window.location.href = '/')}>
                    Prøv igen
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
