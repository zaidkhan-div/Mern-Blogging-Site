import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { supabase } from '../supabaseClient.js';
import { updateStart, updateFailure, updateSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// import { randomUUID } from 'crypto'; this is buitlin in ndoe.js not in React


const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateUserSucces, setUpdateUserSucces] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const filePickerRef = useRef(); // useRef does not cause re-render
    const dispatch = useDispatch();


    useEffect(() => {
        const storedImageUrl = localStorage.getItem('profilesImg');
        if (storedImageUrl) {
            setImageUrl(storedImageUrl);
        }
    }, []);

    let randomId = currentUser._id || uuidv4();

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
        const filePath = `profilePics/${fileName}`;

        // 1. Upload image to Supabase storage
        const { error: uploadError } = await supabase.storage
            .from('mern-blog-picture')
            .upload(filePath, imageFile);

        if (uploadError) {
            console.log(uploadError.message);
            setImageFileUploadError('Image upload failed');
            return;
        }

        // 2. Get public URL
        const { data: urlData } = supabase.storage
            .from('mern-blog-picture')
            .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        localStorage.setItem('profilesImg', publicUrl)

        // 3. Save URL to 'profiles' table
        await supabase.from('profiles').upsert({
            id: randomId,
            username: currentUser.username,
            custom_id: currentUser._id.toString(), // make sure this ID matches your table setup
            avatar_url: publicUrl,
        });

        console.log('This is public Url ' + publicUrl);

        // 4. Set image in state
        setImageUrl(publicUrl);
        setFormData({ ...formData, profilePicture: publicUrl });
    };


    /*const uploadImage = async () => {
        setImageFileUploadError(null);

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `profilePics/${fileName}`; // consistent path

        // const { data, error } = await supabase.storage
        //     .from('mern-blog-picture')
        //     .upload(filePath, imageFile);
        const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('custom_id', currentUser._id.toString())
            .limit(1)
            .maybeSingle();


        setImageUrl(data?.avatar_url);


        if (error) {
            console.log(error.message);
            setImageFileUploadError('Image upload failed');
            return;
        }


        // const { data: urlData } = supabase.storage
        //     .from('mern-blog-picture')
        //     .getPublicUrl(filePath);
        const { data: urlData } = await supabase.storage.from('mern-blog-picture').getPublicUrl(filePath);
        await supabase.from('profiles').upsert({
            id: currentUser._id,
            avatar_url: urlData.publicUrl,
        });


        setImageUrl(data?.avatar_url);


        setImageUrl(urlData.publicUrl);
        setFormData({ ...formData, profilePicture: urlData.publicUrl });
    };*/

    /*This is another One */

    // const uploadImage = async () => {
    //     setImageFileUploadError(null);

    //     const fileExt = imageFile.name.split('.').pop();
    //     const fileName = `${Date.now()}.${fileExt}`;
    //     const filePath = `profilePics/${fileName}`;

    //     const { data, error } = await supabase.storage
    //         .from('mern-blog-picture')
    //         .upload(filePath, imageFile);

    //     if (error) {
    //         console.log(error.message);
    //         setImageFileUploadError('Image upload failed');
    //         return;
    //     }

    //     // Get the public URL
    //     const urlData = supabase.storage
    //         .from('mern-blog-picture')
    //         .getPublicUrl(filePath);

    //     // Save the URL to profiles table
    //     await supabase
    //         .from('profiles')
    //         .upsert({
    //             id: currentUser.,  // Use the logged-in user's ID
    //             profile_picture: urlData.publicUrl,
    //         });

    //     setImageUrl(urlData.publicUrl);
    //     setFormData({ ...formData, profilePicture: urlData.publicUrl });
    // };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);

        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made')
            return;
        }
        try {
            dispatch(updateStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message)
                return;
            }
            else {
                dispatch(updateSuccess(data))
                setUpdateUserSucces('user profiel updated succesfully')
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    }

    // console.log(imageFile);
    // console.log('This is image Url ' + imageUrl);



    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}
                        onChange={handleChange} />
                    <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}
                        onChange={handleChange} />
                    <TextInput type='text' id='password' placeholder='password'
                        onChange={handleChange} />
                    <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-5'>
                    <span className='cursor-pointer'>Delete Account</span>
                    <span className='cursor-pointer'>Sign Out</span>
                </div>
                {updateUserSucces && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSucces}
                    </Alert>
                )}
                {updateUserError && (
                    <Alert color='failure' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )}
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
