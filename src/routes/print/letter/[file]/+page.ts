import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const modules = import.meta.glob('/src/lib/data/letter/*.txt', { as: 'raw' });

export const load: PageLoad = async ({ params }) => {
  const key = `/src/lib/data/letter/${params.file}.txt`;
  const importer = modules[key];
  if (!importer) throw error(404, `Letter "${params.file}" not found`);
  const letterData = await importer();
  return { letterData };
};
