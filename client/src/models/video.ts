export interface Video {
    _id?: string
    title: string
    desc: string
    imgUrl: string
    videoUrl: string
    userId: string
    views: number
    tags: [string]
    likes: [string]
    dislikes: [string]

    createdAt: string
    updatedAt: string
}
