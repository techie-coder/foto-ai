"use client"
import { generateImage, getModels } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import type { Model } from "common/inferred"
import { Skeleton } from "./ui/skeleton"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import arrow from "@public/arrow2.png"
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
        const input = { prompt, modelId: selectedModel, num: 1 };
        const response = await generateImage(input, token);
        setAlert(true);
        setTimeout(() => setAlert(false), 5000);
        console.log("Response from generate image", response);
    }

    if (loading) return (
        <div className="h-[80vh] flex flex-col justify-center items-start gap-3 px-4">
            <Skeleton className="h-12 w-12 rounded-full dark" />
            <Skeleton className="w-[50vw] sm:w-[30vw] h-8 dark" />
            <Skeleton className="w-[40vw] sm:w-[24vw] h-8 dark" />
        </div>
    );

    return (
        <div className="flex flex-col justify-between gap-5 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl text-white font-bold">
                Your models
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full h-full overflow-auto">
                {createdModels.map((model, index) => (
                    <ModelCard
                        key={index}
                        modelProps={model}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-10">

                <div className="relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] mt-32 h-full">
                    <div
                        className={`
        absolute top-2 right-2 z-10 transition-all duration-300
        ${prompt.length > 0
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                            }
    `}
                    >
                        <button
                            className="bg-blue-400 w-10 h-10 flex justify-center items-center rounded-sm"
                            onClick={handleSubmit}
                        >
                            <div className="flex justify-center items-center w-6 h-6">
                                <Image src={arrow} width={10} height={10} alt="button" className="w-full h-full object-cover" />
                            </div>
                        </button>
                    </div>
                    <textarea
                        className="w-full min-h-[120px] rounded-xl border-cyan-400 bg-neutral-900 outline-cyan-400 focus:outline-1 text-white p-4 placeholder:text-md [resize:none] overflow-auto"
                        placeholder="Type a prompt here"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
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
        <button onClick={() => setSelectedModel(modelProps.id)} className="w-full">
            <Card className={`${isClicked
                ? "border-cyan-400"
                : "border-neutral-700"} flex flex-col justify-center items-center overflow-hidden dark p-2 sm:p-4 border-2`}>
                <div className="w-full h-[180px] sm:h-[200px]">
                    <Image src={modelProps.thumbnailUrl} width={250} height={250} alt="model thumbnail" className="w-full h-full object-cover rounded-sm" />
                </div>
                <CardHeader className="flex flex-col gap-2 text-white w-full text-center">
                    <CardTitle className="text-sm sm:text-base">{modelProps.name}</CardTitle>
                </CardHeader>
            </Card>
        </button>
    );
};
