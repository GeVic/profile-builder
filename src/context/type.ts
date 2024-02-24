import { ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

interface Skill {
  title: string;
  content: string;
  items: string;
  isBeingEdited: boolean;
}

interface Project {
  id: number;
  title: string;
  link: string;
  description: string;
  isBeingEdited: boolean;
  image: string;
}

interface Card {
  title: string;
  role: string;
  location: string;
  duration: string;
  project: string;
  description: string;
  isEditing: boolean;
  image: string;
}
interface Site {
  title: string;
  image: string;
}

interface Section {
  aboutYou: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  letsConnect: boolean;
}

interface AppState {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  section: Section;
  setSection: React.Dispatch<React.SetStateAction<Section>>;
  site: Site;
  setSite: React.Dispatch<React.SetStateAction<Site>>;
  isEditMode: boolean;
  toggleEditMode: () => void;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
}

export const defaultAppState: AppState = {
  skills: [],
  setSkills: () => {},
  projects: [],
  setProjects: () => {},
  cards: [],
  setCards: () => {},
  section: {
    aboutYou: false,
    skills: false,
    projects: false,
    experience: false,
    letsConnect: false,
  },
  setSection: () => {},
  site: {
    title: "",
    image: "/svg/default.svg",
  },
  setSite: () => {},
  isEditMode: true,
  toggleEditMode: () => {},
  isPreviewMode: false,
  togglePreviewMode: () => {},
};

export type {
  AppState,
  Card,
  EditModeContextType,
  Project,
  ProviderProps,
  Section,
  Site,
  Skill,
};
