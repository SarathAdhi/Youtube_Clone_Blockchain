import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type?: "text" | "password" | "email" | "number" | "url";
  name: string;
  isDark?: boolean;
  label?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      id = name,
      label,
      className,
      inputClassName,
      isDark = false,
      ...inputProps
    },
    ref
  ) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

    return (
      <div className={className}>
        {!!label && (
          <label
            htmlFor={id}
            className={clsx(
              "block mb-1 text-left text-lg font-medium",
              isDark ? "text-gray-700" : "text-gray-200"
            )}
          >
            {label} {inputProps.required && "*"}
          </label>
        )}

        <div>
          <input
            id={id}
            {...input}
            disabled={isSubmitting}
            {...inputProps}
            ref={ref}
            className={clsx(
              "block w-full px-2 py-1 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none sm:text-base",
              !inputProps.disabled &&
                !inputProps.readOnly &&
                "focus:ring-primary-500 focus:border-primary-500",
              inputClassName
            )}
          />
        </div>

        <ErrorMessage name={name}>
          {(msg) => (
            <div
              role="alert"
              className="mt-1 text-[13px] font-medium text-red-500 animate-slide-down -z-10"
            >
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    );
  }
);

export default Input;
