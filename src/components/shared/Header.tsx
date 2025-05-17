import {Logo} from './Logo'
import {Button} from '../ui/button.tsx'
import { Input } from '../ui/input.tsx'
import { Link,} from 'react-router'
import { useNavigate } from 'react-router-dom'


export default function Header({sidebarVisible, setSidebarVisible}: {sidebarVisible: boolean, setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useNavigate()
    return (
        <div className=''>
            <header className='sticky top-0 z-50 grid p-5 grid-cols-12 border-b bg-black'>
            <div className='col-span-2'>
                <img src='/menu.svg' className='w-8 inline hover:bg-gray-700 rounded-4xl' onClick={() => setSidebarVisible(!sidebarVisible)}/>
                <Link to='/'><Logo className='inline'/></Link>
            </div>
            
            <div className='col-span-6 px-2'>
                <form>
                    <Input className='w-[50%] inline' placeholder='Search'/>
                    <Button variant='secondary' type='submit' className='inline mx-2'>Search</Button>
                </form>
            </div>

            <div className='col-span-4 px-10 mx-5'>
                <Button variant='secondary' className='mx-5' onClick={() => {navigate('/login')}}>Login</Button>
                <Button variant='secondary' className='mx-5' onClick={() => {navigate('/signup')}} >Signup</Button>
                <Button variant='secondary' className='mx-5'>+ Upload</Button>
            </div>
            
            
            
            
            </header>
        </div>
        
    )}