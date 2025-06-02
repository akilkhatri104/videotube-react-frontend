import { useSelector } from "react-redux";
import type { UserState,Video } from "@/types";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Protected from "@/components/shared/Protected";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/api/api";



export default function Upload(){

    const [isUploading,setIsUploading] = useState(false)
    const [video,setVideo] = useState<{
        videoFile: File | null,
        title: string,
        thumbnail: File | null,
        description: string,
        isPublished: boolean,
    }>({
        videoFile: null,
        title: '',
        thumbnail: null,
        description: '',
        isPublished: true,
    })
    const navigate = useNavigate()
    
    const uploadVideoHandler = async (e) => {
        try {
            e.preventDefault()
            setIsUploading(true)
            if(!video.videoFile)
                throw new Error('Video file required')
            if(!video.title || !video.description)
                throw new Error('Title and Description are required')
            const formData = new FormData()
            formData.append('videoFile', video.videoFile)
            formData.append('title', video.title)
            formData.append('description', video.description)
            formData.append('isPublished', String(video.isPublished))
            if (video.thumbnail) {
                formData.append('thumbnail', video.thumbnail)
            }
            
            const res = await api.post('/videos',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(res.status === 201){
                toast('Video uploaded succesfully')
                navigate('/')
            }
        } catch (error) {
            toast(error.message)
        } finally {
            setIsUploading(false)
        }
    }
       

    return (
        <Protected>
            <div className="flex flex-col min-h-screen">
            <div className="text-3xl font-bold p-4 flex justify-center">
                <h1>Upload a video</h1>
            </div>

            <div className="md:w-[50%] mx-auto">
                <form className="flex flex-col gap-5" onSubmit={uploadVideoHandler}>
                    <Input type='text' required placeholder="title" value={video.title} onChange={(e) => setVideo({
                        ...video,
                        title: e.target.value
                    })} />
                    <Textarea required  placeholder="description" value={video.description} onChange={e => setVideo({
                        ...video,
                        description: e.target.value
                    })} />
                    
                    <Select onValueChange={(e) => setVideo({
                        ...video,
                        isPublished: e === 'public' ? true : false
                    })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Video Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='public'>Public</SelectItem>
                            <SelectItem value='private'>Private</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="videoFile">Video</Label>
                    <Input required id='videoFile' type='file' multiple={false}  accept="video/*" onChange={e => setVideo({
                        ...video,
                        videoFile: e.target?.files?.[0]
                    })} />
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input id='thumbnail' accept="image/*" type='file' multiple={false} onChange={(e) => setVideo({
                        ...video,
                        thumbnail: e.target?.files?.[0]
                    })} />
                    <Button type='submit' disabled={isUploading} variant={'secondary'} >Upload Video</Button>
                    {isUploading && (<h1>Uploading Video....</h1>)}
                </form>
            </div>
        </div>
        </Protected>
    )
}