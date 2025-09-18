import React, { HTMLAttributes } from "react";
import classNames from "classnames";
import { Logo } from "components/Logo";
import GithubSvg from "assets/svg/github.svg?react";
import { Link } from "react-router-dom";

export const LobbyPage: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(
        "relative w-full h-screen flex items-center justify-center flex-col bg-violet px-[3.75em] py-[2.5em]",
        className
      )}
      {...props}
    >
      <GithubLink />
      {children}
    </div>
  );
};

export const SmallLogo = () => {
  return (
    <Link to="/">
      <Logo size="small" className="absolute top-[2.5em] left-[3.75em]" />
    </Link>
  );
};

export const GithubLink = () => {
  return (
    <a
      className="absolute bottom-[2.5em] left-[3.75em] w-[1.5em] text-white hover:opacity-70"
      href="https://github.com/maciejmatu/mosaic"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubSvg />
    </a>
  );
};
