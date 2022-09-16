import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import React, { useState } from "react";
import { web3Client } from "@utils/web3Storage";
import Loading from "@components/Loading";

interface Props {
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  isDark?: boolean;
  getFileName?: (fileName: string) => void;
}

const FileUpload: React.FC<Props> = ({
  name,
  id = name,
  label,
  required = false,
  isDark = false,
  getFileName,
  ...rest
}) => {
  const { isSubmitting, setFieldValue } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files!;

    getFileName?.(file[0].name); // If needed in future

    const rootCid = await web3Client.put(file);
    setFieldValue(name, [rootCid, file[0].name]);
    setIsLoading(false);
  };

  return (
    <div>
      {!!label && (
        <label
          htmlFor={id}
          className={clsx(
            "block mb-1 text-left text-lg font-medium",
            isDark ? "text-gray-700" : "text-gray-200"
          )}
        >
          {label} {required && "*"}
        </label>
      )}

      <div className="flex items-center gap-2">
        <input
          id={id}
          name={name}
          type="file"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 border-dashed rounded-md shadow-sm appearance-none focus:outline-none sm:text-base"
          disabled={isSubmitting || isLoading}
          {...rest}
        />

        {isLoading && <Loading isDark={isDark} />}
      </div>
    </div>
  );
};

export default FileUpload;
