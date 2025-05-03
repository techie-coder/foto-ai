import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'

export const Appbar = () => {
    return (
        <div className="sticky bg-black z-100 flex justify-between p-4 border-b border-neutral-700">
            <div className='text-xl text-white font-bold'>
                foto-ai
            </div>
            <div>
                <SignedOut>
                    <Button variant="ghost" className='bg-white text-black'><SignInButton /></Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}