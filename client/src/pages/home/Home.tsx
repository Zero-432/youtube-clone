import axios from 'axios'
import React, { useState, useEffect, FunctionComponent } from 'react'
import Card from '../../components/card/Card'
import { Container } from './home.styled'

const Home = ({ type }: { type: string }) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideo = async () => {
            const res = await axios.get(`/videos/${type}`)
            setVideos(res.data)
        }
        fetchVideo()
    }, [type])

    return (
        <Container>
            {videos.map((video: any) => (
                <Card type='' key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Home
