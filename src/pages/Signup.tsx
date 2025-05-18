import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from "sonner"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState({
        name: '',
        username: '',
        profilePic: '',
        coverPic: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    

    const signupHandler = async(e) => {
        e.preventDefault()
        try {
            const isEmailValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(userDetails.email)
            if(!isEmailValid){
                toast('Invalid Email')
                return
            }

            const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(userDetails.password)
            if(!isPasswordValid){
                toast('Password must contain 8 charactors, 1 uppercase, 1 lowercase and 1 number')
            }

            if(userDetails.password !== userDetails.confirmPassword){
                toast('Password and Confirm Password does not match')
            }

            const res = await axios(`${import.meta.env.VITE_API_URI}/users/register`,{
                method: 'POST',
                data: {
                    fullName:userDetails.name,
                    email: userDetails.email,
                    username: userDetails.username,
                    password: userDetails.password,
                    avatar: userDetails.profilePic,
                    CoverImage: userDetails.coverPic
                }
            })
            console.log(res.data)
            if(res.status === 201){
                toast('Account created successfully')
                navigate('/login')
            }else{
                toast(res.data.message)
            }
        } catch (error : any) {
            toast(error.message)
        }
    }
    return (
        <main className='container'>
            <div className='flex flex-col gap-5 items-center min-h-screen'>
                <div className='flex flex-col justify-center items-center'>
                    
                    <Logo className='mx-auto mb-4'/>
                    <h1 className='text-2xl font-bold'>
                        Signup for your new account
                    </h1>
                    <h1>
                        Already a user? Login   <Link to='/login' className='text-blue-400'>here</Link>
                    </h1>
                
                </div>
                
                <form className='flex flex-col gap-5' onSubmit={signupHandler}>
                    <Input required placeholder='Name' value={userDetails.name} onChange={(e) => setUserDetails({...userDetails,name: e.target.value})} />
                    <Input required placeholder='Username' value={userDetails.username} onChange={(e) => setUserDetails({...userDetails,username: e.target.value.toLowerCase().split(' ').join('_')})} />
                    <Input required type='email' placeholder='Email' value={userDetails.email} onChange={(e) => setUserDetails({...userDetails,email: e.target.value})} />
                    <Input required type='password'  placeholder='Password' value={userDetails.password} onChange={(e) => setUserDetails({...userDetails,password: e.target.value})} />
                    <Input required type='password' placeholder='Confirm Password' value={userDetails.confirmPassword} onChange={(e) => setUserDetails({...userDetails,confirmPassword: e.target.value})} />
                    <label htmlFor='profilePic'>Profile Picture</label>
                    <Input type='file' id='profilePic' value={userDetails.profilePic} onChange={(e) => setUserDetails({...userDetails,profilePic: e.target.value})} placeholder='Profile Picture'/>
                    <label htmlFor='coverPic'>Profile Picture</label>
                    <Input type='file' id='coverPic' value={userDetails.coverPic} onChange={(e) => setUserDetails({...userDetails,coverPic: e.target.value})} placeholder='Cover Picture'/>
                    <Button type='submit' variant='secondary'>Signup</Button>
                </form>
            </div>
        </main>
    )
}