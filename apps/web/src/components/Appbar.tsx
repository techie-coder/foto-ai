"use client"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'

export const Appbar = () => {

    return (
        <div className="absolute z-100 bg-transparent flex flex-row justify-between items-center p-4 border-neutral-700 w-full h-[10vh]">
            <div className='text-xl text-white font-bold h-full'>
                <Link href="/">zeus</Link>
            </div>
            <div className='flex justify-between flex-row gap-10 text-sm text-white'>
                <div className="h-full group">
                    <Link href="/dashboard/generate" className='block'>Get Started</Link>
                    <div className='h-[0.1vh] bg-white w-0 opacity-0 group-hover:opacity-100 group-hover:w-full transition-[width,opacity] duration-500 mt-1' />
                </div>
                <div className="h-full group">
                    <Link href="/dashboard/gallery" className='block'>Gallery</Link>
                    <div className='h-[0.1vh] bg-white w-0 opacity-0 group-hover:opacity-100 group-hover:w-full transition-[width,opacity] duration-500 mt-1' />
                </div>
                <div className="h-full group">
                    <Link href="/pricing" className='block'>Pricing</Link>
                    <div className='h-[0.1vh] bg-white w-0 opacity-0 group-hover:opacity-100 group-hover:w-full transition-[width,opacity] duration-500 mt-1' />
                </div>
            </div>
            <div>
                <SignedOut>
                    <Button className=" bg-white text-black rounded-2xl hover:bg-white hover:underline transition-transform duration-300"><SignInButton /></Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}