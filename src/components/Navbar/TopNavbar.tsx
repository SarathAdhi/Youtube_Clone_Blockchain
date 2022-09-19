import LinkedItem from "@components/LinkedItem";
import SlideOver from "@components/SlideOver";
import Button from "@elements/Button";
import { SearchIcon } from "@heroicons/react/outline";
import { HamBurgerMenu, UploadSvg } from "@svgs/YoutubeSvgs";
import { userDetails } from "@utils/recoil";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Navlinks } from "./SideNavbar";

const TopNavbar = () => {
  const router = useRouter();
  const [{ profileImage, username }] = useRecoilState(userDetails);

  const [isOpen, setIsOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const submitSearchQuery = () => {
    router.replace(`/?search=${searchInput}`);
  };

  return (
    <header className="z-50 px-6 w-full h-14 bg-[#202020] sticky top-0 flex items-center justify-between gap-5">
      <Button className="block md:hidden" onClick={() => setIsOpen(true)}>
        <HamBurgerMenu className="w-6 h-6 text-white" />
      </Button>

      <div className="hidden md:w-[500px] mx-auto md:flex items-center bg-[#313131]">
        <input
          className="w-full px-1 py-1.5 bg-[#121212] border-[1px] border-[#303030] text-white placeholder:text-[#d8d8d8e0] appearance-none focus:outline-none sm:text-base"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
          onKeyUp={({ key }) => key === "Enter" && submitSearchQuery()}
        />

        <Button
          onClick={submitSearchQuery}
          Icon={SearchIcon}
          className="mx-5 text-white"
        />
      </div>

      <div className="text-white w-20 flex items-center gap-5">
        <LinkedItem href="/video/upload">
          <UploadSvg className="fill-white w-7 h-7" />
        </LinkedItem>

        <LinkedItem href="/profile">
          <img
            src={profileImage || "/assets/blank_user_img.webp"}
            className="w-7 h-7 rounded-full"
            alt={username}
          />
        </LinkedItem>
      </div>

      <SlideOver title="Hello" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button onClick={() => setIsOpen(false)} className="p-5">
          <HamBurgerMenu className="w-6 h-6 text-white" />
        </Button>

        <div className="flex flex-col mt-1">
          <Navlinks isSlideOver />
        </div>
      </SlideOver>
    </header>
  );
};

export default TopNavbar;
