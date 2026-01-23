import React, {useCallback} from 'react';
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
    const { data: fetchedUser } = useUser(userId);
    const router = useRouter();

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url);
    }, [router, userId])

    return (
        <div className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'w-32' : 'w-12'}
            ${isLarge ? 'h-32' : 'h-12'}
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative`}>
            <Image fill style={{ objectFit: 'cover', borderRadius: '100%' }} onClick={onClick} src={fetchedUser?.profileImage || '/images/avatar.png'} alt='Avatar' />
        </div>
    );
};

export default Avatar;