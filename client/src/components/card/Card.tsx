import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { getUser } from '../../api/userApi'
import { User } from '../../models/user'
import { Video } from '../../models/video'
import { Popover, MenuItem } from '@mui/material'
import { ChannelImage, ChannelName, Container, Details, Info, Texts, Title, Image, TextWrapper, SettingIcon, LinkVideo, SettingWrapper, MenuSetting } from './card.styled'
import { deleteVideo, getListVideo } from '../../api/videoApi'
import Upload from '../upload/Upload'

const Card = ({ type, video, settingType, reload }: { type: string; video: Video; settingType?: string; reload?: any }) => {
    const [channel, setChannel] = useState<User>()
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const [openEdit, setOpenEdit] = useState<boolean>(false)

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await getUser(video.userId)
            setChannel(res.data)
        }
        fetchChannel()
    }, [video.userId])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if ((e.target as Element).classList[2] === 'setting') {
            e.preventDefault()
        }
    }

    const handleEditVideo = (type: string) => async (e: any) => {
        if (settingType !== 'library') return
        if (type === 'edit') {
            setOpenEdit(true)
        }
        if (type === 'delete') {
            await deleteVideo(video._id)
            const res = await getListVideo(settingType)
            reload(res.data)
        }
    }

    return (
        <>
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
                            <SettingWrapper className='setting' onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)} opacity={`${Boolean(anchorEl)}`}>
                                <SettingIcon />
                            </SettingWrapper>
                        </TextWrapper>
                    </Details>
                </Container>
            </LinkVideo>
            {settingType === 'library' && !openEdit && (
                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <MenuSetting>
                        <MenuItem sx={{ fontSize: 14 }} onClick={handleEditVideo('edit')}>
                            Edit Video
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} onClick={handleEditVideo('delete')}>
                            Delete Video
                        </MenuItem>
                    </MenuSetting>
                </Popover>
            )}
            {openEdit && <Upload setOpen={setOpenEdit} dataVideo={video} />}
        </>
    )
}

export default Card
