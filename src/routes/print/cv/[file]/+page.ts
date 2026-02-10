import { error } from '@sveltejs/kit';
import YAML from 'yaml';
import type { PageLoad } from './$types';
import type { CVData } from '$lib/types/cv';

export const load: PageLoad = async ({ params, fetch }) => {
    const fileSafe = params.file.replace(/[^a-zA-Z0-9._-]/g, '');
    const res = await fetch(`/files/cv/${fileSafe}.yaml`);
    
    if (!res.ok) {
        throw error(404, `CV "${params.file}" not found`);
    }
    
    const text = await res.text();
    let cv: CVData;
    
    try {
        cv = YAML.parse(text) as CVData;
    } catch {
        throw error(500, `Invalid YAML in CV "${params.file}"`);
    }
    
    if (cv.styles == null) {
        cv.styles = ["cv_default"]
    } else if (typeof cv.styles === 'string') {
        cv.styles = [cv.styles]
    }
    
    return { cv };
};