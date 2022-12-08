import axios from 'axios'
import React, { useState, useEffect } from 'react'
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
import { fetchSuccess } from '../../redux/videoSlice'

const Video = () => {
    const { currentUser } = useAppSelector((state) => state.user)
    const { currentVideo } = useAppSelector((state) => state.video)
    const dispatch = useAppDispatch()

    const path = useLocation().pathname.split('/')[2]

    const [channel, setChannel] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`videos/find/${path}`)
                const channelRes = await axios.get(`users/find/${videoRes.data.userId}`)

                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {}
        }
        fetchData()
    }, [path, dispatch])

    console.log(currentVideo)

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width='100%'
                        height='720'
                        src='https://www.youtube.com/embed/k3Vfj-e1Ma4'
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                </VideoWrapper>
                <Title>Test Video</Title>
                <Details>
                    <Info>7,948,154 views • Jun 22, 2022</Info>
                    <Buttons>
                        <Button>
                            <ThumbUpOutlinedIcon /> 123
                        </Button>
                        <Button>
                            <ThumbDownOffAltOutlinedIcon /> Dislike
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
                        <Image src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo' />
                        <ChannelDetail>
                            <ChannelName>Lama Dev</ChannelName>
                            <ChannelCounter>200K subscribers</ChannelCounter>
                            <Description>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laborum delectus unde quaerat dolore culpa sit aliquam at. Vitae facere ipsum totam ratione
                                exercitationem. Suscipit animi accusantium dolores ipsam ut.
                            </Description>
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
