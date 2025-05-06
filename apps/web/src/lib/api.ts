import { TrainModelInput } from "common/inferred";
import { GenerateImageInput } from "common/inferred";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function trainModel(input: TrainModelInput, token: string) {
  const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function generateImage(input: GenerateImageInput , token: string) {
  if(input.modelId === "null" || !token) return
  const response = await axios.post(`${BACKEND_URL}/ai/generate`, input, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const getModels = async (token: string) => {
  const response = await axios.get(`${BACKEND_URL}/ai/models`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const getImagesBulk = async (token: string) => {
  const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const getImage = async (token: string, imageId: string) => {
  console.log(imageId);
  const response = await axios.get(`${BACKEND_URL}/image/${imageId}`, {
    headers: {
      authorization: `Bearer ${token}`  
    }
  })
  return response.data;
}

export const getPacksBulk = async (token: string) => {
  const response = await axios.get(`${BACKEND_URL}/pack/bulk`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const generatePack = async (token: string, input: {packId: string, modelId: string}) => {
  const response = await axios.post(`${BACKEND_URL}/pack/generate`, input, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
