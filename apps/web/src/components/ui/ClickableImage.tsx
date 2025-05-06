import Image from "next/image";
import type { Model } from "common/inferred";
import { useState } from "react";
import tick from "@public/tick.svg"

export const ClickableImage = ({ modelProps, handleModel }: { modelProps: Model, handleModel: (model: Model) => void }) => {

    const [click, setClick] = useState(false);

    return (
        <div className="w-[70px] h-[70px] relative">
            <button className='absolute top-0 left-0 w-full h-full bg-black/50 rounded-md' onClick={() => { setClick(true); handleModel(modelProps) }}><Image src={tick} fill alt="tick" /></button>
            <Image
                src={modelProps.thumbnailUrl}
                alt="model thumbnail"
                fill
                className="object-cover rounded-md hover:brightness-75 transition duration-300 ease-in-out"
            />
        </div>
    )
}