import axios from 'axios';

interface RequestResponse {
  status: number;
  time: number;
}

export const fetchServerStatus = async (url: string): Promise<RequestResponse> => {
  const start = Date.now();
  try {
    const response = await axios.get(url); 
    const time = Date.now() - start;
    return { status: response.status, time };
  } catch (error) {
    const time = Date.now() - start;
    return { status: 500,  time };
  }
};
