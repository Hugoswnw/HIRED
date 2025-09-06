import { chromium } from 'playwright';
import fs from 'node:fs';

const OUTDIR = './exports';
const PAGES = ['http://localhost:5173/print/cv/hlb', 'http://localhost:5173/print/cv/ml_engineer', 'http://localhost:5173/print/letter/1'];

if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR);

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

for (const url of PAGES) {
    await page.goto(url, { waitUntil: 'networkidle' });
    const name = url.split('/').pop();
    await page.pdf({
        path: `${OUTDIR}/${name}.pdf`,
        printBackground: true,
        preferCSSPageSize: true
    });
    console.log(`✅ Exporté: ${OUTDIR}/${name}.pdf`);
}

await browser.close();