"use client"
import { Button } from "@/components/ui/button"
import { Appbar } from "@/components/Appbar"
import { CreateModel } from "@/components/CreateModel"
import { Models } from "@/components/Models"
import { Images } from "@/components/Images"
import { useEffect, useState } from "react";
import { getImagesBulk } from "@/lib/api"
import { RedirectToSignIn, SignedOut, SignedIn, useAuth } from "@clerk/nextjs"
import type { OutputImages } from "common/inferred"

const Dashboard = () => {
    const { getToken } = useAuth();
    const [menuBar, setMenuBar] = useState<string>("");
    const menuBarItems = ["Create Model", "Models", "Packs", "Library"];
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
            <SignedIn>
                <div className="h-screen bg-zinc-950 w-full">
                    <Appbar />
                    <div className="flex flex-col items-center justify-center w-full pt-20">
                        <div className="flex flex-row items-center justify-center w-full h-16 gap-2">
                            {menuBarItems.map((item) => (
                                <Button
                                    key={item}
                                    onClick={() => setMenuBar(item)}
                                    className="bg-neutral-700"
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                        {menuBar === "Create Model" && <CreateModel />}
                        {menuBar === "Models" && <Models />}
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}

export default Dashboard;