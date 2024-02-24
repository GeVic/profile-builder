// nextjs compliation removes the useClient
"use client";

import { useAppMode } from "@/context/AppProviderContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { FaExclamation } from "react-icons/fa6";
import { Item } from "./type";

const EditViewNav = () => {
  const { section, toggleEditMode } = useAppMode();
  const items: Item[] = [
    {
      key: "aboutYou",
      label: "📌  About you",
      condition: section.aboutYou,
      id: "intro",
    },
    {
      key: "skills",
      label: "💡  Skillsets",
      condition: section.skills,
      id: "skills",
    },
    {
      key: "projects",
      label: "🛠️  Projects",
      condition: section.projects,
      id: "projects",
    },
    {
      key: "experience",
      label: "🌐  Experience",
      condition: section.experience,
      id: "experience",
    },
    {
      key: "letsConnect",
      label: "🔗  CTA",
      condition: section.letsConnect,
      id: "connect",
    },
  ];
  const handleItemClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const allFalse = Object.values(section).every((value) => value === false);

  const renderDropdownItems = (items: Item[]) =>
    items.map(
      (item) =>
        item.condition && (
          <DropdownItem
            key={item.key}
            className="my-1 hover:bg-gray-200 focus:outline-none hover:p-2 hover:rounded-xl"
            onClick={() => handleItemClick(item.id)}
          >
            {item.label}
          </DropdownItem>
        )
    );
  return (
    <nav className="flex outline-none w-full min-w-0 flex-row items-center justify-between bg-[#232323] px-12 py-3">
      {/* extreme right */}
      <div className="flex flex-row gap-20">
        <div className="flex flex-row gap-2">
          <Image
            src="/svg/Vector.svg"
            alt="Site Builder Logo"
            width={30}
            height={13.6}
            priority
          />
          <span className="text-white">Site Builder</span>
        </div>
        <div className="flex gap-10">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="text-white">
                Sections
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Current sections"
              className="bg-white p-6 rounded-xl border border-gray-300"
            >
              {allFalse ? (
                <DropdownItem className="my-1 text-gray-500 max-w-64 outline-none">
                  <div className="flex flex-col items-center gap-4">
                    <FaExclamation size={31} />
                    <span className="whitespace-normal text-center text-black text-xs">
                      You have not added any sections, click to add new section
                    </span>
                    <span className="border-2 border-black rounded-full px-4 py-1 text-black text-xs">
                      Add new section
                    </span>
                  </div>
                </DropdownItem>
              ) : (
                renderDropdownItems(items)
              )}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="text-white">
                Preferences
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Current sections"
              className="bg-white p-6 rounded-xl border border-gray-300"
            >
              {renderDropdownItems(items)}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* extreme left */}
      <div className="flex items-center gap-10">
        <Button
          className="text-white"
          onClick={() => {
            toggleEditMode();
          }}
        >
          Preview
        </Button>
        <Button
          onClick={() => {
            toggleEditMode();
          }}
          color="primary"
          radius="full"
          className="rounded-2xl bg-blue-500 px-5 py-1"
        >
          Publish
        </Button>
      </div>
    </nav>
  );
};

export default EditViewNav;
