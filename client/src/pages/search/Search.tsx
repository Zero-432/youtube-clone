import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchVideo } from '../../api/videoApi'
import Card from '../../components/card/Card'
import { Video } from '../../models/video'
import { Container } from './search.styled'

const Search = () => {
    const [videos, setVideos] = useState([])
    const query = useLocation().search

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await searchVideo(query)
            setVideos(res.data)
        }
        fetchVideos()
    }, [query])

    return (
        <Container>
            {videos.map((video: Video) => (
                <Card type='' key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Search
