import { VideoTitle } from "@/components/shared/VideoTitle"
import api from "@/api/api"
import { useEffect,useState } from "react"
import type { Video } from "@/types"
import { toast } from "sonner"


export function Home(){
    const [videos,setVideos] = useState<Video[]>([])
    useEffect(() => {
        const getVideos = async() => {
            try {
                const res = await api.get('/videos')
                if(res.status === 200){
                    const fetchedVideos = res?.data?.data?.docs.map(vid => ({
                                id: vid._id,
                                title: vid.title,
                                videoFile: vid.videoFile,
                                thumbnail: vid.thumbnail,
                                description: vid.description,
                                views: vid.views,
                                owner: {
                                    id: vid.owner._id,
                                    fullName: vid.owner.fullName,
                                    username: vid.owner.username,
                                    profilePic: vid.owner.avatar,
                                    coverPic: vid.owner.coverImage,
                                    email: vid.owner.email
                                },
                                uploadDate: vid.createdAt
                            }))
                        setVideos(fetchedVideos)
                }
            } catch (error) {
                toast(error.message)
            }
        }
        getVideos()

    },[])
    return(
        <div className="flex md:flex-row flex-col justify-center flex-wrap gap-3 md:justify-items-start">
            {videos.map(video => (
                <VideoTitle video={video} />
            ))}
        </div>
    )
}