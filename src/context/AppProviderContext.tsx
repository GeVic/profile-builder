import React, { useCallback, useContext, useState } from "react";
import {
  AppState,
  Card,
  Project,
  ProviderProps,
  Section,
  Site,
  Skill,
  defaultAppState,
} from "./type";

const AppContext = React.createContext<AppState>(defaultAppState);

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [site, setSite] = useState<Site>(defaultAppState.site);
  const [section, setSection] = useState<Section>(defaultAppState.section);
  const [isEditMode, setIsEditMode] = useState<boolean>(
    defaultAppState.isEditMode
  );
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(
    defaultAppState.isPreviewMode
  );

  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditMode);
    if (isEditMode && isPreviewMode) {
      setIsPreviewMode(false);
    }
  }, [isEditMode, isPreviewMode]);

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
    if (isPreviewMode && isEditMode) {
      setIsEditMode(false);
    }
  }, [isEditMode, isPreviewMode]);

  const value = {
    skills,
    setSkills,
    projects,
    setProjects,
    cards,
    setCards,
    site,
    setSite,
    section,
    setSection,
    isEditMode,
    toggleEditMode,
    isPreviewMode,
    togglePreviewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppMode = (): AppState => useContext(AppContext);
