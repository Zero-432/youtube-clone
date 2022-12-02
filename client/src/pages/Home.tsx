import axios from 'axios'
import React, { useState, useEffect, FunctionComponent } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

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
