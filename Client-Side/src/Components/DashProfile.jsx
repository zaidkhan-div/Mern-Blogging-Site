import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { supabase } from '../supabaseClient';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef(); // useRef does not cause re-render

    const handleProfilechange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file)); // This is the way to set the File Url 
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploadError(null);

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `profilePics/${fileName}`; // consistent path

        const { data, error } = await supabase.storage
            .from('mern-blog-picture')
            .upload(filePath, imageFile);

        if (error) {
            console.log(error.message);

            setImageFileUploadError('Image upload failed');
            return;
        }

        const { data: urlData } = supabase.storage
            .from('mern-blog-picture')
            .getPublicUrl(filePath);

        setImageUrl(urlData.publicUrl);
        setFormData({ ...formData, profilePicture: urlData.publicUrl });
    };


    // console.log(imageFile);
    // console.log('This is image Url ' + imageUrl);



    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <form className='flex flex-col gap-4'>
                    {/* We dont wanna show this input when we click the prfile we will call thsi using use ref */}
                    <input type="file" accept='image/*' className='hidden' onChange={handleProfilechange} ref={filePickerRef} />
                    <div className='w-32 h-32 self-center cursor-pointer shadow-md 
                    overflow-hidden rounded-full'>
                        <img src={imageUrl || currentUser.profilePicture} alt="user" onClick={() => filePickerRef.current.click()} />
                    </div>
                    {imageFileUploadError &&
                        <Alert color='failure'>
                            {imageFileUploadError}
                        </Alert>
                    }
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                    <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
                    <TextInput type='text' id='password' placeholder='password' />
                    <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-5'>
                    <span className='cursor-pointer'>Delete Account</span>
                    <span className='cursor-pointer'>Sign Out</span>
                </div>
            </div>
        </>
    )
}

export default DashProfile

// Craft rules based on data in your Firestore database 
// /allow write: if firestore.get( 
// /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin; 
// service firebase.storage ( 
// match/b/(bucket)/o { 
// match/(allPaths=**) ( 
// allow read: 
// allow write: if 
// request.resource.size 2 1024 1024 88 
// request.resource.contentType.matches('image/**) 
