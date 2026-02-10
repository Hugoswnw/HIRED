import type { DocumentData } from "./document";

export interface CVData extends DocumentData{
  name: string;
  first_name: string;
  job: string;
  specialty: string;
  informations: {
    address: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  introduction: string;
  sections: {
    title?: string;
    type: "full" | "compact";
    subsections: {
      title?: string;
      items: string[];
      dates?: string;
    }[];
  } [];
}
