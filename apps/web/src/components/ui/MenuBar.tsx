"use client"
import window from "@public/window.png";
import edit from "@public/edit.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import folder from "@public/folder.png";

export const MenuBar = () => {
    const menuBarItems = ["Library", "Generate", "Create Model", "Packs"];

    const router = useRouter();
    return (
        <>
            <div className="bg-neutral-900 backdrop-blur-xl flex flex-col justify-start items-center w-[25dvw]">
                <div className="w-full flex flex-row justify-between items-center mt-3 mx-5 px-3">
                    <button className="p-2 hover:bg-neutral-800 rounded-md transition-all duration-100"><Image src={window} alt="logo" width={25} height={25} className="object-cover" /></button>
                    <button className="p-2 hover:bg-neutral-800 rounded-md transition-all duration-100" onClick={() => router.push("/dashboard/generate")}><Image src={edit} alt="logo" width={25} height={25} className="object-cover" /></button>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center mt-10 w-[90%]">
                    {menuBarItems.map((item, index) => (
                        <button
                            key={index}
                            className=" text-white w-full flex flex-row justify-start gap-2 p-2 hover:bg-neutral-800 transition-all duration-100 text-start rounded-md"
                            onClick={() => router.push(`/dashboard/${item.toLowerCase()}`)}
                        >
                            <Image src={folder} width={25} height={10} alt="folder" className="object-cover " />{item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

