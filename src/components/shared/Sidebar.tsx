import {Link} from 'react-router-dom'

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


export function SideBar({
    className
}){
    return (
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

            </div>
            </nav>
        </aside>
    )
}