import { TrainModelInput } from "common/inferred";
import axios from "axios";
import { BACKEND_URL } from "./config";

export async function trainModel(input: TrainModelInput, token: string) {
  const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}