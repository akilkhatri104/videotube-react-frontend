import { Outlet,Link } from 'react-router'
import Header from './components/shared/Header'
import {SideBar} from './components/shared/Sidebar'
import { useState,useEffect } from 'react'
import { Toaster } from "@/components/ui/sonner"
import api from './api/api'
import { useDispatch,useSelector } from 'react-redux'
import {login} from '@/store/userSlice'
import type { UserState } from './types'
import { toast } from 'sonner'
function App() {
  const [isLoading,setIsLoading] = useState(true)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [emailVerificationVisible,setEmailVerificationVisible] = useState(true)
  const dispatch = useDispatch()
  const user: UserState = useSelector(state => state.user)
  useEffect(() => {
    (
      async() => {
        try {
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
        } catch (error) {
          toast(error.message)
        } finally {
          setIsLoading(false)
        }
      }
    )()
    
  }, [dispatch])


  return isLoading ? <h1 className='bg-black min-h-screen text-white text-center p-5 text-3xl'>Loading...</h1>  : (
    <div className='bg-black text-white min-h-screen'>
      <Header sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />

      <div className='flex'>
        <SideBar className={`md:block w-1/6 ${sidebarVisible ? 'hidden' : 'md:hidden block'}`}/>
        <main className='flex-1 p-6'>
            {user.isEmailVerified === false && 
              <div className= {`bg-blue-800 flex-row justify-between px-3 py-1 ${emailVerificationVisible ? 'flex  ' : 'hidden'}`}>
                <h1>Please verify your email <Link onClick={() => setEmailVerificationVisible(false)} to='/verify' className='text-red-200'>here</Link>.</h1>
                <h1 onClick={() => setEmailVerificationVisible(false)} className='cursor-pointer'>X</h1>
              </div> }
            {isLoading ? <h1>Loading....</h1> : <Outlet />}
        </main>
            <Toaster />
      </div>
    </div>
  )
}

export default App
