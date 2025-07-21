// api/openseesService.js
import axios from 'axios';

// Everything under /api will be proxied by Nginx
const API_URL = '/api'; // Production
// const API_URL = 'http://127.0.0.1:5000'; // Deveopment

export const runAnalysis = async (modelData) => {
  // console.log("Data send to backend", modelData);
  try {
    const response = await axios.post(`${API_URL}/run-analysis`, modelData);
    // console.log("Response data", response);
    return response.data;
  } catch (error) {
    console.error('Analysis failed:', error);
    return { status: 'error', message: error.message };
  }
};

export const cleanupOutput = async (outputDir) => {
  // console.log("Cleanup request for", outputDir);
  try {
    const response = await axios.post(
      `${API_URL}/cleanup-output`,
      { output_dir: outputDir }
    );
    return response.data;
  } catch (error) {
    console.error('Cleanup failed:', error);
    return { status: 'error', message: error.message };
  }
};
