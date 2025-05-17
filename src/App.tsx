import { Outlet } from 'react-router'
import Header from './components/shared/Header'
import {SideBar} from './components/shared/Sidebar'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"



function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
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
