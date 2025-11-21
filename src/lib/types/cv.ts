import type { DocumentData } from "./document";

export interface CVData extends DocumentData{
  name: string;
  first_name: string;
  job: string;
  specialty: string;
  informations: CVInformations;
  introduction: string;
  sections: CVSection[];
}

export interface CVInformations {
  address: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface CVSection {
  title?: string;
  type: "full" | "compact";
  subsections: CVSubsection[];
}

export interface CVSubsection {
  title?: string;
  items: string[];
  dates?: string;
}
