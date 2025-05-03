"use client"
import { useEffect, useRef } from "react"
import { Appbar } from "../Appbar"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export const Hero = () => {
    const router = useRouter();
    const homeRef = useRef(null);
    const toRef = useRef(null);

    useEffect(() => {
        const moveGradient = (event) => {
            const minWidth = window.innerWidth;
            const minHeight = window.innerHeight;
            const mouseX = Math.round((event.pageX / minWidth) * 100);
            const mouseY = Math.round((event.pageY / minHeight) * 100);

            if (homeRef) {
                homeRef.current.style.setProperty("--mouse-x", `${mouseX}%`);
                homeRef.current.style.setProperty("--mouse-y", `${mouseY}%`);
            }
        }
        document.addEventListener("mousemove", moveGradient);
        return function cleanup() {
            document.removeEventListener("mousemove", moveGradient);
        }
    }, [homeRef])

    return (
        <>
            <style jsx>{`
            .hero {
            filter: contrast(370%) brightness(100%);
            background: 
                linear-gradient(128deg, rgba(230,35,35,0.69), rgba(54,150,150,0.45)),
                radial-gradient(at var(--mouse-x, 40%) var(--mouse-y, 35%), rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.3' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            width: 100dvw ;
            height: 100dvh;
            }`}</style>
            <Appbar />
            <div ref={homeRef} className="hero flex flex-col items-center justify-center h-screen">
                <div className="bg-red-400 backdrop-blur-md text-white text-sm text-shadow-md rounded-2xl px-5 py-2">Unlock your free credits today!</div>
                <p className="text-7xl font-bold text-white text-shadow-lg text-center mix-blend-overlay opacity-30">From Text to Masterpiece, Explore the Future of AI-Driven Art</p>
                <p className="mt-4 text-lg text-gray-400">Generate stunning images with the power of AI</p>
                <Button onClick={() => { router.push("/dashboard") }} className="mt-5 bg-white text-black rounded-2xl hover:bg-white hover:underline transition-transform duration-300">Discover More
                </Button>
            </div>
        </>
    )
}

