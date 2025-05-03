"use client"
import { Button } from "@/components/ui/button"
import { Appbar } from "@/components/Appbar"
import { CreateModel } from "@/components/CreateModel"
import { GenerateImage } from "@/components/GenerateImage"
import { useState } from "react";

const Dashboard = () => {

    const [menuBar, setMenuBar] = useState<string>("Create Model");
    const menuBarItems = ["Create Model", "Generate Image", "Packs", "Library"];

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
                </div>
            </div>
        </>
    )
}

export default Dashboard;