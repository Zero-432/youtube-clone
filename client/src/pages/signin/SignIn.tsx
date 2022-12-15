import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from '../../firebase'
import { login, loginFailure, loginSuccess } from '../../redux/userSlice'
import { Button, Container, Input, Link, Links, More, SubTitle, Title, Wrapper, Label } from './signin.styled'

import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { googleSignin, signin, signup } from '../../api/authApi'

const SignIn = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [inputs, setInputs] = useState({})
    const [img, setImg] = useState<File>()
    const [imgPerc, setImgPerc] = useState(0)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleLogin = (type: string) => async (e: React.KeyboardEvent | React.MouseEvent) => {
        e.preventDefault()
        dispatch(login())
        let res
        try {
            if (type === 'normal') {
                res = await signin({ email, password })
            } else {
                const result = await signInWithPopup(auth, provider)
                console.log(result)

                res = await googleSignin({
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                })
            }
            dispatch(loginSuccess(res?.data))
            navigate('/')
        } catch (err: any) {
            dispatch(loginFailure())
        }
    }

    const uploadFile = (file: File) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImgPerc(Math.round(progress))
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
                        return { ...prev, img: downloadURL }
                    })
                })
            }
        )
    }

    useEffect(() => {
        img && uploadFile(img)
    }, [img])

    const handleRegister = async (e: React.KeyboardEvent | React.MouseEvent) => {
        e.preventDefault()
        try {
            await signup(inputs)
            navigate('/')
        } catch (err) {}
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to ZeroTube</SubTitle>
                <Input name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input name='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin('normal')}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={handleLogin('google')}>Sign in with Google</Button>
                <Title>or</Title>
                <Input name='name' placeholder='username' onChange={handleChange} />
                <Input name='email' placeholder='email' onChange={handleChange} />
                <Input name='password' type='password' placeholder='password' onChange={handleChange} />
                <Label>Avatar:</Label>
                {imgPerc > 0 ? 'Uploading:' + imgPerc + '%' : <Input type='file' accept='image/*' onChange={(e) => setImg(e.target.files![0])} />}
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
