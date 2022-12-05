import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { Video } from '../../models/video'
import { ChannelImage, ChannelName, Container, Details, Info, Texts, Title, Image } from './card,styled'

type Channel = {
    name: string
    img: string
}

const Card = ({ type, video }: { type: string; video: Video }) => {
    const [channel, setChannel] = useState<Channel>()

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    }, [video.userId])
    return (
        <Link to='/video/test' style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src='https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA' />
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
