//npx babel-node --presets @babel/env tesseractTest.js
import { createWorker } from 'tesseract.js';

const worker = createWorker({
  logger: m => console.log(m)
});

(async () => {
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  const { data: { text } } = await worker.recognize(
    'path/result17.png'
    );
  console.log(text);
  await worker.terminate();
})();