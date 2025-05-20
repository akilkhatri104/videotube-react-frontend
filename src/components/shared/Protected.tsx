import type { UserState } from "@/types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Protected({children,authentication=true}){
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    const user: UserState = useSelector(state=> state.user)
    useEffect(() => {
        setLoader(true)
        if(authentication && user.authStatus === false){
            navigate('/login')
        }else if(!authentication && user.authStatus === true){
            navigate('/')
        }
        setLoader(false)
    },[navigate,authentication,user])
    return loader ? (<h1>Loading...</h1>) : (children)
}