import React, { useState, useEffect } from 'react'
import { addComment, getComment } from '../../api/commentApi'
import { useAppSelector } from '../../app/hooks'
import { IComment } from '../../models/comment'
import Comment from '../comment/Comment'
import { Avatar, Container, Input, NewComment } from './comments.styled'

const Comments = ({ videoId }: { videoId: string }) => {
    const { currentUser } = useAppSelector((state) => state.user)

    const [newComment, setNewComment] = useState<IComment>()

    const [comments, setComments] = useState<[IComment]>()

    const handleChange = (e: any) => {
        setNewComment({
            desc: e.target.value
        })
    }

    const handleKeyUp = async () => {
        
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getComment(videoId)
                setComments(res.data)
            } catch (err: any) {}
        }
        fetchComments()
    }, [videoId])

    console.log(comments)

    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser?.img} />
                <Input placeholder='Add a comment...' onChange={handleChange} onKeyUp={handleKeyUp} />
            </NewComment>
            {comments?.map((comment: IComment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </Container>
    )
}

export default Comments
