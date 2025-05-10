import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getPacksBulk, getModels } from "@/lib/api";
import type { Pack, Model } from "common/inferred";
import { PackCard } from "./ui/PackCard";
import { Skeleton } from "./ui/skeleton";

export const Packs = () => {
    const { getToken } = useAuth();
    const [packs, setPacks] = useState<Pack[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPacks = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getPacksBulk(token);
            setPacks(response.packs);
            setLoading(false);
        }
        getPacks();
    }, []);

    useEffect(() => {
        const handleGetModels = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getModels(token);
            setModels(response.models);
        }
        handleGetModels();
    }, []);

    return (
        <>
            {loading ? (
                <div className="h-[80vh] flex flex-col justify-center items-start gap-3">
                    <Skeleton className="h-12 w-12 rounded-full dark" />
                    <Skeleton className="w-[70vw] md:w-[30vw] h-8 dark" />
                    <Skeleton className="w-[50vw] md:w-[10vw] h-8 dark" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-10 overflow-auto">
                    {packs.map((pack, index) => (
                        <PackCard key={index} PackProps={pack} models={models} />
                    ))}
                </div>
            )}
        </>
    );
};
