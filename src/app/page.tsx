"use client";
import { useAppMode } from "@/context/AppProviderContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import About from "./about/page";
import Connect from "./connect/page";
import Experience from "./experience/page";
import Intro from "./intro/page";
import Projects from "./projects/page";
import Skills from "./skills/page";
import Nav from "./ui/components/nav";

export default function Home() {
  const { setSection, section, isEditMode } = useAppMode();
  const items = [
    {
      key: "aboutYou",
      label: "📌  Add About you",
      condition: section.aboutYou,
    },
    { key: "skills", label: "💡  Add Skillsets", condition: section.skills },
    { key: "projects", label: "🛠️  Add Projects", condition: section.projects },
    {
      key: "experience",
      label: "🌐  Add Experience",
      condition: section.experience,
    },
    {
      key: "letsConnect",
      label: "🔗  Add CTA",
      condition: section.letsConnect,
    },
  ];
  const anyTrue = Object.values(section).some((value) => value === true);
  return (
    <main className="flex min-h-screen flex-col gap-36 pb-36">
      <Nav />
      <div className="flex flex-col px-12 gap-8">
        <About />
        {section.aboutYou && <Intro id="intro" />}
        {section.skills && <Skills id="skills" />}
        {section.projects && <Projects id="projects" />}
        {section.experience && <Experience id="experience" />}
        {section.letsConnect && <Connect id="connect" />}
        {isEditMode && (
          <Dropdown>
            <DropdownTrigger
              className={`${anyTrue ? "w-3/5" : "w-full"} self-end`}
            >
              <div className="flex flex-row w-full justify-center bg-[#EFEFEF] py-6 rounded-xl border-dashed border border-black gap-4 items-center">
                <span className="text-2xl">+</span>
                <span>Click to add section</span>
              </div>
            </DropdownTrigger>
            <DropdownMenu className="bg-white p-6 rounded-xl border border-gray-300 w-80">
              {items.map(
                (item) =>
                  !item.condition && (
                    <DropdownItem
                      key={item.key}
                      className="my-2 hover:bg-gray-200 focus:outline-none hover:p-2 hover:rounded-xl"
                      onClick={() =>
                        setSection((prev) => ({ ...prev, [item.key]: true }))
                      }
                    >
                      <div className="flex flex-row gap-4">
                        <Image
                          src="/svg/add.svg"
                          alt={"add"}
                          width={20}
                          height={20}
                        />
                        <span>{item.label}</span>
                      </div>
                    </DropdownItem>
                  )
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </main>
  );
}
