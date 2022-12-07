import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login, loginFailure, loginSuccess } from '../../redux/userSlice'
import { Button, Container, Input, Link, Links, More, SubTitle, Title, Wrapper } from './signin.styled'

import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'

const SignIn = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useAppDispatch()

    const handleLogin = (type: string) => async (e: any) => {
        e.preventDefault()
        dispatch(login())
        let res
        try {
            if (type === 'normal') {
                res = await axios.post('/auth/signin', { email, password })
            } else {
                const result = await signInWithPopup(auth, provider)
                res = await axios.post('/auth/google', {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                })
            }
            dispatch(loginSuccess(res?.data))
        } catch (err) {
            dispatch(loginFailure())
        }
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post('/auth/signup', { name, email, password })
        } catch (err) {}
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to ZeroTube</SubTitle>
                <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin('normal')}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={handleLogin('google')}>Sign in with Google</Button>
                <Title>or</Title>
                <Input placeholder='username' onChange={(e) => setName(e.target.value)} />
                <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleRegister}>Sign up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn
