"use client"
import { Button } from "@/components/ui/button"
import { Appbar } from "@/components/Appbar"
import { CreateModel } from "@/components/CreateModel"
import { GenerateImage } from "@/components/GenerateImage"
import { Images } from "@/components/Images"
import { useEffect, useState } from "react";
import { getImagesBulk } from "@/lib/api"
import { useAuth } from "@clerk/nextjs"
import type { OutputImages } from "common/inferred"
import { get } from "http"

const Dashboard = () => {

    const { getToken } = useAuth();
    const [menuBar, setMenuBar] = useState<string>("Create Model");
    const menuBarItems = ["Create Model", "Generate Image", "Packs", "Library"];
    const [images, setImages] = useState<OutputImages[]>([]);
    useEffect(() => {
        const getImages = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getImagesBulk(token);
            console.log(response);
            setImages(response.images);
        }
        getImages();
    }, [])

    return (
        <>
            <Appbar />
            <div className="bg-zinc-950 h-screen w-screen flex flex-row">
                <div className="w-[350px] overflow-auto pt-15 px-5">
                    {menuBar === "Create Model" ? <CreateModel /> : (menuBar === "Generate Image" ? <GenerateImage /> : <></>)}
                </div>
                <div className="flex-1 h-[85dvh] border border-white/10 rounded-md overflow-auto my-18 mr-5">
                    <div className="flex w-full justify-center items-center">
                        <div className="flex flex-row justify-center items-center gap-5 text-lg bg-neutral-800 border border-neutral-700 rounded-md mx-5 my-5 p-1 w-fit">
                            {menuBarItems.map((item, index) => (<Button key={index} onClick={() => setMenuBar(item)} className={menuBar === item ? "text-white bg-neutral-700 rounded-md" : "text-white bg-neutral-800 hover:bg-neutral-700 rounded-md"}>{item}</Button>))}
                        </div>
                    </div>
                    <Images images={images} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;