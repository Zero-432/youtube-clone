import React, { useState, useEffect } from 'react'
import { format } from 'timeago.js'
import { getUser } from '../../api/userApi'
import { IComment } from '../../models/comment'
import { User } from '../../models/user'
import { Avatar, Container, Details, Name, Date, Text } from './comment.styled'

const Comment = ({ comment }: { comment: IComment }) => {
    const [channel, setChannel] = useState<User>()

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const channelRes = await getUser(comment.userId)
                setChannel(channelRes.data)
            } catch (err: any) {}
        }
        fetchComment()
    }, [comment.userId])

    return (
        <Container>
            <Avatar src={channel?.img} />
            <Details>
                <Name>
                    {channel?.name} <Date>{format(comment.createdAt)}</Date>
                </Name>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    )
}

export default Comment
