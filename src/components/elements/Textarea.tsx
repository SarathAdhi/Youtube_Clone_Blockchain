import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField } from "formik";
import { useFormikContext } from "formik";
import clsx from "clsx";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  id?: string;
  name: string;
  isDark?: boolean;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, id = name, label, className, isDark = false, ...props }, ref) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

    return (
      <div className={className}>
        {!!label && (
          <label
            className={clsx(
              "block mb-1 text-left text-lg font-medium",
              isDark ? "text-gray-700" : "text-gray-200"
            )}
          >
            {label} {props.required && "*"}
          </label>
        )}

        <textarea
          id={id}
          {...input}
          disabled={isSubmitting}
          {...props}
          ref={ref}
          rows={4}
          className="w-full px-2 py-1 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />

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

TextArea.displayName = "TextArea";
export default TextArea;
