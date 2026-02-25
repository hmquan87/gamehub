'use client'

import Search from '@/components/Search'
import { AddedDateSort } from '@/constant/enum'
import LensIcon from '@/icons/LensIcon'
import RadioButtonCheckedIcon from '@/icons/RadioButtonCheckedIcon'
import { Checkbox, Stack } from '@mui/material'
import React, { memo, useState } from 'react'
import { getDate } from './helper'
import { Text } from '@/components/shared'
import CalendarMonthIcon from '@/icons/CalendarMonthIcon'

const Filter = () => {

    const [search, setSearch] = useState<string>('')

    const onChangeFieldSearch = (_, value) => {
        setSearch(value);
    };


    return (
        <Stack
            width={'100%'}
            spacing={3}
        >
            <Stack
                width="100%"
                justifyContent={{ lg: "flex-end" }}
                display={{ xs: "none", md: "flex" }}
                spacing={3}
            >
                <Search
                    onSearch={onChangeFieldSearch}
                    value={search}
                    sx={{
                        borderRadius: 1,
                        minHeight: 30,
                        maxHeight: 36,
                        px: 1.5,
                        maxWidth: '100%'
                    }}
                />
                <DateAdded />
            </Stack>
        </Stack>
    )
}

export default memo(Filter)




const DateAdded = () => {

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const [checkDate, setCheckDate] = useState<AddedDateSort>(AddedDateSort.AllTime);

    return (
        <Stack direction={"column"} gap={2}>
            <Stack>
                <Text variant="body2" fontWeight={500}>
                    Date Added
                </Text>
            </Stack>
            <Stack direction={"column"} gap={1}>
                {Object.keys(AddedDateSort).map((item, index) => {
                    return (
                        <Stack
                            key={index}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            onClick={() => setCheckDate(AddedDateSort[item])}
                            sx={{
                                backgroundColor:
                                    AddedDateSort[item] === checkDate
                                        ? '#413f3f8f'
                                        : undefined,
                                "&:hover": {
                                    backgroundColor:
                                        AddedDateSort[item] === checkDate
                                            ? '#413f3f8f'
                                            : '#413f3f8f',
                                    cursor: "pointer",
                                },
                                borderRadius: "5px",
                                pl: 1,
                            }}
                        >
                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                <CalendarMonthIcon
                                    sx={{
                                        width: 18,
                                        height: 18,
                                    }}
                                />
                                <Text
                                    variant="subtitle2" lineHeight={1.56}
                                >
                                    {getDate(AddedDateSort[item])}
                                </Text>
                            </Stack>
                            <Checkbox
                                checked={checkDate === AddedDateSort[item]}
                                {...label}
                                icon={
                                    <LensIcon
                                        sx={{
                                            width: 18,
                                            height: 18,
                                            color: "#3b3a3a98",
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <RadioButtonCheckedIcon
                                        sx={{
                                            color: "primary.main",
                                            width: 18,
                                            height: 18,
                                        }}
                                    />
                                }
                            />
                        </Stack>
                    );
                })}
                {/* <Stack pl={2}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "5spx !important",
              mt: 2,
            }}
          // onClick={() => handleClear()}
          >
            Clear All
          </Button>
        </Stack> */}
            </Stack>
        </Stack>
    );
}