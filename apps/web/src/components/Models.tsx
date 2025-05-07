"use client"
import { generateImage, getModels } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import type { Model } from "common/inferred"
import { Skeleton } from "./ui/skeleton"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import arrow from "@public/arrow.svg"
import Image from "next/image"
import { AlertDemo } from "./ui/AlertDemo"

export const Models = () => {
    const { getToken } = useAuth();

    const [createdModels, setCreatedModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [alert, setAlert] = useState<boolean>(false);

    useEffect(() => {
        const getUserModels = async () => {
            const token = await getToken();
            if (token) {
                const response = await getModels(token);
                //console.log("Response from get model", response);
                console.log(response.models);
                setCreatedModels(response.models);
                setLoading(false);
            }
        }
        getUserModels();
    }, [])

    const handleSubmit = async () => {
        if (!selectedModel) return;
        const token = await getToken();
        if (!token) return;
        const input = {
            prompt,
            modelId: selectedModel,
            num: 1
        }
        const response = await generateImage(input, token);
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
        console.log("Response from generate image", response);
    }

    if (loading) return (
        <div className="h-[80vh] flex flex-col justify-center items-start gap-3"><Skeleton className="h-12 w-12 rounded-full dark" /><Skeleton className="w-[20vw] h-8 dark" /><Skeleton className="w-[16vw] h-8 dark" /></div>
    )

    return (
        <div className="flex flex-col justify-between gap-5">
            <div className="text-2xl text-white font-bold">
                Your models
            </div>
            <div className="grid grid-cols-5 gap-5 w-[90dvw] h-full p-4 overflow-auto">
                {createdModels.map((model, index) => (
                    <ModelCard
                        key={index}
                        modelProps={model}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                ))}
            </div>
            <div className="h-42 w-full flex items-center justify-center mt-18">
                <div className="relative w-[50%] h-full">
                    <button className="absolute bg-blue-400 top-5 right-5 w-10 h-10 flex justify-center items-center z-100 rounded-sm" onClick={handleSubmit}><div className="flex justify-center items-center w-8 h-8"><Image src={arrow} height={4} width={4} alt="button" className="w-6 h-6 object-cover" /></div></button>
                    <textarea className="w-full h-full rounded-xl border-cyan-400 bg-neutral-900 outline-cyan-400 focus:outline-1 text-white p-4 placeholder:text-md [resize:none] overflow-auto" placeholder="Type a prompt here" onChange={(e) => { setPrompt(e.target.value) }}></textarea>
                </div>
            </div>
            {alert && <AlertDemo />}
        </div>
    )
}

const ModelCard = ({
    modelProps,
    selectedModel,
    setSelectedModel,
}: {
    modelProps: Model,
    selectedModel: string,
    setSelectedModel: (id: string) => void
}) => {
    const isClicked = selectedModel === modelProps.id;

    return (
        <button onClick={() => setSelectedModel(modelProps.id)}>
            <Card className={isClicked
                ? "flex justify-center items-center overflow-auto dark p-4 border-cyan-400 border-2"
                : "flex justify-center items-center overflow-auto dark p-4 border-neutral-700 border-2"}>
                <div className="w-[200px] h-[200px]">
                    <Image src={modelProps.thumbnailUrl} width={250} height={250} alt="model thumbnail" className="w-full h-full object-cover rounded-sm" />
                </div>
                <CardHeader className="flex flex-col gap-2 text-white w-full">
                    <CardTitle>{modelProps.name}</CardTitle>
                </CardHeader>
            </Card>
        </button>
    );
};