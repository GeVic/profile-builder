// nextjs compliation removes the useClient
"use client";

import { useAppMode } from "@/context/AppProviderContext";
import Image from "next/image";
import React from "react";
import EditViewNav from "./editViewNav";

const Nav = () => {
  const { site, section, isEditMode } = useAppMode();

  return (
    <>
      {isEditMode ? (
        <EditViewNav />
      ) : (
        <nav className="flex w-full min-w-0 flex-row items-center justify-between py-3 px-12">
          {/* extreme right */}
          <div className="flex flex-row gap-2">
            <Image
              src={site.image}
              alt="Site Builder Logo"
              width={30}
              height={13.6}
              priority
            />
            <span>{site.title}</span>
          </div>
          {/* extreme left */}
          <div className="hidden md:flex items-center gap-10">
            {section.aboutYou && <a href="#about">About</a>}
            {section.skills && <a href="#skills">Skills</a>}
            {section.projects && <a href="#projects">Projects</a>}
            {section.experience && <a href="#experience">Experience</a>}
            {section.letsConnect && <a href="#connect">Connect</a>}
          </div>
        </nav>
      )}
    </>
  );
};

export default React.memo(Nav);
