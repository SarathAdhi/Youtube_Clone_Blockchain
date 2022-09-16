import React from "react";
import clsx from "clsx";

type Props = {
  Icon?: React.FC<React.ComponentProps<"svg">>;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ Icon, className, children, ...rest }) => {
  return (
    <button
      className={clsx(
        Icon && "flex items-center gap-2",
        rest.disabled
          ? "cursor-not-allowed opacity-50"
          : "duration-200 active:scale-95",
        className
      )}
      {...rest}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
