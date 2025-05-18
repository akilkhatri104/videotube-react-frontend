import { Outlet } from 'react-router'
import Header from './components/shared/Header'
import {SideBar} from './components/shared/Sidebar'
import { useState,useEffect } from 'react'
import { Toaster } from "@/components/ui/sonner"
import api from './api/api'
import { useDispatch } from 'react-redux'
import {login} from '@/store/userSlice'

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    (
      async() => {
        const res = await api.get('users/current-user')
        if(res.status === 200 && res.data?.data){
          dispatch(login({
            user: {
              id: res.data.data._id,
              fullName: res.data.data.fullName,
              username: res.data.data.username,
              profilePic: res.data.data.avatar,
              coverPic: res.data.data.CoverImage,
              email: res.data.data.email,
            },
            isEmailVerified: res.data.data.isEmailVerified,
            authStatus: true,
          }))
        }
      }
    )()
  }, [dispatch])


  return (
    <div className='bg-black text-white min-h-screen'>
      <Header sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />

      <div className='flex'>
        <SideBar className={`md:block w-1/6 ${sidebarVisible ? 'hidden' : 'md:hidden block'}`}/>
        <main className='flex-1 p-6'>
            <Outlet />
        </main>
            <Toaster />
      </div>
    </div>
  )
}

export default App
