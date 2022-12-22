import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from '../../firebase'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Container, Desc, Input, Label, Title, Wrapper } from './upload.styled'
import { addVideo } from '../../api/videoApi'
import { Video } from '../../models/video'

const Upload = ({ setOpen, dataVideo }: { setOpen: Dispatch<SetStateAction<boolean>>; dataVideo?: Video }) => {
    const [img, setImg] = useState<File>()
    const [video, setVideo] = useState<File>()
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleTags = (e: any) => {
        setTags(e.target.value.split(','))
    }
    const uploadFile = (file: File, urlType: string, type: string) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, `${type}/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                })
            }
        )
    }

    useEffect(() => {
        video && uploadFile(video, 'videoUrl', 'videos')
    }, [video])

    useEffect(() => {
        img && uploadFile(img, 'imgUrl', 'images')
    }, [img])

    const handleUpload = async (e: any) => {
        e.preventDefault()
        const res = await addVideo({ ...inputs, tags })
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    return (
        <Container>
            <Wrapper>
                <CloseIcon style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setOpen(false)} />
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPerc > 0 ? 'Uploading:' + videoPerc : <Input type='file' accept='video/*' onChange={(e) => setVideo(e.target.files![0])} />}
                {dataVideo && <video src={dataVideo.videoUrl} width='30%' controls />}
                <Input type='text' placeholder='Title' name='title' value={dataVideo?.title} onChange={handleChange} />
                <Desc placeholder='Description' name='desc' rows={8} value={dataVideo?.desc} onChange={handleChange} />
                <Input type='text' placeholder='Separate the tags with commas.' value={dataVideo?.tags} onChange={handleTags} />
                <Label>Image:</Label>
                {imgPerc > 0 ? 'Uploading:' + imgPerc + '%' : <Input type='file' accept='image/*' onChange={(e) => setImg(e.target.files![0])} />}
                {dataVideo && <img alt='loading...' src={dataVideo.imgUrl} width='15%' />}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload
