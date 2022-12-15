import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { getUser } from '../../api/userApi'
import { User } from '../../models/user'
import { Video } from '../../models/video'
import { ChannelImage, ChannelName, Container, Details, Info, Texts, Title, Image } from './card.styled'

const Card = ({ type, video }: { type: string; video: Video }) => {
    const [channel, setChannel] = useState<User>()

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await getUser(video.userId)
            setChannel(res.data)
        }
        fetchChannel()
    }, [video.userId])
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel?.img} />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel?.name}</ChannelName>
                        <Info>
                            {video.views} views • {format(video.createdAt)}
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card
