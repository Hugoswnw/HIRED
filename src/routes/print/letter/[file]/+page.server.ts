import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import fs from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
    const fileSafe = params.file.replace(/[^a-zA-Z0-9._-]/g, '');
    const fullPath = path.join("/app/files/letter/", `${fileSafe}.txt`);
    
    let letterData: string;
    try {
        letterData = await fs.readFile(fullPath, 'utf8');
    } catch {
        throw error(404, `CV "${params.file}" not found`);
    }
    
    return { letterData };
};