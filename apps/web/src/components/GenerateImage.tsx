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
import { Upload } from "@/components/ui/upload"
import { generateImage } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import { useState } from "react"
import type { GenerateImageInput } from "common/inferred"
import { Textarea } from "./ui/textarea"


export const GenerateImage = () => {
    const { getToken } = useAuth();
    const [prompt, setPrompt] = useState<GenerateImageInput["prompt"]>("");
    const [modelId, setModelId] = useState<GenerateImageInput["modelId"]>("");

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

    const onUpload = (url: string) => {

    }

    const router = useRouter();

    return (
        <Card className="w-full max-h-full overflow-auto dark">
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
                            <SelectTrigger id="Type">
                                <SelectValue placeholder="Type of the model" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="Man">Man</SelectItem>
                                <SelectItem value="Woman">Woman</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Upload onUpload={onUpload} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => { router.push("/") }}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!prompt || !modelId}>Create Model</Button>
            </CardFooter>
        </Card>
    )
}