export type Video = {
    id: string
    title: string,
    videoFile: string,
    thumbnail: string,
    description: string,
    views: string,
    owner: User,
    uploadDate: Date
}

export type User = {
    id: string,
    fullName: string,
    username: string,
    profilePic: string,
    coverPic: string,
    email: string,
}

export type UserState = {
    user: User | null,
    isEmailVerified?: boolean 
    authStatus: boolean 
} 