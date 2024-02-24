import { useAppMode } from "@/context/AppProviderContext";
import { Skill } from "@/context/type";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { ConnectProps } from "../type";
import IconLayout from "../ui/components/iconLayout";
import "../ui/styles/commonStyle.css";

const Skills = ({ id }: ConnectProps) => {
  const { skills, setSkills, setSection, isEditMode } = useAppMode();
  const [isEditing, setIsEditing] = useState(true);
  const [tempState, setTempState] = useState<{ skills: Skill[] }>({
    skills: [],
  });

  useEffect(() => {
    if (isEditing) {
      setTempState({
        skills: [...skills],
      });
    }
  }, [isEditing]);

  // Handle skill edit toggle
  const toggleEditSkill = (index) => {
    setSkills(
      skills.map((skill, i) =>
        i === index ? { ...skill, isBeingEdited: !skill.isBeingEdited } : skill
      )
    );
  };

  // Add a new skill card to the skill set
  const addNewSkill = () => {
    setSkills([
      ...skills,
      { title: "", content: "", items: "", isBeingEdited: true },
    ]);
  };

  // Update the skill card information when in edit mode.
  const handleSkillChange = (index, field, value) => {
    setSkills(
      skills.map((skill, i) => {
        if (i === index) {
          return { ...skill, [field]: value };
        }
        return skill;
      })
    );
  };

  // Add a function to delete a skill
  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const renderSkillCards = () => {
    return skills.map((skill, index) => (
      <Card
        key={index}
        className="rounded-2xl border border-gray-300 bg-white p-8"
      >
        <CardBody className="gap-4">
          {skill.isBeingEdited ? (
            <>
              <input
                placeholder="Title"
                value={skill.title}
                className="text-xl font-semibold focus:border-gray-300 outline-none"
                onChange={(e) =>
                  handleSkillChange(index, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Content"
                value={skill.content}
                className="resize-none outline-none"
                onChange={(e) =>
                  handleSkillChange(index, "content", e.target.value)
                }
              />
              <textarea
                placeholder="Items"
                className="resize-none outline-none"
                value={skill.items}
                onChange={(e) =>
                  handleSkillChange(index, "items", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <span className={"flex flex-row justify-between"}>
                <h1 className="text-xl font-semibold">{skill.title}</h1>
                {isEditMode && (
                  <div className="flex flex-row gap-2">
                    <span onClick={() => deleteSkill(index)}>
                      <IconLayout>
                        <AiOutlineDelete />
                      </IconLayout>
                    </span>
                    <span onClick={() => toggleEditSkill(index)}>
                      <IconLayout>
                        <RiEditBoxLine />
                      </IconLayout>
                    </span>
                  </div>
                )}
              </span>
              <p>{skill.content}</p>
              <p>{skill.items}</p>
            </>
          )}
        </CardBody>
      </Card>
    ));
  };

  const handleCancel = () => {
    setSkills(
      tempState.skills.map((skill) => {
        return { ...skill, isBeingEdited: false };
      })
    );
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSkills(
      skills.map((skill) => {
        return { ...skill, isBeingEdited: false };
      })
    );
  };

  const handleDelete = () => {
    setSection((prev) => ({ ...prev, skills: false }));
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
        className="content-container relative grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border-2 border-transparent p-4 transition-all duration-200 ease-in-out hover:border-gray-300"
        style={{ borderColor: isEditing ? "#828282" : "" }}
      >
        {renderSkillCards()}
        {isEditing && (
          <Card className="cursor-pointer rounded-2xl border border-dashed border-[#DADADA] bg-[#EEEEEE] p-4 hover:border-gray-400">
            <CardBody
              className="flex h-full items-center justify-center text-xl font-semibold"
              onClick={addNewSkill}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-gray-500 text-2xl px-4"> + </span>
                <span className="text-xs px-4">Add new card</span>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Skills;
