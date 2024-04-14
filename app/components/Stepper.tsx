import clsx from 'clsx';

type Props = {
  steps: number;
  currentStep?: number;
};

export const Stepper = ({ steps, currentStep }: Props) => {
  const stepsArray = new Array(steps);
  stepsArray.fill(1);

  return (
    <ol className='flex gap-1 justify-center items-center' aria-label='Progress steps'>
      {stepsArray.map((_, index) => {
        return (
          <li
            key={index}
            aria-current={index === currentStep ? 'step' : undefined}
            aria-label={`Step ${index} of ${steps}`}>
            <div
              className={clsx('rounded-full w-5 h-5 bg-hd-blue-500', {
                'bg-hd-orange-400 scale-110': index === currentStep,
              })}
            />
          </li>
        );
      })}
    </ol>
  );
};
