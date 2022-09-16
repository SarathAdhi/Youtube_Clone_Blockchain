import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import Button from "@elements/Button";

type Props = {
  options: {
    name: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
  }[];
  className?: string;
  buttonProps?: {
    title: string;
    className?: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  };
};

const DropDownMenu: React.FC<Props> = ({
  className = "",
  options = [],
  buttonProps,
}) => {
  return (
    <div className={className}>
      <Menu as="div" className="relative z-40 inline-block text-left">
        <Menu.Button
          className={clsx(
            "flex items-center rounded-md focus:outline-none",
            buttonProps?.className
          )}
        >
          {buttonProps?.title}
          {buttonProps?.Icon && <buttonProps.Icon className="w-5 h-5" />}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-40 absolute right-0 mt-2 w-24 rounded-md bg-black focus:outline-none">
            <div className="px-1 py-1">
              {options.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <Button
                      onClick={option.onClick}
                      className={clsx(
                        active ? "bg-gray-600 text-white" : "text-white",
                        "group flex w-full justify-between items-center gap-1 rounded-md p-2 text-sm"
                      )}
                    >
                      {option.Icon && <option.Icon className="w-5 h-5" />}
                      {option.name}
                    </Button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDownMenu;
