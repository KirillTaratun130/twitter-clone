import React, {useCallback, useState} from 'react';
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();

    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback( async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            })

            loginModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                type='email'
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)  } />
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
            <p>First time using Twitter ? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>Create an account</span></p>
        </div>
    )


    return (
        <>
            <Modal
                isOpen={loginModal.isOpen}
                onClose={loginModal.onClose}
                onSubmit={onSubmit}
                actionLabel='Sign in'
                title='Login'
                body={bodyContent}
                disabled={isLoading}
                footer={footerContent}/>
        </>
    );
};

export default LoginModal;