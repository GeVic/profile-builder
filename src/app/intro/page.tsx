"use client";
import { useAppMode } from "@/context/AppProviderContext";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ConnectProps } from "../type";
import IconLayout from "../ui/components/iconLayout";
import "../ui/styles/commonStyle.css";

const Intro = ({ id }: ConnectProps) => {
  const [aboutTitle, setAboutTitle] = useState("About Me");
  const [aboutContent, setAboutContent] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { setSection, isEditMode } = useAppMode();
  const [editAboutTitle, setEditAboutTitle] = useState(aboutTitle);
  const [editAboutContent, setEditAboutContent] = useState(aboutContent);

  const handleEditToggle = () => {
    setIsEditing(true);
    if (isEditMode) {
      setEditAboutTitle(aboutTitle);
      setEditAboutContent(aboutContent);
    }
  };

  const handleCancel = () => {
    setAboutTitle(aboutTitle);
    setAboutContent(aboutContent);
    setIsEditing(false);
    //toggleEditMode();
  };

  const handleSave = () => {
    setAboutTitle(editAboutTitle);
    setAboutContent(editAboutContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setSection((prev) => ({ ...prev, aboutYou: false }));
  };

  return (
    <div
      id={id}
      className="base-container flex w-full md:w-3/5 flex-col self-end"
    >
      <div
        className={`edit-options flex flex-row items-center justify-between p-4`}
        style={{ display: isEditing ? "flex" : "" }}
      >
        <IconLayout>
          <IoReorderThreeOutline />
        </IconLayout>
        <div className="flex flex-row gap-4">
          <button
            onClick={isEditing ? handleCancel : handleDelete}
            className="text-tiny"
          >
            {isEditing ? (
              "cancel"
            ) : (
              <IconLayout>
                <AiOutlineDelete />
              </IconLayout>
            )}
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-tiny rounded-full bg-[#0085FF] px-3 py-1 text-white"
            >
              save
            </button>
          ) : (
            <span onClick={handleEditToggle}>
              <IconLayout>
                <RiEditBoxLine />
              </IconLayout>
            </span>
          )}
        </div>
      </div>
      <div
        className={`content-container relative rounded-xl border-2 border-transparent p-4 transition-all duration-200 ease-in-out hover:border-gray-300 ${
          isEditing ? "border-gray-400 border" : ""
        }`}
        style={{ borderColor: isEditing ? "#828282" : "" }}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={editAboutTitle}
              placeholder="Type your title here."
              onChange={(e) => setEditAboutTitle(e.target.value)}
              className="bg-transparent text-xl font-semibold outline-none"
            />
            <ReactQuill
              value={editAboutContent}
              onChange={setEditAboutContent}
              className="w-full bg-transparent resize-none outline-none"
            />
          </>
        ) : (
          <div>
            <h1 className="text-xl font-semibold">{aboutTitle}</h1>
            <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
