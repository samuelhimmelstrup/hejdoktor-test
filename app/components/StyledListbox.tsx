import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type Props<T> = {
  value: T;
  options: T[];
  onChange: (newOption: T) => void;
};

export const StyledListbox = ({ value, options, onChange }: Props<OptionTypes>) => {
  return (
    <Listbox value={value} onChange={onChange} as='div' className='relative'>
      <Listbox.Label className='text-label'>Vælg en fra listen</Listbox.Label>
      <Listbox.Button className='listbox-button'>
        <span className='block truncate'>{value}</span>
        <span className='pointer-events-none'>
          <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </span>
      </Listbox.Button>
      <div className='relative'>
        <Listbox.Options className='flex flex-col absolute top-0 py-1 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
          {options?.map((option, i) => (
            <Listbox.Option
              key={i}
              value={option}
              className={({ active }) =>
                clsx(
                  'relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900',
                  {
                    'bg-hd-blue-400 text-hd-darkblue-400': active,
                  }
                )
              }>
              {({ selected }) => (
                <>
                  <span
                    className={clsx('block truncate', {
                      'font-medium': selected,
                    })}>
                    {option}
                  </span>
                  {selected && (
                    <span className='text-blue-600 absolute inset-y-0 left-0 flex items-center pl-3'>
                      <CheckIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
