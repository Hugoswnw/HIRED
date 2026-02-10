import { error } from '@sveltejs/kit';
import YAML from 'yaml';
import type { PageLoad } from './$types';
import type { CVData } from '$lib/types/cv';
import type { LetterData } from '$lib/types/letter';

export const load: PageLoad = async ({ params, fetch }) => {
    const fileSafe = params.file.replace(/[^a-zA-Z0-9._-]/g, '');
    const res = await fetch(`/files/letter/${fileSafe}.yaml`);
    
    if (!res.ok) {
        throw error(404, `Letter "${params.file}" not found`);
    }
    
    const text = await res.text();
    let letter: LetterData;
    
    try {
        letter = YAML.parse(text) as LetterData;
    } catch {
        throw error(500, `Invalid YAML in Letter "${params.file}"`);
    }
    
    if (letter.styles == null) {
        letter.styles = ["letter_default"]
    } else if (typeof letter.styles === 'string') {
        letter.styles = [letter.styles]
    }
    
    return { letter };
};