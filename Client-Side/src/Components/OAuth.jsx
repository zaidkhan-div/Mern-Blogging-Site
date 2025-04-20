import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {

    const navigate = useNavigate();
    const dispatch = useNavigate();

    const auth = getAuth(app); // this is app from firebase.js

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider(); // this is to popup the window to select the account you wanna Continue with
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', { // here we are gonna send this data to backend 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle?.user?.displayName,
                    email: resultFromGoogle?.user?.email,
                    googlePhotoUrl: resultFromGoogle?.user?.photoURL
                })
            })
            const data = res.json();

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }

            console.log(resultFromGoogle);

        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>
            <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
                <AiFillGoogleCircle className='w-6 h-6 mr-2' />
                Continue with Google
            </Button>



        </>
    )
}

export default OAuth