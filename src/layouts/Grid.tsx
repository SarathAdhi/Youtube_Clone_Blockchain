import clsx from "clsx";
import React, { AllHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & AllHTMLAttributes<HTMLDivElement>;

const GridCol: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div
      className={clsx("grid gap-5 sm:grid-cols-2 items-center", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GridCol;
