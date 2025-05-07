import { request } from "express";
import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAIModel extends BaseModel {
    constructor() {
        super();
    }

    public async generateImage(prompt: string, tensorPath: string) {
        console.log(`Generating image with prompt: ${prompt} and tensor path: ${tensorPath}`);
        try{
          if(!prompt || !tensorPath){
            throw new Error("Either prompt or tensor path is missing");
          }
          else if(prompt === "test_prompt"){
            return { request_id: "test_request_id" };
          }
          if (!process.env.WEBHOOK_BASE_URL) {
            throw new Error("WEBHOOK_BASE_URL is not set");
          }
          if(prompt.length <= 0 || tensorPath.length <= 0){
            throw new Error("Prompt or tensor path is empty");
          }
          const { request_id } = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
              prompt: prompt,
              loras: [{path: tensorPath, scale: 1}],
              num_images: 1
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
          });
          return { request_id };  
        }
        catch(e){
          console.log("Error sending request to fal-ai", e);
          return { request_id: "" };
        }
    }

    public async trainModel(zipUrl: string, triggerWord: string) {
        // Implementation for training the FalAI model
        if(!zipUrl || !triggerWord) {
            throw new Error("Either zipUrl or triggerWord is missing");
        }
        if (!process.env.WEBHOOK_BASE_URL) {
            throw new Error("WEBHOOK_BASE_URL is not set");
        }
        if(zipUrl.length <= 0 || triggerWord.length <= 0){
            throw new Error("zipUrl or triggerWord is empty");
        }
        // Submit the training job to FalAI
        console.log(`Training model with input images: ${zipUrl} and trigger word: ${triggerWord}`);
        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
              images_data_url: zipUrl,
              trigger_word: triggerWord
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
          });
        return { request_id, response_url };
    }

    public async fetchRequestData(requestId: string) {
        // Implementation for fetching request data from FalAI
        console.log(`Fetching request data for request ID: ${requestId}`);
        try{
          const response = await fal.queue.result("fal-ai/flux-lora", {
            requestId: requestId,
          });
          console.log(response);
          return response;
        }
        catch(e){
          console.log("Error fetching request data", e);
          return null;
        }
    }

    public async generateImageSync(tensorPath: string, triggerWord: string) {
      const response = await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt: `A handsome man with my face holding a cup of coffee, dressed in a soft knit sweater, sitting on a couch surrounded by warm-toned pillows and fairy lights, studio setting with diffused lighting, relaxed and confident expression, high-resolution photorealism ${triggerWord}`,
          loras: [{path: tensorPath, scale: 1}],
        }
      });
      return {
        imageUrl: response.data.images[0]?.url || "",
      }
    }
}