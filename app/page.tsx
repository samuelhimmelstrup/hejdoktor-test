'use client';
import { Stepper } from './components/Stepper';
import { motion } from 'framer-motion';
import { StyledListbox } from './components/StyledListbox';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useQuestionnaire } from './useQuestionnaire';
import { Fragment } from 'react';

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
        <div className='flex flex-col items-center gap-10 w-1/2' aria-live='polite'>
          <h1 className='text-center'>{questionnaire.title}</h1>

          {stage === 'questions' && (
            <label htmlFor='progress-bar' className='sr-only' aria-live='polite'>
              Din aktuelle position i spørgeskemaet: {currentQuestion?.index || 0} ud af{' '}
              {questionnaire.questions.length}
              <progress
                id='progress-bar'
                value={currentQuestion?.index || 0}
                max={questionnaire.questions.length}
              />
            </label>
          )}

          <div aria-hidden={true}>
            <Stepper
              steps={questionnaire.questions.length}
              currentStep={
                currentQuestion?.index ? currentQuestion?.index - 1 : undefined
              }
            />
          </div>

          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='custom-card'>
            {stage === 'introduction' && (
              <>
                <div>
                  <h2 className='text-xl mb-2'>{questionnaire?.introductoryMessage}</h2>
                  <div className='flex gap-1 items-center'>
                    <p className='text'>{questionnaire?.questions.length} spørgsmål</p>
                    <p className='text'>
                      &bull; Cirka {getEstimatedTime(questionnaire.questions.length)}{' '}
                      minutter
                    </p>
                  </div>
                </div>
                <div id='card-actions' className='w-full flex justify-end'>
                  <button className='btn-orange' type='button' onClick={handleStart}>
                    Start
                  </button>
                </div>
              </>
            )}

            {stage === 'questions' && currentQuestion && (
              <>
                {questionnaire.questions.map((question) => {
                  if (question.id === currentQuestion.id)
                    return (
                      <Fragment key={question.id}>
                        <h2>
                          {currentQuestion.question}
                          {currentQuestion.required ? ' *' : ''}
                        </h2>

                        {currentQuestion.type === 'free_text' && (
                          <label htmlFor='svar' className='text-label'>
                            Skriv dit svar her {!currentQuestion.required && '(valgfri)'}
                            <input
                              id='svar'
                              aria-errormessage='input-error'
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
                            transition={{ duration: 0.2 }}>
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
                      </Fragment>
                    );
                })}
              </>
            )}

            {stage === 'done' && (
              <>
                <h2 className='text-xl text-center'>
                  {questionnaire?.messageAfterCompletion}
                </h2>
                <div aria-hidden={true} className='w-full flex justify-center'>
                  <CheckBadgeIcon className='w-16' />
                </div>
                <div className='w-full flex justify-center'>
                  <button
                    className='btn-orange'
                    type='button'
                    onClick={() => (window.location.href = '/')}>
                    Prøv igen
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
