import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { getUser } from '../../api/userApi'
import { User } from '../../models/user'
import { Video } from '../../models/video'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ChannelImage, ChannelName, Container, Details, Info, Texts, Title, Image, TextWrapper, SettingIcon, LinkVideo } from './card.styled'
import Icon from '@mui/material/Icon'

const Card = ({ type, video, settingType }: { type: string; video: Video; settingType: string }) => {
    const [channel, setChannel] = useState<User>()

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await getUser(video.userId)
            setChannel(res.data)
        }
        fetchChannel()
    }, [video.userId])

    const handleClick = (e: any) => {
        if (e.target.classList[2] === 'setting') {
            e.preventDefault()
        }
    }

    return (
        <LinkVideo to={`/video/${video._id}`} style={{ textDecoration: 'none' }} onClick={handleClick}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel?.img} />
                    <TextWrapper>
                        <Texts>
                            <Title>{video.title}</Title>
                            <ChannelName>{channel?.name}</ChannelName>
                            <Info>
                                {video.views} views • {format(video.createdAt)}
                            </Info>
                        </Texts>
                        <SettingIcon className="setting" />
                    </TextWrapper>
                </Details>
            </Container>
        </LinkVideo>
    )
}

export default Card
