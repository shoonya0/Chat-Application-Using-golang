import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMessage, ReplyMsg, TextMessage, TimeLine } from './MsgTypes'

const Message = ({ menu }) => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((ele, index) => {
                    switch (ele.type) {
                        case "divider":
                            // here comes different timeline
                            return <TimeLine key={index} ele={ele} />
                        case "msg":
                            switch (ele.subtype) {
                                case "img":
                                    return <MediaMessage key={index} ele={ele} menu={menu} />
                                case "doc":
                                    return <DocMsg key={index} ele={ele} menu={menu} />
                                case "link":
                                    return <LinkMsg key={index} ele={ele} menu={menu} />
                                case "reply":
                                    return <ReplyMsg key={index} ele={ele} menu={menu} />
                                default:
                                    return <TextMessage key={index} ele={ele} menu={menu} />
                            }
                        default:
                            return <></>
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message