'use client'

import { Text } from "@/components/shared"
import AddressCardIcon from "@/icons/AddressCardIcon"
import { Stack } from "@mui/material"
import { memo } from "react"


const About = () => {
    return (
        <Stack
            width={'100%'}
            bgcolor="background.paper"
            border="1px solid"
            borderColor="divider"
            borderRadius={2}
            p={2}
            gap={1}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
            >
                <AddressCardIcon
                    sx={{
                        width: 24,
                        height: 24,
                        color: 'grey.300'
                    }}
                />
                <Text variant={'h4'}>
                    About Default Admin
                </Text>
            </Stack>
            <Text variant={'body2'} color="grey.400" lineHeight={1.5}>
                Theory crafter, bug hunter, and someone who’s always wanted to go pro. Larc has been around in Web3 for 4+ years, starting as a gamer until he began writing about all the games he played. From an Axie coach and now a content writer for the number one gaming platform, Larc is best at creating top guides and content. If there aren't many Web3 games to play, he's always up for a Valorant ranked match only. Btw, you can always reach Larc at larcweb3@gmail.com.`
            </Text>
        </Stack>
    )
}

export default memo(About)