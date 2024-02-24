import { useAppMode } from "@/context/AppProviderContext";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { RiEditBoxLine } from "react-icons/ri";
import { ConnectProps } from "../type";
import IconLayout from "../ui/components/iconLayout";
import ImageUpload from "../ui/components/imageUpload";
import "../ui/styles/commonStyle.css";

const Projects = ({ id }: ConnectProps) => {
  const { projects, setProjects, setSection, isEditMode } = useAppMode();
  const [sectionTitle, setSectionTitle] = useState("Projects");
  const [sectionDescription, setSectionDescription] = useState("");

  const [isEditing, setIsEditing] = useState(true);

  const [tempProjects, setTempProjects] = useState(projects);
  const [tempTitle, setTempTitle] = useState(sectionTitle);
  const [tempDescription, setTempDescription] = useState(sectionDescription);

  // Toggles project edit mode
  const toggleEditProject = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, isBeingEdited: !project.isBeingEdited }
          : project
      )
    );
  };

  // Handles change in project fields
  const handleProjectChange = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  // Deletes a project
  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Adds a new project
  const addNewProject = () => {
    const newProject = {
      id: Date.now(), // Use a unique identifier for the key; Date.now() is temporary
      title: "",
      link: "",
      description: "",
      isBeingEdited: true,
      image: "/svg/default.svg",
    };
    setProjects([...projects, newProject]);
  };

  const handleCancel = () => {
    setProjects(
      tempProjects.map((project) => {
        return { ...project, isBeingEdited: false };
      })
    );
    setSectionTitle(tempTitle);
    setSectionDescription(tempDescription);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setProjects(
      projects.map((project) => {
        return { ...project, isBeingEdited: false };
      })
    );
    setSectionTitle(sectionTitle);
    setSectionDescription(sectionDescription);
  };

  const handleDelete = () => {
    setSection((prev) => ({ ...prev, projects: false }));
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
              placeholder="Enter project title"
              className="bg-transparent text-xl font-semibold outline-none"
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <textarea
              value={sectionDescription}
              className="bg-transparent resize-none outline-none"
              onChange={(e) => setSectionDescription(e.target.value)}
              placeholder="Add subtext here."
            />
          </div>
        ) : (
          <div className="gap-4 flex flex-col">
            <h1 className="text-xl font-semibold">{sectionTitle}</h1>
            <p>{sectionDescription}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="radius gap-4 rounded-2xl border border-gray-300 bg-white p-8"
            >
              <CardHeader className="flex flex-row justify-between">
                {project.isBeingEdited ? (
                  <ImageUpload
                    image={project.image}
                    width={31}
                    setImage={(newImage) =>
                      handleProjectChange(project.id, "image", newImage)
                    }
                    defaultImage="/svg/default.svg"
                    height={31}
                    size={5}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt="Project image"
                    width={31}
                    height={31}
                    layout="contain"
                    className="rounded-sm"
                  />
                )}
                {isEditing && !project.isBeingEdited && (
                  <div className="flex flex-row gap-2">
                    <span onClick={() => deleteProject(project.id)}>
                      <IconLayout>
                        <AiOutlineDelete />
                      </IconLayout>
                    </span>
                    <span onClick={() => toggleEditProject(project.id)}>
                      <IconLayout>
                        <RiEditBoxLine />
                      </IconLayout>
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardBody className="gap-4">
                {project.isBeingEdited ? (
                  // Editable fields
                  <>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        handleProjectChange(project.id, "title", e.target.value)
                      }
                      placeholder="Enter project title"
                      className="outline-none"
                    />
                    <div className="flex flex-row gap-1 items-center">
                      <LuLink size={15} color="#0085FF" />
                      <input
                        type="text"
                        value={project.link}
                        className="text-gray-400 placeholder-blue-500 outline-none"
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="Add link"
                      />
                    </div>
                    <textarea
                      value={project.description}
                      className="resize-none outline-none"
                      onChange={(e) =>
                        handleProjectChange(
                          project.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Add description"
                    />
                  </>
                ) : (
                  // Static content
                  <>
                    <span>{project.title}</span>
                    <span className="text-gray-400">{project.link}</span>
                    <p>{project.description}</p>
                  </>
                )}
              </CardBody>
            </Card>
          ))}
          {isEditing && (
            <Card className="cursor-pointer rounded-2xl border border-dashed border-[#DADADA] bg-[#EEEEEE] p-8 hover:border-gray-400">
              <CardBody
                className="flex h-full items-center justify-center text-xl font-semibold"
                onClick={addNewProject}
              >
                <div className="flex flex-col items-center gap-4">
                  <span className="text-gray-500 text-2xl px-4"> + </span>
                  <span className="text-xs px-4">Add New Project</span>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
