import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const lists = import.meta.glob('/src/lib/data/list/*.json', { eager: true, import: 'default' }) as Record<string, unknown[]>;

export const load: PageLoad = async ({ params }) => {
  const key = `/src/lib/data/list/${params.file}.json`;
  const letterData = lists[key];
  if (!letterData) throw error(404, `List "${params.file}" not found`);
  return { letterData };
};