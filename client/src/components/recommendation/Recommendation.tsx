import React, { useEffect, useState } from 'react'
import { tagVideo } from '../../api/videoApi'
import { Video } from '../../models/video'
import Card from '../card/Card'
import { Container } from './recommendation.styled'

const Recommendation = ({ tags, currentVideoId }: { tags: [string]; currentVideoId?: string }) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await tagVideo(tags)
            const filterData = res.data.filter((video: Video) => video._id !== currentVideoId)
            setVideos(filterData)
        }
        fetchVideos()
    }, [tags, currentVideoId])

    return (
        <Container>
            {videos.map((video: Video) => (
                <Card type='sm' key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Recommendation
