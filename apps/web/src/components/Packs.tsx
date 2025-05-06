import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getPacksBulk, getModels } from "@/lib/api";
import type { Pack, Model } from "common/inferred";
import { PackCard } from "./ui/PackCard";

export const Packs = () => {
    const { getToken } = useAuth();
    const [packs, setPacks] = useState<Pack[]>([]);
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        const getPacks = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getPacksBulk(token);
            setPacks(response.packs);
        }
        getPacks();
    }, [])

    useEffect(() => {
        const handleGetModels = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getModels(token);
            setModels(response.models);
        }
        handleGetModels();
    }, [])

    return (
        <div className="grid grid-cols-3 gap-5 w-[90dvw] h-full p-4 overflow-auto">
            {packs.map((pack, index) => (
                <PackCard key={index} PackProps={pack} models={models} />
            ))}
        </div>
    )
}