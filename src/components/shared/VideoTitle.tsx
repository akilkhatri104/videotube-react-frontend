import type {Video} from '@/types.ts'
import {type HTMLAttributes } from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router'

interface VideoTitleProps extends HTMLAttributes<Video> {
    video : Video
}

export function VideoTitle({
    video,
}: VideoTitleProps) {
    // const [user,setUser] = useState<User>({})
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res = await api.get(`/users/u/${video.owner}`)
    //             if(res.status === 200){
    //                 setUser({
    //                     id: res.data.data._id,
    //                     fullName: res.data.data.fullName,
    //                     username: res.data.data.username,
    //                     profilePic: res.data.data.avatar,
    //                     coverPic: res.data.data.CoverImage,
    //                     email: res.data.data.email,
    //                 })
    //             }
    //         } catch (error) {
    //             toast(error.message)
    //         }
    //     })()
    // },[video.owner])
    return (
        <div key={video.id} className='md:w-[250px] w-full'>
                <Link to={`/watch/?v=${video.id}`}>
            <img className='w-full rounded-3xl' src={video.thumbnail}/>
            <div className='flex flex-row gap-2'>
                <Avatar className='relative flex  size-8 shrink-0 overflow-hidden rounded-full'>
                    <AvatarImage src={video.owner?.profilePic} className='aspect-square size-full' />
                    <AvatarFallback className='aspect-square size-full'>{video.owner?.username}</AvatarFallback>
                </Avatar>
                <h1>{video.title}</h1>
            </div>
            <div className='flex flex-row gap-2'>
                <h1>{video.owner.fullName}</h1>
                <div>
                    <h1>{video.views} Views</h1>
                </div>
            </div>
        </Link>
        </div>
    )
}