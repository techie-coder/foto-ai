"use client"

import cloudUpload from "@public/upload.svg"
import Image from "next/image";
import { useState } from "react";
import { getZipUrl } from "@/lib/getZipUrl";
import { Button } from "./button";

export function Upload({ onUpload }: { onUpload: (url: string) => void }) {
    const [images, setImages] = useState<File[]>([]);

    return (
        <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col space-y-1.5 justify-center items-center">
                {images.length > 0 && (
                    <div className="w-full h-[150px] overflow-x-scroll overflow-y-hidden flex items-center gap-2 p-2">
                        {images.map((image, index) => (
                            <div key={index} className="flex-shrink-0">
                                <Image src={URL.createObjectURL(image)} width={150} height={150} alt={`uploaded image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
                <Image src={cloudUpload} width={60} height={60} alt="cloud upload icon" hidden={images.length > 0} />
                <Button className="" onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.multiple = true;
                    input.onchange = async (e) => {
                        const files = e.target.files;
                        if (files) {
                            console.log(files);
                            setImages(Array.from(files));
                            const zipUrl = await getZipUrl(Array.from(files));
                            console.log(zipUrl);
                            onUpload(zipUrl);
                        }
                    };
                    input.click();
                }}>Upload Images</Button>
            </div>
        </div>
    )
}