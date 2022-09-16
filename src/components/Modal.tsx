import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  title: string;
  buttonClassName?: string;
  children: React.ReactNode;
  buttonProps: {
    name: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    className?: string;
  };
};

const Modal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  title,
  buttonProps,
  children,
}) => {
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={clsx("flex items-center gap-1", buttonProps.className)}
      >
        {buttonProps.Icon && <buttonProps.Icon className="w-6 h-6" />}
        {buttonProps.name}
      </button>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between"
                  >
                    <span className=" text-2xl font-medium leading-6 text-gray-900">
                      {title}
                    </span>

                    <button
                      type="button"
                      className="bg-red-500 p-1 rounded-full focus:outline-none"
                      onClick={closeModal}
                    >
                      <XIcon className="h-5 w-5 text-white" />
                    </button>
                  </Dialog.Title>

                  <div className="mt-5 max-h-full p-5 w-full overflow-auto">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
