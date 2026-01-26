import React, {useCallback, useState} from 'react';

import { useDropzone } from "react-dropzone";
import Image from "next/image";


interface ImageUploadProps {
    value?: string;
    disabled?: boolean;
    onChange: (base64: string) => void;
    label: string;
}

const ImageUpload = ({ value, disabled, onChange, label }: ImageUploadProps) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }

        reader.readAsDataURL(file);
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    return (
        <div {...getRootProps({
            className: 'w-full cursor-pointer p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700'
        })}>
            <input {...getInputProps()} />
            { base64 ? (
                <div className='flex items-center justify-center'>
                    <Image src={base64} alt='Uploaded image' width='100' height='100' />
                </div>
            ) : (
                <p className='text-white'>{ label }</p>
            ) }
        </div>
    );
};

export default ImageUpload;