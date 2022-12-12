import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../../components/comments/Comments'
import Card from '../../components/card/Card'
import {
    Button,
    Buttons,
    Channel,
    ChannelCounter,
    ChannelDetail,
    ChannelInfo,
    ChannelName,
    Container,
    Content,
    Description,
    Details,
    Hr,
    Info,
    Image,
    Recommendation,
    Subscribe,
    Title,
    VideoWrapper,
} from './video.styled'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useLocation } from 'react-router-dom'
import { fetchSuccess, like, dislike } from '../../redux/videoSlice'
import { getVideo } from '../../api/videoApi'
import { addDislike, getUser, addLike } from '../../api/userApi'
import { format } from 'timeago.js'
import { User } from '../../models/user'

const Video = () => {
    const { currentUser } = useAppSelector((state) => state.user)
    const { currentVideo } = useAppSelector((state) => state.video)
    const dispatch = useAppDispatch()

    const path = useLocation().pathname.split('/')[2]

    const [channel, setChannel] = useState<User>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await getVideo(path)
                const channelRes = await getUser(videoRes.data.userId)

                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {}
        }
        fetchData()
    }, [path, dispatch])

    const handleClick = (type: string) => async () => {
        if (type === 'like') {
            await addLike(currentVideo?._id!, currentUser?.token!)
            dispatch(like(currentVideo?._id!))
        } else if (type === 'dislike') {
            await addDislike(currentVideo?._id!, currentUser?.token!)
            dispatch(dislike(currentVideo?._id!))
        }
    }

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width="100%"
                        height="506"
                        src="https://www.youtube.com/embed/v1ADEPnPt54"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <Info>
                        {currentVideo?.views} views • {format(currentVideo?.createdAt!)}
                    </Info>
                    <Buttons>
                        <Button onClick={handleClick('like')}>
                            {currentVideo?.likes.includes(currentUser?._id!) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                            {currentVideo?.likes.length}
                        </Button>
                        <Button onClick={handleClick('dislike')}>
                            {currentVideo?.likes.includes(currentUser?._id!) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} {currentVideo?.dislikes.length}
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel?.img} />
                        <ChannelDetail>
                            <ChannelName>{channel?.name}</ChannelName>
                            <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
                            <Description>{currentVideo?.desc}</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe>SUBSCRIBE</Subscribe>
                </Channel>
                <Hr />
                <Comments />
            </Content>
            <Recommendation>{/* <Card type='sm' /> */}</Recommendation>
        </Container>
    )
}

export default Video
