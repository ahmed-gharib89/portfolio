import fs from 'fs';
import path from 'path';

// Function to copy the CV file to the public directory
export function copyCV() {
  const sourcePath = '/home/ubuntu/upload/ - Ahmed Gharib - .pdf';
  const publicDir = path.join(process.cwd(), 'public');
  const filesDir = path.join(publicDir, 'files');
  
  // Create the files directory if it doesn't exist
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }
  
  const destinationPath = path.join(filesDir, 'ahmed-gharib-cv.pdf');
  
  try {
    fs.copyFileSync(sourcePath, destinationPath);
    console.log('CV file copied successfully to public/files directory');
    return true;
  } catch (error) {
    console.error('Error copying CV file:', error);
    return false;
  }
}
