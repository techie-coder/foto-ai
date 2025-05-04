import type { FluxLoraOutput } from "@fal-ai/client/endpoints";

export class BaseModel {
    constructor(){}
        private async generateImage(prompt: string, tensorPath: string) : Promise<{ request_id: string }> {
            return { request_id: "" };
        }
        private async trainModel(zipUrl: string, triggerWord: string) : Promise<{ request_id: string, response_url: string, zipUrl: string }> {
            return { request_id: "", response_url: "", zipUrl: "" };
        }
        private async fetchRequestData(requestId: string) : Promise<FluxLoraOutput> {
            return {
                
                    images: [],
                    timings: "",
                    seed: 0,
                    has_nsfw_concepts: [],
                    prompt: ""
                
            }
    }
}