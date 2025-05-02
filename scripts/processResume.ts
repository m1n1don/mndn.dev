import { writeFile } from 'fs/promises';
import resume from '~/data/resume.json';
import extras from '~/data/extras.json';

async function getTTS(text: string, lang: string, outputPath: string) {
  text = encodeURIComponent(text);
  lang = lang || 'en-us';
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${text}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to download file: ${res.statusText}`);
    return;
  }
  const arrBuf = await res.arrayBuffer();
  const buffer = Buffer.from(arrBuf);
  await writeFile(outputPath, buffer);
}

await getTTS(resume.basics.name, extras.tts.lang, 'dist/tts.mp3');
