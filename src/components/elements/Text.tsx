import clsx from "clsx";
import React from "react";

type Props = {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  className?: string;
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Text: React.FC<Props> = ({
  as = "span",
  children,
  className = "",
  title,
  onClick,
}) => {
  const TextTag = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <TextTag className={className} onClick={onClick} title={title}>
      {children}
    </TextTag>
  );
};

export const H1: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="h1"
      className={clsx("text-3xl md:text-4xl font-semibold", className)}
      {...rest}
    />
  );
};

export const H2: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="h2"
      className={clsx("text-2xl md:text-3xl font-semibold", className)}
      {...rest}
    />
  );
};

export const H3: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="h3"
      className={clsx("text-xl md:text-2xl font-semibold", className)}
      {...rest}
    />
  );
};

export const H4: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="h4"
      className={clsx("text-lg md:text-xl font-semibold", className)}
      {...rest}
    />
  );
};

export const H5: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="h5"
      className={clsx("text-md md:text-lg font-semibold", className)}
      {...rest}
    />
  );
};

export const P: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="p"
      className={clsx("text-sm md:text-base font-normal", className)}
      {...rest}
    />
  );
};

export const Label: typeof Text = ({ className = "", ...rest }) => {
  return (
    <Text
      as="label"
      className={clsx(
        "block text-xs md:text-sm font-medium text-gray-400",
        className
      )}
      {...rest}
    />
  );
};

export type { Props as TextProps };
export default Text;
