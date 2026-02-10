import type { DocumentData } from "./document";

export interface LetterData extends DocumentData {

  name: string;
  first_name: string;
  informations: {
    email: string;
    phone: string;
    linkedin: string;
  };
  recipient: string;
  content: string;
}
