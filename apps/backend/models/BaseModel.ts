import type { FluxLoraOutput } from "@fal-ai/client/endpoints";

export class BaseModel {
    constructor(){}
        public async generateImage(prompt: string, tensorPath: string) : Promise<{ request_id: string }> {
            return { request_id: "" };
        }
        public async trainModel(zipUrl: string, triggerWord: string) : Promise<any> {
            return { request_id: "", response_id: "", zipUrl: "" };
        }
        public async fetchRequestData(requestId: string) : Promise<any> {
            return {
                
                    images: [],
                    timings: "",
                    seed: 0,
                    has_nsfw_concepts: [],
                    prompt: ""
                
            }
        
    }
    public async generateImageSync(tensorPath: string, triggerWord: string) : Promise<{ imageUrl: string }> {
        return {
            imageUrl: ""
        }
    }
}