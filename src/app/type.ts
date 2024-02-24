import { Card, Project } from "@/context/type";

export interface ConnectProps {
  id: string;
}

export interface TempState {
  projects: Project[];
  sectionTitle: string;
  sectionDescription: string;
}

export interface TempExpState {
  cards: Card[];
  sectionTitle: string;
  sectionDescription: string;
}

export interface TempConnectState {
  sectionTitle: string;
  sectionDescription: string;
}
