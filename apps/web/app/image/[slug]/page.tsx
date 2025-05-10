"use client"
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/api';
import type { OutputImages } from 'common/inferred';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { Appbar } from '@/components/Appbar';
import { Skeleton } from '@/components/ui/skeleton';
import download from "@public/download.png";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { getToken } = useAuth();

    const [image, setImage] = useState<OutputImages>({} as OutputImages);
    const [loading, setLoading] = useState<boolean>(true);
    const [timeDiff, setTimeDiff] = useState<string>("");

    useEffect(() => {
        const getImageResults = async () => {
            const token = await getToken();
            const slug = await params;
            const imageId = slug.slug;
            if (!token || !imageId) return;
            const response = await getImage(token, imageId);
            setImage(response.image);
            const currentTime = new Date();
            const createdAt = new Date(response.image.createdAt);
            setTimeDiff(getTimeDifference(createdAt.toString(), currentTime.toString()));
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
                        <div className="flex h-[90dvh] justify-center items-center space-x-4  dark">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
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
                                    <h2 className='text-sm text-white'><span className='text-zinc-500'>created</span> {timeDiff} ago</h2>
                                    <Tag title="model" value={image.modelId} />
                                    <Tag title="aspect ratio" value="1024:768" />
                                </div>
                                <div className='w-full flex flex-col gap-2'>
                                    <DownloadButton imageUrl={image.imageUrl} />
                                    <button
                                        className="flex flex-row justify-center items-center gap-3 p-2 bg-neutral-800 text-md text-white rounded-3xl"
                                    >
                                        Go Back
                                        <Image src={download} alt="Download" width={20} height={20} className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const Tag = ({ title, value }: { title: string, value: string }) => {
    if (!title || !value) return <></>;
    return (
        <div className='flex flex-row w-fit h-10 bg-zinc-800 rounded-md items-center justify-center gap-2 p-2'>
            <span className='text-white text-xs font-bold'>{title}</span>
            <span className='text-white text-xs'>{value}</span>
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
            className="flex flex-row justify-center items-center gap-3 p-2 bg-cyan-400 text-md font-bold text-white rounded-3xl"
        >
            Download
            <Image src={download} alt="Download" width={20} height={20} className="w-5 h-5" />
        </button>
    );
}

function getTimeDifference(t1: string, t2: string): string {
    const date1 = new Date(t1).getTime();
    const date2 = new Date(t2).getTime();
    let diffMs = Math.abs(date2 - date1); // in milliseconds

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;   // Approximation
    const year = 365 * day;  // Approximation

    if (diffMs < minute) {
        const seconds = Math.floor(diffMs / second);
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else if (diffMs < hour) {
        const minutes = Math.floor(diffMs / minute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (diffMs < day) {
        const hours = (diffMs / hour).toFixed(2);
        return `${hours} hour${hours !== '1.00' ? 's' : ''}`;
    } else if (diffMs < month) {
        const days = Math.floor(diffMs / day);
        return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (diffMs < year) {
        const months = Math.floor(diffMs / month);
        return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(diffMs / year);
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
}

