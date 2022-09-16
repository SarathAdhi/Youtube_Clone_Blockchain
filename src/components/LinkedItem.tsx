import Link from "next/link";
import React from "react";
type Props = {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkedItem: React.FC<Props> = ({
  href,
  children,
  className,
  ...rest
}) => {
  return (
    <Link href={href}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default LinkedItem;
