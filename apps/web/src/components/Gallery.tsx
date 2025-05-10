"use client"
import type { OutputImages } from "common/inferred"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"
import menuIcon from "@public/menuIcon.png"
import { getImagesBulk } from "@/lib/api"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"

export const Gallery = () => {

    const [images, setImages] = useState<OutputImages[]>([])
    const { getToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        const getImages = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getImagesBulk(token);
            setImages(response.images);
            setLoading(false);
        }
        getImages();
    }, [])
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        )
    }


    return (
        <div className="grid grid-cols-4 gap-5 p-5">
            {images.length > 0 && images.map((image) => (
                <div key={image.id} className="relative h-[300px] w-[250px] rounded-lg overflow-hidden group">
                    {image.status === "Pending" ? <Skeleton className="w-full h-full rounded-md" /> : (<>
                        <button onClick={() => router.push(`/image/${image.id}`)}><Image
                            src={image.imageUrl}
                            fill
                            quality={100}
                            alt="Generated Image"
                            className="w-full h-full object-cover shadow-lg group-hover:blur-xs"
                        /></button>
                        <div className="absolute bottom-0 w-full h-full bg-black/30 opacity-0 transition group-hover:opacity-80 duration-300 ease-in-out flex flex-col items-center justify-center">
                            <p className="text-white text-xs p-2">{image.prompt}</p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                            <button onClick={() => router.push(`/image/${image.id}`)}>
                                <Image src={menuIcon} alt="Menu" width={20} height={20} className="w-5 h-5" /></button>
                        </div>
                    </>)}
                </div>
            ))}
            {images.length === 0 && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No images found</p>
                </div>
            )}
        </div>
    )
}
