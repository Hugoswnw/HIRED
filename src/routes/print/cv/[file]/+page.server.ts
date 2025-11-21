import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';
import type { CVData } from '$lib/types/cv';

export const load: PageServerLoad = async ({ params }) => {
    const fileSafe = params.file.replace(/[^a-zA-Z0-9._-]/g, '');
    const fullPath = path.join("/app/files/cv/", `${fileSafe}.yaml`);
    
    let content: string;
    try {
        content = await fs.readFile(fullPath, 'utf8');
    } catch {
        throw error(404, `CV "${params.file}" not found`);
    }
    
    let cv: CVData;
    try {
        cv = YAML.parse(content) as CVData;
    } catch (e) {
        throw error(500, `Invalid YAML in CV "${params.file}"`);
    }
    
    if (cv.styles == null) {
        cv.styles = ["cv_default"]
    } else if (typeof cv.styles === 'string') {
        cv.styles = [cv.styles]
    }
    
    let styles: string[] = [];
    for (const style of cv.styles) {
    try {
        styles.push(
            await fs.readFile(path.join("/app/files/styles/", `${style}.css`), 'utf8')
        );
        } catch {
            throw error(404, `CSS "${style}" not found`);
        }
    }    

    return { cv, styles };
};