import React from 'react';
import {useRouter} from "next/navigation";
import {FaFeather} from "react-icons/fa";

const SidebarTweetButton = () => {
    const router = useRouter();

    return (
        <div onClick={() => router.push('/')}>
            <div className='
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-sky-500
            hover:bg-sky-500/80
            transition
            cursor-pointer
            '>
                <FaFeather size={24} color='white' />
            </div>
            <div className='
            hidden
            lg:block
            mt-6
            px-4
            py-2
            rounded-full
            bg-sky-500
            hover:bg-sky-500/90
            cursor-pointer
            transition
            '>
                <p className='
                flex
                items-center
                justify-center
                text-white
                text-[20px]
                font-semibold'>
                    Tweet
                </p>
            </div>
        </div>
    );
};

export default SidebarTweetButton;