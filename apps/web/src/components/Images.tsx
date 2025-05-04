"use client"
import type { OutputImages } from "common/inferred"
import Image from "next/image"
export const Images = ({ images }: { images: OutputImages[] }) => {
    return (
        <div className="grid grid-cols-2 gap-4 p-5">
            {images.length > 0 && images.filter((image) => image.status === "Completed").map((image) => (
                <div key={image.id} className="relative">
                    <Image
                        src={image.imageUrl}
                        height={400}
                        width={300}
                        alt="Generated Image"
                        className="rounded-lg shadow-lg"
                    />
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