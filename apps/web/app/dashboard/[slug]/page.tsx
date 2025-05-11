"use client"
import { CreateModel } from "@/components/CreateModel"
import { Models } from "@/components/Models"
import { Packs } from "@/components/Packs"
import { RedirectToSignIn, SignedOut, SignedIn } from "@clerk/nextjs"
import { Gallery } from "@/components/Gallery"
import { MenuBar } from "@/components/ui/MenuBar"
import { useRouter } from "next/navigation"

export default function Dashboard({ params, }: { params: { slug: string } }) {

    const router = useRouter();

    const slug = params.slug;

    return (
        <>
            <SignedIn>
                <div className="md:flex md:flex-row justify-around min-h-screen bg-zinc-950 w-full">
                    <MenuBar />
                    <div className="flex flex-col items-center justify-center">
                        {slug === "create" && <CreateModel onCancel={() => router.push("/dashboard/generate")} />}
                        {slug === "generate" && <Models />}
                        {slug === "packs" && <Packs />}
                        {slug === "library" && <Gallery />}
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}

