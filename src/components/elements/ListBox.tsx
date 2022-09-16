import { Fragment, useState } from "react";
import { Listbox as LB, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Option = { name: string };

type Props = {
  label?: string;
  isDark?: boolean;
  options: Option[];
  selected: Option;
  setSelected: (name: Option) => void;
};

const Listbox: React.FC<Props> = ({
  label,
  isDark = false,
  options = [],
  selected,
  setSelected,
}) => {
  return (
    <div className="w-full">
      {!!label && (
        <label
          className={clsx(
            "block mb-1 text-left text-lg font-medium",
            isDark ? "text-gray-700" : "text-gray-200"
          )}
        >
          {label}
        </label>
      )}
      <LB value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <LB.Button className="block text-left w-full px-2 py-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-base">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </LB.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <LB.Options className="z-40 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <LB.Option
                  key={option.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </LB.Option>
              ))}
            </LB.Options>
          </Transition>
        </div>
      </LB>
    </div>
  );
};

export default Listbox;
