"use client"
import type { OutputImages } from "common/inferred"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"

export const Gallery = ({ images }: { images: OutputImages[] }) => {

    const router = useRouter()
    return (
        <div className="grid grid-cols-4 gap-5 p-5">
            {images.length > 0 && images.map((image) => (
                <div key={image.id} className="relative h-[250px] w-[250px] rounded-lg overflow-hidden group">
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
                            <button className="border-black border w-12 h-12"><i className="fi fi-ts-arrow-circle-right"></i></button>
                        </div></>)}
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
