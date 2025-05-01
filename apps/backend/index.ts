import express from 'express';
import { trainModel, GenerateImage, GenerateImagesFromPack } from 'common/types';
import { prismaClient } from 'db';
import { FalAIModel } from './models/FalAIModel';
import { S3Client } from 'bun';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

const USER_ID = "123";

const falAiModel = new FalAIModel();

app.get("/pre-signed-url", async (req, res) => {
    const key = `images/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign(key,{
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60*5
    })

    res.json({
        url,
        key
    })
})

app.post("/ai/training", async (req, res) => {
    const parsedBody = trainModel.safeParse(req.body);
    if(!parsedBody.success){
        res.status(411).json({
            "message": "Input incorrect!"
        })
        return 
    }
    
    const {request_id, response_url} = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name)

    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: USER_ID,
            falAiReuestId: request_id,
            zipUrl: parsedBody.data.zipUrl,
        }
    })


    res.json({
        modelId: data.id
    });
})

app.post("/ai/generate", async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);

    if(!parsedBody.success){
        res.status(411).json({
            "message": "Input incorrect!"
        })
        return
    }

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

    const {request_id, response_url} = await falAiModel.generateImage(parsedBody.data.prompt, model.tensorPath);

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiReuestId: request_id,
        }
    })
    res.json({
        imageId: data.id
    })
})

app.post("/pack/generate", async (req, res) => {
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
    });

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt) => ({
            prompt: prompt.prompt,
            userId: USER_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: ""
        }))
    });

    res.json({
        images: images.map((image) => image.id)
    })

})

app.get("/pack/bulk", async (req, res) => {
    
    const packs = await prismaClient.packs.findMany({});

    res.json({
        packs
    })

})

app.get("/image/bulk", async (req, res) => {
    const ids = req.query.ids as string[];
    const limit = req.query.limit as string ?? "2";
    const offset = req.query.offset as string ?? "0";

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: { in: ids },
            userId: USER_ID
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    });
    res.json({
        images: imagesData
    })  
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
    await prismaClient.outputImages.updateMany({
        where:{
            falAiReuestId: request_id
        },
        data: {
            status: "Completed",
            imageUrl: req.body.image_url
        }
    })
    res.json({
        message: "Image generation completed"
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {   
  console.log('Server is running on port 3000');
}
);