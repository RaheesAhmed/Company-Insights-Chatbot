import axios from 'axios';


const downloadPDF=async (url: string, outputPath: string): Promise<void> =>{
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
    } catch (error) {
        console.error('Error downloading PDF file:', error);
    }
}

export { downloadPDF };