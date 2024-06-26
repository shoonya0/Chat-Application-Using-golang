import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { LinkMsg, MediaMessage, ReplyMsg, TextMessage, TimeLine } from './MsgTypes'

const Message = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((ele) => {
                    switch (ele.type) {
                        case "divider":
                            // here comes different timeline
                            return <TimeLine ele={ele} />
                        case "msg":
                            switch (ele.subtype) {
                                case "img":
                                    return <MediaMessage ele={ele} />
                                // break;
                                case "doc":
                                    // document msg
                                    break;
                                case "link":
                                    return <LinkMsg ele={ele} />
                                case "reply":
                                    return <ReplyMsg ele={ele} />

                                default:
                                    // any text message
                                    return <TextMessage ele={ele} />
                            }
                            break;

                        default:
                            return <></>
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message