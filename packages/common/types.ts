import { idText } from "typescript";
import { z } from "zod";

export const trainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]),
    age: z.number(),
    ethnicity: z.enum(["White",
        "Black",
        "Asian_American",
        "East_Asian",
        "South_East_Asian",
        "South_Asian",
        "Middle_Eastern",
        "Pacific",
        "Hispanic"
    ]),
    eyeColor: z.enum(["Black", "Brown", "Blue", "Hazel", "Grey"]),
    bald: z.boolean(),
    zipUrl: z.string()
})

export const Model = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]),
    age: z.number(),
    ethnicity: z.enum(["White",
        "Black",
        "Asian_American",
        "East_Asian",
        "South_East_Asian",
        "South_Asian",
        "Middle_Eastern",
        "Pacific",
        "Hispanic"
    ]),
    eyeColor: z.enum(["Black", "Brown", "Blue", "Hazel", "Grey"]),
    bald: z.boolean(),
    zipUrl: z.string(),
    thumbnailUrl: z.string(),
    public: z.boolean(),
    trainingStatus: z.enum(["Pending", "Completed", "Failed"]),
    tensorPath: z.string(),
    triggerWord: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    falAiRequestId: z.string().nullable(),
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
})

export const OutputImages = z.object({
    id : z.string(),           
  imageUrl: z.string(),      
  modelId: z.string(),       
  userId:  z.string(),       
  prompt: z.string(),
  status: z.enum(["Pending", "Completed", "Failed"]),
  Model: trainModel,         
  falAiReuestId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(), 
})

export const PackPrompt = z.object({
    id: z.string(),
    prompt: z.string(),
    packId: z.string(),
})

export const Pack = z.object({
    id: z.string(),
    name: z.string(),
    imageUrl1: z.string(),
    imageUrl2: z.string(),
    PackPrompts: z.array(PackPrompt)
})