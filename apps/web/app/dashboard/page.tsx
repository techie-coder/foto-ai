"use client"
import { Button } from "@/components/ui/button"
import { Appbar } from "@/components/Appbar"
import { CreateModel } from "@/components/CreateModel"
import { Models } from "@/components/Models"
import { Packs } from "@/components/Packs"
import { useEffect, useState } from "react";
import { getImagesBulk } from "@/lib/api"
import { RedirectToSignIn, SignedOut, SignedIn, useAuth } from "@clerk/nextjs"
import type { OutputImages } from "common/inferred"
import { Gallery } from "@/components/Gallery"
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonDemo } from "@/components/ui/SkeletonDemo"

const Dashboard = () => {
    const { getToken } = useAuth();
    const [menuBar, setMenuBar] = useState<string>("Gallery");
    const menuBarItems = ["Gallery", "Generate", "Create Model", "Packs"];
    const [images, setImages] = useState<OutputImages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const getImages = async () => {
            const token = await getToken();
            if (!token) return;
            const response = await getImagesBulk(token);
            console.log(response);
            setImages(response.images);
            setLoading(false);
        }
        getImages();
    }, [])

    return (
        <>
            <SignedIn>
                <div className="min-h-screen bg-zinc-950 w-full">
                    <Appbar />
                    <div className="flex flex-col items-center justify-center w-full pt-20">
                        <div className="flex flex-row items-center justify-center w-full h-16 gap-2">
                            {menuBarItems.map((item) => (
                                <Button
                                    key={item}
                                    onClick={() => setMenuBar(item)}
                                    className={item === menuBar ? "bg-neutral-700 hover:bg-neutral-700" : "bg-neutral-900 hover:bg-neutral-900"}
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                        {menuBar === "Create Model" && <CreateModel onCancel={() => setMenuBar("")} />}
                        {menuBar === "Generate" && <Models />}
                        {menuBar === "Packs" && <Packs />}
                        {menuBar === "Gallery" && (loading ? (<div className="h-[80vh] flex flex-col justify-center items-start gap-3"><Skeleton className="h-12 w-12 rounded-full dark" /><Skeleton className="w-[20vw] h-8 dark" /><Skeleton className="w-[16vw] h-8 dark" /></div>) : <Gallery images={images} />)}
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

