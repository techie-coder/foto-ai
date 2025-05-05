"use client"
import { getModels } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import type { Model } from "common/inferred"
import { ModelCard } from "./ui/ModelCard"

export const Models = () => {
    const { getToken } = useAuth();

    const [createdModels, setCreatedModels] = useState<Model[]>([]);

    useEffect(() => {
        const getUserModels = async () => {
            const token = await getToken();
            if (token) {
                const response = await getModels(token);
                //console.log("Response from get model", response);
                console.log(response.models);
                setCreatedModels(response.models);
            }
        }
        getUserModels();
    }, [])


    return (
        <div className="grid grid-cols-3 gap-5 w-[90dvw] h-full p-4 overflow-auto">
            {createdModels.map((model, index) => (
                <ModelCard key={index} modelProps={model} />
            ))}
            <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                <h1 className="text-gray-500 text-xl">+ Create a new model</h1>
            </div>
        </div>
    )
}