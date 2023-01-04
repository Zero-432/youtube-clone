import React, { useState, useEffect } from 'react'
import { getListVideo, tagVideo } from '../../api/videoApi'
import Card from '../../components/card/Card'
import { Video } from '../../models/video'
import { Container } from './home.styled'

const Home = ({ type, tag }: { type?: string; tag?: string }) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        let res: any
        const fetchVideo = async () => {
            if (type) {
                res = await getListVideo(type)
            }
            if (tag) {
                res = await tagVideo([tag])
            }
            setVideos(res.data)
        }
        fetchVideo()
    }, [type, tag])

    return (
        <Container>
            {videos.map((video: Video) => (
                <Card type='' key={video._id} video={video} settingType={type} reload={setVideos} />
            ))}
        </Container>
    )
}

export default Home
