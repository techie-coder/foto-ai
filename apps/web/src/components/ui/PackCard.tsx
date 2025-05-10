import type { Pack, Model } from 'common/inferred';
import Image from 'next/image';
import { generatePack } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { ClickableImage } from './ClickableImage';

export const PackCard = ({ PackProps, models }: { PackProps: Pack, models: Model[] }) => {
    const [generate, setGenerate] = useState<boolean>(false);
    const [currentModel, setCurrentModel] = useState<Model>({} as Model);
    const { getToken } = useAuth();

    const handleSubmit = async () => {
        if (!models || !generate || !currentModel.id) return;
        const token = await getToken();
        if (!token) return;
        const input = {
            packId: PackProps.id,
            modelId: currentModel.id,
        };
        const response = await generatePack(token, input);
        console.log("Response from generate image", response);
    };

    return (
        <div className="flex flex-col gap-2 p-4 justify-center items-center bg-zinc-900 rounded-lg border border-cyan-400">
            <div className='w-[170px] h-[200px] flex flex-row justify-center items-center gap-2'>
                <Image src={PackProps.imageUrl1} height={200} width={200} alt="model thumbnail" className="w-full h-full object-cover rounded-md" />
                <Image src={PackProps.imageUrl2} height={200} width={200} alt="model thumbnail" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="text-white text-xl font-bold">{PackProps.name}</h1>
                {generate && (
                    <>
                        <p className='text-sm text-white text-start'>Choose model :</p>
                        <div className='grid grid-cols-4 gap-2 justify-center items-center w-full h-full'>
                            {models.length > 0 && models.map((model, index) => (
                                <ClickableImage
                                    key={index}
                                    modelProps={model}
                                    isSelected={currentModel.id === model.id}
                                    handleModel={(m) => setCurrentModel(m)}
                                />
                            ))}
                        </div>
                    </>
                )}
                <button
                    className='bg-black border border-cyan-400 text-white rounded-md w-24 p-2'
                    onClick={() => {
                        setGenerate(true);
                        handleSubmit();
                    }}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};
