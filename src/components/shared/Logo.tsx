export function Logo({
    className
}: any) {
    return (
        <div className={`flex flex-row ${className}`}>
            <img src='/youtube.svg' alt="Logo" className="h-8"/>
            <h1 className="text-2xl font-bold">VideoTube</h1>
        </div>
    )
}