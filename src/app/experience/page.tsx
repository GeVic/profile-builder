import { useAppMode } from "@/context/AppProviderContext";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { ConnectProps, TempExpState } from "../type";
import IconLayout from "../ui/components/iconLayout";
import ImageUpload from "../ui/components/imageUpload";
import "../ui/styles/commonStyle.css";

const Experience = ({ id }: ConnectProps) => {
  const [sectionTitle, setSectionTitle] = useState("Experience");
  const [sectionDescription, setSectionDescription] = useState("");
  const { cards, setCards, setSection } = useAppMode();
  const [isEditing, setIsEditing] = useState(true);

  const [tempState, setTempState] = useState<TempExpState>({
    cards: [],
    sectionTitle: "",
    sectionDescription: "",
  });

  useEffect(() => {
    if (isEditing) {
      setTempState({
        cards: [...cards],
        sectionTitle,
        sectionDescription,
      });
    }
  }, [isEditing]);

  const handleCardChange = (index, field, value) => {
    setCards(
      cards.map((card, i) => (i === index ? { ...card, [field]: value } : card))
    );
  };

  const toggleCardEdit = (index) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, isEditing: !card.isEditing } : card
      )
    );
  };

  const addCard = () => {
    setCards([
      ...cards,
      {
        title: "",
        role: "",
        location: "",
        duration: "",
        project: "",
        description: "",
        isEditing: true,
        image: "/svg/default.svg",
      },
    ]);
  };

  const handleCancel = () => {
    setCards(
      tempState.cards.map((card) => {
        return { ...card, isEditing: false };
      })
    );
    setSectionTitle(tempState.sectionTitle);
    setSectionDescription(tempState.sectionDescription);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setCards(
      cards.map((card) => {
        return { ...card, isEditing: false };
      })
    );
    setSectionTitle(sectionTitle);
    setSectionDescription(sectionDescription);
  };

  // Add a function to delete a skill
  const deleteExperience = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleDelete = () => {
    setSection((prev) => ({ ...prev, experience: false }));
  };

  return (
    <div
      id={id}
      className="base-container flex w-full md:w-3/5 flex-col self-end "
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
              placeholder="Title"
              className="bg-transparent text-xl font-semibold resize-none outline-none"
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <textarea
              value={sectionDescription}
              className="bg-transparent resize-none outline-none"
              onChange={(e) => setSectionDescription(e.target.value)}
              placeholder="Content"
            />
          </div>
        ) : (
          <div className="gap-4 flex flex-col">
            <h1 className="text-xl font-semibold">{sectionTitle}</h1>
            <p>{sectionDescription}</p>
          </div>
        )}

        <div className="grid gap-4 ">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="radius gap-4 rounded-2xl border border-gray-300 bg-white p-4 md:p-8"
            >
              <CardHeader className="gap-4">
                {card.isEditing ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center">
                      <ImageUpload
                        image={card.image}
                        width={31}
                        setImage={(newImage) =>
                          handleCardChange(index, "image", newImage)
                        }
                        defaultImage="/svg/default.svg"
                        height={31}
                        size={20}
                      />
                      <div className="flex flex-col gap-2">
                        <input
                          value={card.title}
                          onChange={(e) =>
                            handleCardChange(index, "title", e.target.value)
                          }
                          className="font-semibold resize-none outline-none"
                          placeholder="Enter company title"
                        />
                        <input
                          value={card.role}
                          onChange={(e) =>
                            handleCardChange(index, "role", e.target.value)
                          }
                          className="text-gray-400 resize-none outline-none"
                          placeholder="Enter designation"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                      <input
                        value={card.location}
                        onChange={(e) =>
                          handleCardChange(index, "location", e.target.value)
                        }
                        className="text-gray-400 resize-none outline-none"
                        placeholder="+ Add location"
                      />
                      <input
                        value={card.duration}
                        onChange={(e) =>
                          handleCardChange(index, "duration", e.target.value)
                        }
                        className="text-gray-400 resize-none outline-none"
                        placeholder="+ Add timeline"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={card.image}
                      alt="Picture of the user"
                      width={31}
                      height={31}
                    />
                    <span className="font-semibold">{card.title}</span>
                    <span className="text-black">{card.role}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{card.location}</span>
                      <span className="text-gray-400 bg-gray-400 rounded-full w-1 h-1 inline-block"></span>
                      <span className="text-gray-400">{card.duration}</span>
                    </div>
                    {isEditing && !card.isEditing && (
                      <div className="flex flex-row gap-2">
                        <span onClick={() => deleteExperience(index)}>
                          <IconLayout>
                            <AiOutlineDelete />
                          </IconLayout>
                        </span>
                        <span onClick={() => toggleCardEdit(index)}>
                          <IconLayout>
                            <RiEditBoxLine />
                          </IconLayout>
                        </span>
                      </div>
                    )}
                  </>
                )}
              </CardHeader>
              <CardBody className="gap-4">
                {card.isEditing ? (
                  <>
                    <textarea
                      value={card.description}
                      onChange={(e) =>
                        handleCardChange(index, "description", e.target.value)
                      }
                      className="resize-none outline-none"
                      placeholder="Add your content here"
                    />
                  </>
                ) : (
                  <>
                    <span>{card.project}</span>
                    <p>{card.description}</p>
                  </>
                )}
              </CardBody>
            </Card>
          ))}
          {isEditing && (
            <Card className="cursor-pointer rounded-2xl border border-dashed border-[#DADADA] bg-[#EEEEEE] p-4 hover:border-gray-400">
              <CardBody
                className="flex h-full items-center justify-center text-xl font-semibold"
                onClick={addCard}
              >
                <div>
                  <span className="text-xl text-[#454545]"> + </span>
                  <span className="text-sm px-4">Add next</span>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
