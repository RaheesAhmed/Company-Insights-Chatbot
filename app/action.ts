import axios from 'axios';
import fs from 'fs';

const downloadPDF=async (url: string, outputPath: string): Promise<void> =>{
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, response.data);
        console.log('PDF file downloaded successfully!');
    } catch (error) {
        console.error('Error downloading PDF file:', error);
    }
}

export { downloadPDF };