import { request } from "express";
import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAIModel extends BaseModel {
    constructor() {
        super();
    }

    public async generateImage(prompt: string, tensorPath: string) {
        // Implementation for generating an image using the FalAI model
        /*
        console.log(`Generating image with prompt: ${prompt} and tensor path: ${tensorPath}`);
        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
              prompt: prompt,
              loras: [{path: tensorPath, scale: 1}]
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
          });
        return { request_id, response_url };
        */
       return { request_id: "123", response_url: "http://example.com", tensorPath };         
    }

    public async trainModel(zipUrl: string, triggerWord: string) {
        // Implementation for training the FalAI model
        /*
        console.log(`Training model with input images: ${zipUrl} and trigger word: ${triggerWord}`);
        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
              images_data_url: zipUrl,
              trigger_word: triggerWord
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
          });
        return { request_id, response_url };
        */
        return { request_id: "", response_id: "", zipUrl };
    }
}