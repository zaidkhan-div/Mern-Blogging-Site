import { TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <>
            <div className='max-w-lg max-auto p-3 w-full'>
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <form className='flex flex-col gap-4'>
                    <div className='w-32 h-32 self-center cursor-pointer shadow-md 
                    overflow-hidden rounded-full'>
                        <img src={currentUser.profilePicture} alt="user" />
                    </div>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                    <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
                    <TextInput type='text' id='password' placeholder='password' />
                </form>
            </div>
        </>
    )
}

export default DashProfile