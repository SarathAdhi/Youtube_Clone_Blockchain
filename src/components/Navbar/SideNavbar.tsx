import LinkedItem from "@components/LinkedItem";
import SlideOver from "@components/SlideOver";
import Button from "@elements/Button";
import { ExploreSvg, HamBurgerMenu, HomeSvg } from "@svgs/YoutubeSvgs";
import clsx from "clsx";
import React, { useState } from "react";

export const Navlinks = ({
  isSlideOver = false,
}: {
  isSlideOver?: boolean;
}) => (
  <>
    <LinkedItem
      href="/"
      className={clsx(
        "flex items-center",
        isSlideOver
          ? "gap-6 pl-6 text-[14px] px-2 py-2 hover:bg-[#4c4c4c]"
          : "flex-col gap-1 text-[10px] "
      )}
    >
      <HomeSvg className="w-6 h-6 fill-white" />
      <span className="text-white">Home</span>
    </LinkedItem>

    <LinkedItem
      href="/"
      className={clsx(
        "flex items-center",
        isSlideOver
          ? "gap-6 pl-6 text-[14px] px-2 py-2 hover:bg-[#4c4c4c]"
          : "flex-col gap-1 text-[10px] "
      )}
    >
      <ExploreSvg className="w-6 h-6 fill-white" />
      <span className="text-white">Explore</span>
    </LinkedItem>
  </>
);

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="hidden md:flex py-5 w-[72px] h-screen sticky top-0 bg-[#212121] flex-col items-center gap-8">
      <Button onClick={() => setIsOpen(true)}>
        <HamBurgerMenu className="w-6 h-6 text-white" />
      </Button>

      <Navlinks />

      <SlideOver title="Hello" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button onClick={() => setIsOpen(false)} className="p-5">
          <HamBurgerMenu className="w-6 h-6 text-white" />
        </Button>

        <div className="flex flex-col mt-1">
          <Navlinks isSlideOver />
        </div>
      </SlideOver>
    </aside>
  );
};

export default SideNavbar;
