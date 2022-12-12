import React from 'react'
import { Avatar, Container, Details, Name, Date, Text } from './comment.styled'

const Comment = () => {
    return (
        <Container>
            <Avatar src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo' />
            <Details>
                <Name>
                    Zero <Date>1 day ago</Date>
                </Name>
                <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, ex laboriosam ipsam aliquam voluptatem perferendis provident modi, sequi tempore reiciendis quod, optio ullam cumque?
                    Quidem numquam sint mollitia totam reiciendis?
                </Text>
            </Details>
        </Container>
    )
}

export default Comment
