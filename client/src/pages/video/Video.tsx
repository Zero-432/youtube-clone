import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../../components/comments/Comments'
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
    VideoFrame,
    ShowMoreButton,
} from './video.styled'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useLocation } from 'react-router-dom'
import { fetchSuccess, like, dislike } from '../../redux/videoSlice'
import { subscription } from '../../redux/userSlice'
import { addView, getVideo } from '../../api/videoApi'
import { addDislike, getUser, addLike, subscribe, unsubscribe } from '../../api/userApi'
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
            } catch (err: any) {}
        }
        fetchData()
    }, [path, dispatch])

    const handleClick = (type: string) => async () => {
        if (!channel?._id) return
        if (type === 'like') {
            await addLike(currentVideo?._id)
            dispatch(like(currentUser?._id))
        } else if (type === 'dislike') {
            await addDislike(currentVideo?._id)
            dispatch(dislike(currentUser?._id))
        } else if (type === 'subscribe') {
            if (currentUser?.subscribedUsers.includes(channel?._id)) {
                unsubscribe(channel?._id)
            } else {
                await subscribe(channel?._id)
            }
            const videoRes = await getVideo(path)
            const refreshChannel = await getUser(videoRes.data.userId)
            setChannel(refreshChannel.data)
            dispatch(subscription(channel?._id))
        }
    }

    const handleEndedVideo = async () => {
        await addView(currentVideo?._id)
    }

    return (
        <Container>
            {currentVideo && (
                <>
                    <Content>
                        <VideoWrapper>
                            <VideoFrame src={currentVideo.videoUrl} controls onEnded={handleEndedVideo} />
                        </VideoWrapper>
                        <Title>{currentVideo.title}</Title>
                        <Details>
                            <Info>
                                {currentVideo.views} views • {format(currentVideo.createdAt)}
                            </Info>
                            <Buttons>
                                <Button onClick={handleClick('like')}>
                                    {currentUser?._id && currentVideo.likes.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                    {currentVideo.likes.length}
                                </Button>
                                <Button onClick={handleClick('dislike')}>
                                    {currentUser?._id && currentVideo?.dislikes.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}
                                    {currentVideo.dislikes.length}
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
                                    <SmartText text={currentVideo.desc} length={100} />
                                </ChannelDetail>
                            </ChannelInfo>
                            <Subscribe onClick={handleClick('subscribe')}>{currentUser && currentUser.subscribedUsers.includes(channel?._id!) ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Subscribe>
                        </Channel>
                        <Hr />
                        <Comments videoId={currentVideo?._id!} />
                    </Content>
                    <Recommendation>{/* <Card type='sm' /> */}</Recommendation>
                </>
            )}
        </Container>
    )
}

const SmartText = ({ text, length }: { text: string; length: number }) => {
    const [showLess, setShowLess] = useState<Boolean>(true)

    if (text.length < length) {
        return <Description>{text}</Description>
    }
    return (
        <Description>
            {showLess ? `${text.slice(0, length)}... ` : text}
            <ShowMoreButton onClick={() => setShowLess(!showLess)}>Read {showLess ? 'More' : 'Less'}</ShowMoreButton>
        </Description>
    )
}

export default Video
