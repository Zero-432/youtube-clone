import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import { Link } from 'react-router-dom'
import { Button, Container, Input, Wrapper, Search, Avatar, User } from './navbar.styled'
import { useAppSelector } from '../../app/hooks'

import mySunshine from '../../assets/img/mySunshine.jpg'

const Navbar = () => {
    const { currentUser } = useAppSelector((state) => state.user)

    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder='Search' />
                    <SearchOutlinedIcon />
                </Search>
                {currentUser ? (
                    <User>
                        <VideoCallOutlinedIcon />
                        <Avatar src={mySunshine} />
                        {currentUser.name}
                    </User>
                ) : (
                    <Link to='signin' style={{ textDecoration: 'none' }}>
                        <Button>
                            <AccountCircleOutlinedIcon />
                            SIGN IN
                        </Button>
                    </Link>
                )}
            </Wrapper>
        </Container>
    )
}

export default Navbar
