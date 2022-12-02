import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'

const Container = styled.div<{ type: string }>`
    width: ${(props) => props.type !== 'sm' && '360px'};
    margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
    cursor: pointer;
    display: ${(props) => props.type === 'sm' && 'flex'};
    gap: 10px;
`

const Image = styled.img<{ type: string }>`
    width: 100%;
    height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
    background-color: #999;
    flex: 1;
`

const Details = styled.div<{ type: string }>`
    display: flex;
    margin-top: ${(props) => props.type !== 'sm' && '16px'};
    gap: 12px;
    flex: 1;
`

const ChannelImage = styled.img<{ type: string }>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === 'sm' && 'none'};
`

const Texts = styled.div``

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
`

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`

type Video = {
    userId: string
    title: string
    desc: string
    imgUrl: string
    videoUrl: string
    _id: string
    views: number
    createdAt: string
}

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
