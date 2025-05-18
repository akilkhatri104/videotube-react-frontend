import {Logo} from './Logo'
import {Button} from '../ui/button.tsx'
import { Input } from '../ui/input.tsx'
import { Link,} from 'react-router'
import { useNavigate } from 'react-router-dom'
import type { UserState} from '@/store/userSlice.ts'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '@/store/userSlice.ts'
import { toast } from 'sonner'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header({sidebarVisible, setSidebarVisible}: {sidebarVisible: boolean, setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userState = useSelector((state: {user: UserState}) => state.user)
    const logoutHandler = async() => {
        try {
            const res = await axios(`${import.meta.env.VITE_API_URI}/users/logout`,{
                method: 'POST',
                withCredentials: true
            })
            if(res.status === 200){
                toast('Logged out successfully')
                dispatch(logout())
                navigate('/')
            }
        } catch (error) {
            toast(error.message)
        }
    }

    return (
        <div className=''>
            <header className='sticky top-0 z-50 flex flex-row items-center justify-between p-4 border-b bg-black'>
            <div className='flex flex-row'>
                <img src='/menu.svg' className='w-8 inline hover:bg-gray-700 rounded-4xl' onClick={() => setSidebarVisible(!sidebarVisible)}/>
                <Link className='px-2' to='/'><Logo className=''/></Link>
            </div>
            
            <div className=''>
                <form className='flex flex-row'>
                    <Input className='' placeholder='Search'/>
                    <Button variant='secondary' type='submit' className=''>Search</Button>
                </form>
            </div>

            <div className=' pr-0 mr-0'>
                {userState.authStatus === false && (
                    <div><Button variant='secondary' className='mx-5' onClick={() => { navigate('/login') } }>Login</Button><Button variant='secondary' className='mx-5' onClick={() => { navigate('/signup') } }>Signup</Button></div>
                )}
                {userState.authStatus === true && (
                    <div className='flex flex-row gap-5 mr-0 pr-0 gap-r-0'>
                    <Button variant='secondary' className='mx-2'>+ Upload</Button>
                    <Button variant='secondary' className='mx-2' onClick={logoutHandler}>Logout</Button>
                   
                   <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='text-black'>
                                <AvatarImage src={userState?.user?.profilePic} />
                                <AvatarFallback>{userState?.user?.username}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <DropdownMenuLabel className='bold'>My Account</DropdownMenuLabel>
                                <DropdownMenuItem className=''>
                                    <h1>
                                        <strong>{userState.user?.fullName}</strong> <br />
                                        @{userState.user?.username}
                                    </h1>
                                </DropdownMenuItem>
                                <DropdownMenuItem >My Channel</DropdownMenuItem>
                                <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>         
                        
                    </div >
                )}
            </div>
            
                
            
            
            </header>
        </div>
        
    )}