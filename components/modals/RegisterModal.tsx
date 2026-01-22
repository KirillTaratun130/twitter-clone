import React, {useCallback, useState} from 'react';
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";

import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback( async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            toast.success('Account created!');

            signIn('credentials', {
                email,
                password
            });

            registerModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                type='email'
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)  } />
            <Input
                placeholder='Name'
                type='text'
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)  } />
            <Input
                placeholder='Username'
                type='text'
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)  } />
            <Input
                placeholder='Password'
                type='password'
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)  } />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account ? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>Sign in</span></p>
        </div>
    )


    return (
        <>
            <Modal
                isOpen={registerModal.isOpen}
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                actionLabel='Register'
                title='Create an account'
                body={bodyContent}
                footer={footerContent}
                disabled={isLoading}/>
        </>
    );
};

export default RegisterModal;