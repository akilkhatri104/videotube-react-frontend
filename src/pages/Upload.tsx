import { useSelector } from "react-redux";
import type { UserState } from "@/types";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Protected from "@/components/shared/Protected";


export default function Upload(){
    const [video,setVideo] = useState({
        videoFile: '',
        title: '',
        thumbnail: '',
        description: '',
        isPublished: true,
    })
    const navigate = useNavigate()
    

    return (
        <Protected>
            <div className="flex flex-col min-h-screen">
            <div className="text-3xl font-bold p-4 flex justify-center">
                <h1>Upload a video</h1>
            </div>

            <div className="md:w-[50%] mx-auto">
                <form className="flex flex-col gap-5">
                    <Input type='text' placeholder="title" value={video.title} />
                    <Textarea  placeholder="description"/>
                    <Label></Label>
                    
                    <Label htmlFor="videoFile">Video</Label>
                    <Input id='videoFile' type='file' />
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input id='thumbnail' type='file' />
                    <Button type='submit' variant={'secondary'} >Upload Video</Button>
                </form>
            </div>
        </div>
        </Protected>
    )
}