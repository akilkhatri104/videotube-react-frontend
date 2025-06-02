import {Link} from 'react-router-dom'
import type { User, UserState } from '@/types'
import { useSelector } from 'react-redux'
import api from '@/api/api'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function SideBarLink({img, text, link, className}: any){
    return (
        <Link to={link}>
            <div className={`w-full cursor-default hover:bg-gray-800 rounded-sm ${className}`}>
                <img src={img} className='w-6 h-6 inline mx-4' alt="img" />
                <h1 className='inline mx-5 text-xl'>{text}</h1>
            </div>
        </Link>
    )
}

function SubscriptionLink({subscription} ){
    return (
        <Link to={`/@${subscription.id}`}>
            <div className='container flex flex-row gap-x-5 p-2 hover:bg-gray-800 rounded-2xl'>
            <Avatar>
                <AvatarImage src={subscription.profilePic} />
                <AvatarFallback>{subscription.username}</AvatarFallback>
            </Avatar>
            <h1 className='ml-5'>
                {subscription.fullName}
            </h1>
            </div>
        </Link>
    )
}

export function SideBar({
    className
}){
    const user: UserState = useSelector((state: {user:UserState}) => state.user)
    const [isLoading,setIsLoading] = useState(false)
    const [subscriptions,setSubscriptions]  = useState<User[]>([])
    useEffect(() => {
        const getSubscriptions = async () => {
        try {
            setIsLoading(true)
            const res = await api(`${import.meta.env.VITE_API_URI}/subscriptions/u/${user?.user?.id}`)
            if(res.status === 200){
                console.log("Res: ",res)
                const subscriptions : User[] = []
                res.data.data.forEach((user: any) => {
                    subscriptions.push({
                        id: user.channel._id,
                        username: user.channel.username,
                        fullName: user.channel.fullName,
                        profilePic: user.channel.avatar,
                        coverPic: user.channel?.coverImage ?user.channel?.coverImage : '',
                        email: user.channel.email
                    })
                })
                setSubscriptions(subscriptions)
            }
        } catch (error) {
            toast(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    if(user?.user?.id && user.authStatus === true)
        getSubscriptions()
    },[user.authStatus,user?.user?.id])
    return !isLoading ? (
        <aside className={`w-64 min-h-[calc(100vh-80px)] border-r-2 shrink-0 ${className}`}>
            <nav className='h-full w-full'>
                <div className='flex flex-col p-4 border-b '>
                <SideBarLink img="/home.svg" text="Home" link="/" />
                <SideBarLink img="/subscriptions.svg" text="Subscriptions   " link="/" />
                <SideBarLink img="/video.svg" text="Your Videos" link="/" />
                <SideBarLink img="/history.svg" text="History" link="/" />
                <SideBarLink img="/playlist.svg" text="Playlist" link="/" />
                <SideBarLink img="/thumbs-up.svg" text="Liked Videos" link="/" />
                <SideBarLink img="/watch-later-clock.svg" text="Watch Later" link="/" />
            </div>
            
            <div>
                <h1 className='font-bold m-3'>Subcriptions</h1>
                {user.authStatus === false ? (
                    <h1 className='text-center'>To view your subscriptions, please <Link to='/login' className='text-blue-700'>login</Link></h1>
                ) : (
                    <ul>
                    {subscriptions.map(sub => (
                        <li key={sub.id}>
                            <SubscriptionLink subscription={sub}/>
                        </li>
                    ))}
                </ul>
                )}
            </div>
            </nav>
        </aside>
    ) : (<h1 className='text-center text-2xl'>Loading...</h1>)
}