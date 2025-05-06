"use client"
import type { OutputImages } from "common/inferred"
import Image from "next/image"
import { useRouter } from "next/navigation"
export const Gallery = ({ images }: { images: OutputImages[] }) => {

    const router = useRouter()
    return (
        <div className="grid grid-cols-4 gap-4 p-5">
            {images.length > 0 && images.map((image) => (
                <div key={image.id} className="relative h-[400px] w-[300px] rounded-lg overflow-hidden group">
                    <button onClick={() => router.push(`/image/${image.id}`)}><Image
                        src={image.imageUrl}
                        fill
                        quality={100}
                        alt="Generated Image"
                        className="w-full h-full object-cover shadow-lg"
                    /></button>
                    <div className="absolute bottom-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                        <p className="text-white text-sm p-2">{image.prompt}</p>
                    </div>
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