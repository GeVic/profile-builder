import { useAppMode } from "@/context/AppProviderContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { ConnectProps, TempConnectState } from "../type";
import IconLayout from "../ui/components/iconLayout";
import ImageUpload from "../ui/components/imageUpload";

const Connect = ({ id }: ConnectProps) => {
  const [sectionTitle, setSectionTitle] = useState("Let's connect");
  const [sectionDescription, setSectionDescription] = useState("");
  const [image, setImage] = useState("/svg/default.svg");
  const [sectionSub, setSectionSub] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const { setSection } = useAppMode();

  const [tempState, setTempState] = useState<TempConnectState>({
    sectionTitle: "",
    sectionDescription: "",
  });

  useEffect(() => {
    if (isEditing) {
      setTempState({
        sectionTitle,
        sectionDescription,
      });
    }
  }, [isEditing]);

  const handleCancel = () => {
    setSectionTitle(tempState.sectionTitle);
    setSectionDescription(tempState.sectionDescription);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSectionTitle(sectionTitle);
    setSectionDescription(sectionDescription);
  };

  const handleDelete = () => {
    setSection((prev) => ({ ...prev, letsConnect: false }));
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
            <span
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <IconLayout>
                <RiEditBoxLine />
              </IconLayout>
            </span>
          )}
        </div>
      </div>
      <div
        className="content-container relative grid gap-4 rounded-xl border-2 border-transparent p-4 transition-all duration-200 ease-in-out hover:border-gray-300"
        style={{ borderColor: isEditing ? "#828282" : "" }}
      >
        {isEditing ? (
          <div className="gap-4 flex flex-col">
            <input
              value={sectionTitle}
              placeholder="Enter title here"
              className="bg-transparent text-xl font-semibold resize-none outline-none"
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <textarea
              value={sectionDescription}
              className="bg-transparent outline-none"
              onChange={(e) => setSectionDescription(e.target.value)}
              placeholder="Add subtext here"
            />
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold">{sectionTitle}</h1>
            <p>{sectionDescription}</p>
          </>
        )}
        <div className="flex flex-row items-center gap-4">
          {isEditing ? (
            <>
              <ImageUpload
                image={image}
                width={31}
                setImage={setImage}
                defaultImage="/svg/default.svg"
                height={31}
                size={20}
              />
              <input
                type="text"
                value={sectionSub}
                onChange={(e) => setSectionSub(e.target.value)}
                placeholder="Enter subtext"
                className="bg-transparent resize-none"
              />
            </>
          ) : (
            <>
              <Image
                src={image}
                alt="Picture of the user"
                width={31}
                height={31}
              />
              <div className="flex flex-row gap-1 items-center">
                <Link href={sectionSub}>{sectionSub}</Link>
                <GoLinkExternal size={15} color="#0085FF" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
