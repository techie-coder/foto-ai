"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { generateImage, getModels } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import type { GenerateImageInput } from "common/inferred"
import { Textarea } from "./ui/textarea"

export const GenerateImage = () => {
    const { getToken } = useAuth();

    const [prompt, setPrompt] = useState<GenerateImageInput["prompt"]>("");
    const [modelId, setModelId] = useState<GenerateImageInput["modelId"]>("");

    const [createdModels, setCreatedModels] = useState<[]>([]);
    const input: GenerateImageInput = {
        prompt,
        modelId,
        num: 1,
    }

    const handleSubmit = async () => {
        const token = await getToken();
        if (token) {
            const response = await generateImage(input, token);
            console.log("Response from model", response);
        }
    }

    useEffect(() => {
        const getUserModels = async () => {
            const token = await getToken();
            if (token) {
                const response = await getModels(token);
                console.log("Response from get model", response);
                console.log(response.models);
                setCreatedModels(response.models);
            }
        }
        getUserModels();
    }, [])

    const router = useRouter();

    return (
        <Card className="w-full flex justify-center max-h-[50vh] overflow-auto dark">
            <CardHeader>
                <CardTitle>Generate an Image</CardTitle>
                <CardDescription>Geerate an image in one-click</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Prompt</Label>
                        <Textarea id="prompt" placeholder="Prompt" onChange={(e) => { setPrompt(e.target.value) }} />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="Gender">Model</Label>
                        <Select onValueChange={(value: GenerateImageInput["modelId"]) => { setModelId(value) }}>
                            <SelectTrigger id="Model">
                                <SelectValue placeholder="Name of the model" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {createdModels ?
                                    createdModels.map((item, index) => (<SelectItem key={index} value={item?.id}>{item?.name}</SelectItem>)) : (<SelectItem value="null">No models found</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => { router.push("/") }}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!prompt || !modelId}>Generate</Button>
            </CardFooter>
        </Card>
    )
}