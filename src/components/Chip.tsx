'use client'

import { Stack } from '@mui/material'
import { memo } from 'react'
import { Text } from './shared'

interface ChipProps {
    title: string,
    tooltip?: string,
    remainingTags?: string[],
    fontSize?: number,
    fontWeight?: number,
    onclick?: () => void
}

const Chip = (props: ChipProps) => {
    const { title, tooltip, remainingTags, fontSize = 14, fontWeight = 600, onclick } = props
    const tooltipText = tooltip || (remainingTags?.length ? remainingTags.join(', ') : undefined)
    return (
        <Stack
            px={0.75}
            bgcolor={'primary.darkChannel'}
            border={'1px solid'}
            borderColor={'primary.main'}
            width={'fit-content'}
            borderRadius={1}
        >
            <Text
                fontSize={fontSize}
                fontWeight={fontWeight}
                color='primary.main'
                textTransform={'uppercase'}
                noWrap
                tooltip={remainingTags && <Stack direction={'row'} gap={1}>
                    {remainingTags?.map((item, index) => {
                        return <Chip title={item} key={index} fontSize={fontSize} fontWeight={fontWeight} />
                    })}
                </Stack>}
                onClick={() => {
                    if (onclick) {
                        onclick()
                    }
                }}
                sx={{
                    "&:hover": {
                        cursor: onclick ? 'pointer' : 'default'
                    }
                }}
            >
                {title}
            </Text>
        </Stack>
    )
}

export default memo(Chip)