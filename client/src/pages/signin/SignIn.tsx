import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login, loginFailure, loginSuccess } from '../../redux/userSlice'
import { Button, Container, Input, Link, Links, More, SubTitle, Title, Wrapper } from './signin.styled'

const SignIn = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useAppDispatch()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        dispatch(login())
        try {
            const res = await axios.post('/auth/signin', { email, password })
            console.log(res.data)
            dispatch(loginSuccess(res.data))
        } catch (err) {
            dispatch(loginFailure())
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to LamaTube</SubTitle>
                <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Input placeholder='username' onChange={(e) => setName(e.target.value)} />
                <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button>Sign up</Button>
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
