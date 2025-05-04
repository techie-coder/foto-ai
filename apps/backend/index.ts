import express from 'express';
import { trainModel, GenerateImage, GenerateImagesFromPack } from 'common/types';
import { prismaClient } from 'db';
import { FalAIModel } from './models/FalAIModel';
import { S3Client } from 'bun';
import cors from 'cors';
import { authMiddleware } from './middleware/authMiddleware';
import { falMiddleware } from './middleware/falMiddleware';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const falAiModel = new FalAIModel();

app.get("/pre-signed-url", async (req, res) => {
    const key = `images/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign(key,{
        method: "PUT",
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60*10,
        type: "application/zip"
    })

    res.json({
        url,
        key
    })
})

app.post("/ai/training", authMiddleware, async (req, res) => {
    const parsedBody = trainModel.safeParse(req.body);
    if(!parsedBody.success){
        res.status(411).json({
            "message": "Input incorrect!"
        })
        return 
    }
    
    const {request_id, response_url, zipUrl} = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name)

    
    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: req.userId,
            falAiReuestId: request_id,
            zipUrl: parsedBody.data.zipUrl,
        }
    })

    res.json({
        request_id,
        response_url,
        zipUrl
    })
})

app.post("/ai/generate", authMiddleware, async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);

    if(!parsedBody.success){
        res.status(411).json({
            "message": "Input incorrect!"
        })
        return
    }
    try{
        const model = await prismaClient.model.findUnique({
            where: {
                id: parsedBody.data.modelId
            }
        })

        if(!model || !model.tensorPath){
            res.status(411).json({
                "message": "Model not found!"
            })
            return
        }
        const triggerWord = model.triggerWord;
        const prompt = parsedBody.data.prompt === "test_prompt" ? parsedBody.data.prompt : (parsedBody.data.prompt+ triggerWord);

        const {request_id } = await falAiModel.generateImage(prompt, model.tensorPath);
        console.log("Request ID", request_id);
        const data = await prismaClient.outputImages.create({
            data: {
                prompt: parsedBody.data.prompt,
                userId: req.userId,
                modelId: parsedBody.data.modelId,
                imageUrl: "",
                falAiReuestId: request_id,
            }
        })
        res.json({
            imageId: data.id,
        })
    }catch(e){
        console.log("Error generating image");
        res.json({
            message: "Error generating image"
        })
    }
})

app.post("/pack/generate", authMiddleware, async (req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);

    if(!parsedBody.success){
        res.status(411).json({
            "message": "Input incorrect!"
        })
        return
    }
    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId,
        }
    })

    let request_id: {request_id: string}[] = await Promise.all(prompts.map((prompt) => falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)));
    

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.userId,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiReuestId: request_id[index].request_id,
        }))
    });

    res.json({
        images: images.map((image) => image.id)
    })

})

app.get("/pack/bulk", authMiddleware, async (req, res) => {
    
    const packs = await prismaClient.packs.findMany({});

    res.json({
        packs
    })

})

app.get("/image/bulk", authMiddleware, async (req, res) => {
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            userId: req.userId
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    });
    res.json({
        images: imagesData
    })  
})

app.get("/ai/models", authMiddleware, async (req, res) => {
    const userId = req.userId;
    try{
        const models = await prismaClient.model.findMany({
            where: {
                userId: userId
            }
        })
        res.json({
            models
        })
    }catch(e){
        res.json({
            message: "Error fetching models"
        })
    }
})

app.post("/fal-ai/webhook/train", async (req, res) => {
    const request_id = req.body.request_id as string;
    await prismaClient.model.updateMany({
        where:{
            falAiReuestId: request_id
        },
        data: {
            trainingStatus: "Completed",
            tensorPath: req.body.tensor_path
        }
    })
    res.json({
        message: "Training completed"
    })    
});

app.post("/fal-ai/webhook/image", async (req, res) => {
    const request_id = req.body.request_id as string;
    console.log(req.body);
    if (req.body.status === "OK") {
        if(req.body.payload.images) {
        const images = req.body.payload.images;
        const imageUrl = images[0].url;
        await prismaClient.outputImages.updateMany({
            where:{
                falAiReuestId: request_id
            },
            data: {
                status: "Completed",
                imageUrl: imageUrl
            }
        })
        }
    }
    res.json({
        image_url : req.body.payload.images[0].url,
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {   
  console.log('Server is running on port 3000');
}
);