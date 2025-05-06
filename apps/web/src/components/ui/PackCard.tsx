import type { Pack, Model } from 'common/inferred';
import Image from 'next/image';
import { generateImage } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { ClickableImage } from './ClickableImage';
export const PackCard = ({ PackProps, models }: { PackProps: Pack, models: Model[] }) => {

    const [generate, setGenerate] = useState<boolean>(false);
    const [currentModel, setCurrentModel] = useState<Model>({} as Model);
    const { getToken } = useAuth();

    const handleSubmit = async () => {
        if (!models) return;
        if (!generate) return;
        const token = await getToken();
        if (token) {
            const input = {
                prompt: PackProps.name,
                modelId: currentModel.id,
                num: 1
            }
            const response = await generateImage(input, token);
            console.log("Response from model", response);
        }
    }

    return (
        <div className="flex flex-col gap-2 p-4 justify-center items-center bg-zinc-900 rounded-lg border border-cyan-400">
            <div className='w-[170px] h-[200px] flex flex-row justify-center items-center gap-2'>
                <Image src={PackProps.imageUrl1} height={200} width={200} alt="model thumbnail" className="w-full h-full object-cover rounded-md" />
                <Image src={PackProps.imageUrl2} height={200} width={200} alt="model thumbnail" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="text-white text-xl font-bold">{PackProps.name}</h1>
                {generate && (
                    <div className='grid grid-cols-5 gap-2 justify-center items-center w-full h-full'>
                        {models.length > 0 && models.map((model, index) => (
                            <ClickableImage key={index} modelProps={model} handleModel={() => setCurrentModel(model)} />
                        ))}
                    </div>)}
                <button className='bg-black border border-cyan-400 text-white rounded-md w-24' onClick={() => { setGenerate(true); handleSubmit(); }}>Generate</button>
            </div>
        </div>
    )
}