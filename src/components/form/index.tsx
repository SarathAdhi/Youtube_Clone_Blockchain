import clsx from "clsx";
import React from "react";
import { Formik, FormikProps, FormikConfig, FormikHelpers } from "formik";
import Button from "@elements/Button";

interface OnSubmitResult {
  [key: string]: any;
}

export interface FormProps<S = any> {
  className?: string;
  schema?: FormikConfig<S>["validationSchema"];
  onSubmit?: (
    values: S,
    reset: () => void,
    helpers: FormikHelpers<S>
  ) => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<S>["initialValues"];
  submitButton?: { title: string; Icon?: any };
  resetButton?: { title: string; Icon?: any };
  actionClassName?: string;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  className,
  actionClassName,
  initialValues = {},
  schema,
  onSubmit,
  children,
  submitButton,
  resetButton,
  ...props
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        const reset = () => {
          helpers.resetForm({});
        };

        const errors = (await onSubmit?.(values, reset, helpers)) || {};

        if (Object.keys(errors).length > 0) {
          helpers.setErrors(errors);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, handleReset, isValid, dirty }) => (
        <form
          className={clsx("grid gap-y-5 w-full", className)}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}

          {(submitButton || resetButton) && (
            <div className={clsx("flex mt-3 gap-x-4", actionClassName)}>
              {submitButton && (
                <Button
                  type="submit"
                  className="bg-green-500 px-3 py-1 rounded-md text-white text-lg font-medium"
                  Icon={submitButton.Icon}
                  disabled={!(isValid && dirty)}
                >
                  {submitButton.title}
                </Button>
              )}

              {resetButton && (
                <Button
                  onClick={handleReset}
                  disabled={isSubmitting}
                  Icon={resetButton.Icon}
                  type="reset"
                >
                  {resetButton.title}
                </Button>
              )}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default Form;
