"use client"
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/api';
import type { OutputImages } from 'common/inferred';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { Appbar } from '@/components/Appbar';

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { getToken } = useAuth();

    const [image, setImage] = useState<OutputImages>({} as OutputImages);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getImageResults = async () => {
            const token = await getToken();
            const slug = await params;
            const imageId = slug.slug;
            if (!token || !imageId) return;
            const response = await getImage(token, imageId);
            setImage(response.image);
            setLoading(false);
        };
        getImageResults();
    }, []);
    console.log(image);

    return (
        <>
            <Appbar />
            <div className="flex items-center justify-center min-h-screen bg-zinc-950">
                <div className="flex flex-row items-stretch justify-center">
                    {loading ? (
                        <p className="text-white text-xl">Loading...</p>
                    ) : (
                        <>
                            <Image
                                src={image.imageUrl}
                                alt={image.prompt}
                                width={500}
                                height={500}
                                layout="intrinsic"
                            />
                            <div className="w-[20dvw] bg-zinc-900 flex flex-col justify-between p-4">
                                <div className='flex flex-col justify-center gap-2'><h1 className="text-white text-sm">{image.prompt}</h1>
                                    <Tag title="model" value={image.modelId} />
                                    <Tag title="aspect ratio" value="1024:768" />
                                </div>
                                <DownloadButton imageUrl={image.imageUrl} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const Tag = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className='flex flex-row w-fit h-10 bg-zinc-800 rounded-md items-center justify-center gap-2 p-2'>
            <span className='text-white text-sm font-bold'>{title}</span>
            <span className='text-white text-sm'>{value}</span>
        </div>
    )
}

function DownloadButton({ imageUrl }: { imageUrl: string }) {

    const handleDownload = () => {
        const apiUrl = `/api/download?imageUrl=${encodeURIComponent(imageUrl)}`;
        const link = document.createElement('a');
        link.href = apiUrl;
        link.download = ''; // Leave blank so the server sets filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="p-2 border-2 border-cyan-400 text-xl text-white rounded-md"
        >
            Download Image
        </button>
    );
}