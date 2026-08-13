import fs from 'fs';
import path from 'path';

export default function Home() {
  const filePath = path.join(process.cwd(), 'index.html');
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    htmlContent = '<h1>Loading Rental Property OS...</h1>';
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}


