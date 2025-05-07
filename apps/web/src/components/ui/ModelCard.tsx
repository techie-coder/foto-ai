"use client"
import type { Model } from "common/inferred"
import Image from "next/image"
import { Card, CardHeader } from "./card"
import { CardTitle } from "./card"
import { useState } from "react"

export const ModelCard = ({ modelProps, handleClick }: { modelProps: Model, handleClick: (model: string) => void }) => {

    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => { handleClick(modelProps.id); setClicked(true) }}>
                <Card className={clicked ? "flex justify-center items-center overflow-auto dark p-4 border-cyan-400 border-2" : "flex justify-center items-center overflow-auto dark p-4 border-neutral-700 border-2"}>
                    <div className="w-[200px] h-[200px]"><Image src={modelProps.thumbnailUrl} width={250} height={250} alt="model thumbnail" className="w-full h-full object-cover rounded-md" /></div>
                    <CardHeader className="flex flex-col gap-2 text-white w-full">
                        <CardTitle>{modelProps.name}</CardTitle>
                    </CardHeader>
                </Card>
            </button>
        </>
    )
}