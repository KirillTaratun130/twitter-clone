import React, {useCallback, useEffect, useState} from 'react';
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "@/components/Modal";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [ profileImage, setProfileImage ] = useState('');
    const [ coverImage, setCoverImage ] = useState('');
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ bio, setBio ] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [
            currentUser?.profileImage,
            currentUser?.coverImage,
            currentUser?.name,
            currentUser?.username,
            currentUser?.bio
    ]
    );

    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                coverImage,
                profileImage
            });

            mutateFetchedUser();
            toast.success('Update');
            editModal.onClose();

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [name, username, bio, coverImage, profileImage, mutateFetchedUser, editModal])

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit your profile'
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit} />
    );
};

export default EditModal;