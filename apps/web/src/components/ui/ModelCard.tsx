"use client"
import type { Model } from "common/inferred"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { Button } from "./button"
import { useState } from "react"
import { Card, CardHeader } from "./card"
import { CardTitle, CardDescription } from "./card"
import { generateImage } from "@/lib/api"
export const ModelCard = ({ modelProps }: { modelProps: Model }) => {

    const { getToken } = useAuth();
    const [generate, setGenerate] = useState(false);
    const [prompt, setPrompt] = useState<string>("");
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async () => {
        const token = await getToken();
        if (token) {
            const input = {
                prompt,
                modelId: modelProps.id,
                num: 1
            }
            const response = await generateImage(input, token);
            console.log("Response from model", response);
        }
    }

    const modelDesciption = `${modelProps.name}, a ${modelProps.age}-year-old ${modelProps.ethnicity.replace(/_/g, " ")} ${modelProps.type.toLowerCase()} with ${modelProps.eyeColor.toLowerCase()} eyes${modelProps.bald ? ", and is bald." : "."}`
    console.log(modelProps.thumbnailUrl);
    return (
        <>
            <Card className="flex justify-center items-center overflow-auto dark p-4">
                <div className="w-[250px] h-[250px]"><Image src={modelProps.thumbnailUrl} width={250} height={250} alt="model thumbnail" className="w-full h-full object-cover rounded-md" /></div>
                <CardHeader className="flex flex-col gap-2 text-white w-full">
                    <CardTitle>{modelProps.name}</CardTitle>
                    <CardDescription>{modelDesciption}</CardDescription>
                </CardHeader>
                <Button className="bg-neutral-700 text-white hover:text-black" onClick={() => {
                    setGenerate(!generate);
                }}>Generate</Button>
                {generate && (
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-zinc-900 rounded-lg shadow-md border border-neutral-700 gap-3">
                        <textarea placeholder="Enter a prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-28 p-2 bg-zinc-800 rounded-md placeholder:text-white" />
                        <Button className="bg-neutral-700" onClick={handleSubmit}>Generate</Button>
                    </div>
                )}
            </Card>
        </>
    )
}