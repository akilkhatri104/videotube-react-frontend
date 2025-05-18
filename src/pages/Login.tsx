import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from "sonner"
import axios from 'axios'
import api from '@/api/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '@/store/userSlice'

export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userDetails,setUserDetails] = useState({
        username: '',
        password: ''
    })
    

    const loginHandler = async(e) => {
        e.preventDefault()
        try {

            const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(userDetails.password)
            if(!isPasswordValid){
                toast('Password must contain 8 charactors, 1 uppercase, 1 lowercase and 1 number')
            }

            const res = await api.post('users/login',userDetails)
            console.log(res.data)
            if(res.status === 200){
                toast('User logged in succesfully')
                dispatch(login({
                 user: {
                    id: res.data.data.user._id,
                    fullName: res.data.data.user.fullName,
                    username: res.data.data.user.username,
                    profilePic: res.data.data.user.avatar,
                    coverPic: res.data.data.user.CoverImage,
                    email: res.data.data.user.email,
                },
                isEmailVerified: res.data.data.user.isEmailVerified,
                authStatus: true
                }))
                navigate('/')
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
                        Login to your new account
                    </h1>
                    <h1>
                        Not a user? Signup <Link to='/signup' className='text-blue-400'>here</Link>
                    </h1>
                
                </div>
                
                <form className='flex flex-col gap-5' onSubmit={loginHandler}>
                    <Input required placeholder='Username' value={userDetails.username} onChange={(e) => setUserDetails({...userDetails,username: e.target.value.toLowerCase().split(' ').join('_')})} />
                    <Input required type='password'  placeholder='Password' value={userDetails.password} onChange={(e) => setUserDetails({...userDetails,password: e.target.value})} />
                    <Button type='submit' variant='secondary'>Login</Button>
                </form>
            </div>
        </main>
    )
}