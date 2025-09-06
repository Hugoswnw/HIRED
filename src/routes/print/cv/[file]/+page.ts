import type { PageLoad } from '../$types';
import { error } from '@sveltejs/kit';
import type { CVData } from '$lib/types/cv';

const cvMap = import.meta.glob('/src/lib/data/cv/*.yaml', {
  eager: true,
  import: 'default'
}) as Record<string, CVData>;

export const load: PageLoad = async ({ params }) => {
  const key = `/src/lib/data/cv/${params.file}.yaml`;
  const cv = cvMap[key];
  if (!cv) throw error(404, `CV "${params.file}" not found`);
  return { cv };
};
