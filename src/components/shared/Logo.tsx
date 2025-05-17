export function Logo({
    className
}: any) {
    return (
        <div className={`flex ${className}`}>
            <img src='/youtube.svg' alt="Logo" className="h-8 inline p-1"/>
            <h1 className="text-2xl font-bold  inline">VideoTube</h1>
        </div>
    )
}