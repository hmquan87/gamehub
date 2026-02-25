'use client'

import { IconButton, Image, Text } from '@/components/shared'
import FireIcon from '@/icons/FireIcon'
import { Box, Stack } from '@mui/material'
import React, { memo, useState } from 'react'
import scifi from 'public/images/icon_scifi_printe.png'

const Activities = () => {

    const [selected, setSelected] = useState<boolean>(true)

    return (
        <Stack
            sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                pt: 2
            }}
            bgcolor="background.paper"
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2}
            >
                <Text
                    variant={'body2'}
                    textTransform={'uppercase'}
                >
                    Activities
                </Text>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    borderRadius={2}
                    py={0.4}
                    px={0.2}
                    gap={0.2}
                    border={'1px solid'}
                    borderColor={'divider'}
                >
                    <IconButton
                        sx={{
                            bgcolor: selected ? 'primary.darkChannel' : 'none',
                            p: 0.75,
                            '&:hover': {
                                bgcolor: 'primary.darkChannel',
                                transition: 'all 0.2s ease-in-out'
                            },
                        }}
                        onClick={() => setSelected(true)}
                    >
                        <Text
                            variant={'body2'}
                            color={selected ? 'primary.main' : 'grey.400'}
                        >
                            All
                        </Text>
                    </IconButton>

                    <IconButton
                        sx={{
                            bgcolor: !selected ? 'primary.darkChannel' : 'none',
                            p: 1.05,
                            '&:hover': {
                                bgcolor: 'primary.darkChannel',
                                transition: 'all 0.2s ease-in-out'
                            },
                            color: !selected ? 'primary.main' : 'grey.400',
                        }}
                        onClick={() => setSelected(false)}
                    >
                        <FireIcon
                            sx={{
                                width: 12,
                                height: 12
                            }}
                        />
                    </IconButton>
                </Stack>
            </Stack>
            <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" mt={2} />
            <Stack
                maxHeight={400}
                overflow={'auto'}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },

                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },

                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(255, 255, 255, 0.09)",
                        borderRadius: "8px",
                    },

                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => {
                    return <Stack
                        key={index}
                        direction={'row'}
                        p={2}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        bgcolor={index % 2 === 0 ? '#00000034' : 'none'}
                    >
                        <Stack
                            direction={'row'}
                            gap={1}
                            alignItems={'center'}
                        >
                            <Stack
                                height={48}
                                width={48}
                                position={'relative'}
                            >
                                <Image
                                    src={scifi}
                                    alt={scifi}
                                    fill
                                    aspectRatio={1 / 1}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </Stack>
                            <Stack
                                justifyContent={'center'}
                            >
                                <Text variant={'subtitle2'}>
                                    Read Guide:
                                </Text>
                                <Text variant={'caption'} color='grey.400'>
                                    about 23 hours ago
                                </Text>
                            </Stack>
                        </Stack>
                        <Stack
                            direction={'row'}
                            gap={0.5}
                            alignItems={'center'}
                        >
                            <FireIcon
                                sx={{
                                    width: 14,
                                    height: 14,
                                    color: 'primary.main'
                                }}
                            />
                            <Text
                                variant={'subtitle2'}
                                color='primary.main'
                            >
                                21 XP
                            </Text>
                        </Stack>
                    </Stack>
                })}
            </Stack>

        </Stack >
    )
}

export default memo(Activities)