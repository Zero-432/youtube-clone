import React, { Dispatch, SetStateAction } from 'react'
import LamaTube from '../../img/logo.png'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import { Link } from 'react-router-dom'
import { Button, Container, Hr, Img, Item, Login, Logo, Title, Wrapper } from './menu.styled'
import { useAppSelector } from '../../app/hooks'

const Menu = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: Dispatch<SetStateAction<boolean>> }) => {
    const { currentUser } = useAppSelector((state) => state.user)

    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Logo>
                        <Img src={LamaTube} />
                        ZeroTube
                    </Logo>
                </Link>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to='trends' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                <Link to='subscriptions' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />
                <Link to='library' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <VideoLibraryOutlinedIcon />
                        Library
                    </Item>
                </Link>
                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                {!currentUser && (
                    <>
                        <Login>
                            Sign in to like videos, comment, and subscribe.
                            <Link to='signin' style={{ textDecoration: 'none' }}>
                                <Button>
                                    <AccountCircleOutlinedIcon />
                                    SIGN IN
                                </Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>
                )}
                <Title>BEST OF LAMATUBE</Title>
                <Link to='music' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <LibraryMusicOutlinedIcon />
                        Music
                    </Item>
                </Link>
                <Link to='sports' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SportsBasketballOutlinedIcon />
                        Sports
                    </Item>
                </Link>
                <Link to='gaming' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SportsEsportsOutlinedIcon />
                        Gaming
                    </Item>
                </Link>
                <Link to='movies' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <MovieOutlinedIcon />
                        Movies
                    </Item>
                </Link>
                <Link to='news' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <ArticleOutlinedIcon />
                        News
                    </Item>
                </Link>
                <Item>
                    <LiveTvOutlinedIcon />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <FlagOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlinedIcon />
                    {darkMode ? 'Light' : 'Dark'} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu
