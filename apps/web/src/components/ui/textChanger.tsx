"use client"
export const TextChanger = () => {

    return (
        <div className="text-xl h-20 p-10 rounded-[8px] flex text-[#7c7c7c] font-[semibold] [box-sizing:content-box] mt-2">
            <style jsx>{`
                @keyframes textChange{
                    10% {
                        transform: translateY(-102%);
                    }
                    25% {
                        transform: translateY(-100%);
                    }
                    35% {
                        transform: translateY(-202%);
                    }
                    50% {
                        transform: translateY(-200%);
                    }
                    60% {
                        transform: translateY(-302%);
                    }
                    75% {
                        transform: translateY(-300%);
                    }
                    85% {
                        transform: translateY(-402%);
                    }
                    100% {
                        transform: translateY(-400%);
                    }
                }
            `}</style>
            <div className="overflow-hidden relative ">
                <span className="block h-full p-6" style={{ animation: "textChange 4s infinite" }}>Look your best — AI-generated portraits that turn heads</span>
                <span className="block h-full p-6" style={{ animation: "textChange 4s infinite" }}>Perfect photos for Tinder, branding, or content — no photoshoot needed</span>
                <span className="block h-full p-6" style={{ animation: "textChange 4s infinite" }}>From swipe-right looks to scroll-stopping shots — powered by Flux LoRA</span>
                <span className="block h-full p-6" style={{ animation: "textChange 4s infinite" }}>Influence with impact — generate stunning images of yourself with AI</span>
                <span className="block h-full p-6" style={{ animation: "textChange 4s infinite" }}>Craft your best digital self — high-quality portraits for profiles that pop</span>
            </div>
        </div>
    )
}