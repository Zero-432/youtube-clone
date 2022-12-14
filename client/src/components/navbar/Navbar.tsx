import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import Person from '@mui/icons-material/Person'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'

import { Button, Container, Input, Wrapper, Search, AvatarIcon, User } from './navbar.styled'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { logout } from '../../redux/userSlice'
import Upload from '../upload/Upload'

const Navbar = () => {
    const { currentUser } = useAppSelector((state) => state.user)
    const [open, setOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const show = Boolean(anchorEl)

    const dispatch = useAppDispatch()

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' />
                        <SearchOutlinedIcon />
                    </Search>
                    {currentUser ? (
                        <User>
                            <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
                            <Tooltip title='Account settings'>
                                <IconButton
                                    onClick={handleClick}
                                    size='small'
                                    sx={{ ml: 2 }}
                                    aria-controls={show ? 'account-menu' : undefined}
                                    aria-haspopup='true'
                                    aria-expanded={show ? 'true' : undefined}
                                >
                                    <AvatarIcon src={currentUser.img} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id='account-menu'
                                open={show}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem>
                                    <Avatar alt={currentUser.name} src={currentUser.img} /> {currentUser.name}
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <Link to='/signin' style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize='small' />
                                        </ListItemIcon>
                                        Add another account
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize='small' />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize='small' />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
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
            {open && <Upload setOpen={setOpen} />}
        </>
    )
}

export default Navbar
