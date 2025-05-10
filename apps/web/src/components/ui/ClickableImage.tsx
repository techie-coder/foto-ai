import Image from "next/image";
import type { Model } from "common/inferred";
import check from "@public/check.png";

export const ClickableImage = ({
    modelProps,
    handleModel,
    isSelected
}: {
    modelProps: Model,
    handleModel: (model: Model) => void,
    isSelected: boolean
}) => {

    return (
        <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] relative">
            <button
                className="absolute top-0 left-0 w-full h-full rounded-md overflow-hidden focus:outline-none"
                onClick={() => handleModel(modelProps)}
            >
                <Image
                    src={modelProps.thumbnailUrl}
                    alt="model thumbnail"
                    fill
                    className="object-cover rounded-md hover:brightness-75 transition duration-300 ease-in-out"
                />
                {isSelected && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <Image src={check} alt="tick" width={24} height={24} />
                    </div>
                )}
            </button>
        </div>
    );
};

