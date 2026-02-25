"use client";

import Search from "@/components/Search";
import { IconButton, Text } from "@/components/shared";
import { HEADER_HEIGHT } from "@/constant";
import { AddedDateSort, TagBlog } from "@/constant/enum";
import useBreakpoint from "@/hooks/useBreakpoint";
import useQueryParams from "@/hooks/useQueryParams";
import useToggle from "@/hooks/useToggle";
import CalendarMonthIcon from "@/icons/CalendarMonthIcon";
import CloseIcon from "@/icons/CloseIcon";
import FunnelIcon from "@/icons/FunnelIcon";
import LensIcon from "@/icons/LensIcon";
import NewsIcon from "@/icons/NewsIcon";
import RadioButtonCheckedIcon from "@/icons/RadioButtonCheckedIcon";
import ReloadIcon from "@/icons/ReloadIcon";
import { initialState, useBlogs } from "@/store/blog";
import { cleanObject, formatText } from "@/utils";
import {
  Box,
  ButtonBase,
  Checkbox,
  drawerClasses,
  Drawer as MuiDrawer,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { spaceGrostesk } from "public/fonts";
import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import {
  getDate,
  MAPPING_CLIENT_TO_SERVER,
  pushState
} from "./helpers";

type FilterLayoutProps = {
  children: ReactNode;
};

const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props;

  const { blogFilters, onGetBlogs, pageSize } = useBlogs();
  const queries = useQueryParams() as { search?: string };

  const onChangeField = (name: string, value) => {
    const newQueries = cleanObject({
      ...blogFilters,
      pageIndex: 1,
      pageSize,
      [name]: value,
    });
    onGetBlogs(newQueries);
    pushState(newQueries);
  };

  return (
    <Stack width="100%" spacing={3}>
      <Stack
        direction={{ xs: "row", md: "column", lg: "row" }}
        alignItems={{ xs: "center", md: "flex-start", lg: "center" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <NewsIcon sx={{ fontSize: 20 }} />
          <Text
            variant={{ xs: "h3", sm: "h2" }}
            whiteSpace="nowrap"
            fontFamily={spaceGrostesk.style.fontFamily}
          >
            Latest News
          </Text>
        </Stack>

        <Stack
          width="100%"
          direction="row"
          justifyContent={{ lg: "flex-end" }}
          alignItems="center"
          display={{ xs: "none", md: "flex" }}
          spacing={3}
        >
          <Search onSearch={onChangeField} value={queries?.search} />
          <Category />
        </Stack>
        <Drawer />
      </Stack>
      <Stack direction="row">
        <Stack
          width="100%"
          maxWidth={224}
          minWidth={224}
          pr={1.75}
          mr={2}
          maxHeight={`calc(100svh - ${HEADER_HEIGHT}px - 120px)`}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          className="scrollbar"
          display={{ xs: "none", md: "flex" }}
          justifyContent="flex-start"
          spacing={3}
        >
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          {/* <Tags /> */}
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <DateAdded />
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
};

export default memo(FilterLayout);

const Item = (props) => {
  const { active, label, image, Icon, count, ...rest } = props;
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      direction="row"
      alignItems="center"
      component={ButtonBase}
      justifyContent="flex-start"
      spacing={{ xs: 1, md: 1.5 }}
      p={1}
      borderRadius={2}
      bgcolor={active ? "primary.darkChannel" : undefined}
      className={active ? "light-shadow" : undefined}
      {...rest}
    >
      <Stack
        direction={'row'}
        alignItems="center"
        spacing={{ xs: 1, md: 1.5 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, md: 1.5 }}
        >
          {!!image && (
            <Image
              src={image}
              alt={label}
              width={isMdSmaller ? 16 : 20}
              height={isMdSmaller ? 16 : 20}
              className="circle"
            />
          )}
          {!!Icon && <Icon sx={{ fontSize: { xs: 16, md: 20 } }} />}
          <Text variant="subtitle2" lineHeight={1.56}>
            {formatText(label)}
          </Text>
          {count &&
            <Text variant="subtitle2" lineHeight={1.56}>
              {count}
            </Text>
          }
        </Stack>
      </Stack>
    </Stack>
  );
};

// const Tags = () => {
//   const { tags, tagFilters, onResetTags, isFetching, onGetTags, totalPages, pageSize: pageSizeTags } = useTags()

//   const [page, setPage] = useState<number>(1)

//   useEffect(() => {
//     const newQueries = cleanObject({
//       ...tagFilters,
//       pageIndex: page,
//       pageSize: pageSizeTags,
//     });
//     onGetTags(newQueries)
//   }, [])

//   const { blogFilters, onGetBlogs, pageSize } = useBlogs();

//   const onChangeField = (tagValue: string) => () => {
//     const currentTags = blogFilters?.tags
//       ? blogFilters.tags.split(';').filter(Boolean)
//       : [];

//     const newTagsArray = currentTags.includes(tagValue)
//       ? currentTags.filter(t => t !== tagValue)
//       : [...currentTags, tagValue];

//     const newTagsString = newTagsArray.length > 0 ? newTagsArray.join(';') : undefined;

//     const newQueries = cleanObject({
//       ...blogFilters,
//       pageIndex: 1,
//       pageSize,
//       tags: newTagsString,
//     });

//     onGetBlogs(newQueries);
//     pushState(newQueries);
//   };

//   const [search, setSearch] = useState<string>('')

//   const onChangeFieldSearch = (_, value) => {
//     setSearch(value);
//   };

//   const selectedTags = useMemo(() => {
//     return blogFilters?.tags
//       ? blogFilters.tags.split(';').filter(Boolean)
//       : [];
//   }, [blogFilters?.tags]);

//   const handleShowMore = () => {
//     const newQueries = cleanObject({
//       ...tagFilters,
//       pageIndex: page + 1,
//       pageSize: pageSizeTags,
//     });
//     onGetTags(newQueries)
//     setPage(pre => pre + 1)
//   }

//   const handleShowLess = () => {
//     setPage(1)
//     onResetTags()
//   }

//   return (
//     <Stack width="100%" spacing={1}>
//       <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} pt={1}>
//         <Text variant="body2" fontWeight={500}>
//           Tags
//         </Text>
//       </Stack>
//       <Search
//         onSearch={onChangeFieldSearch}
//         value={search}
//         sx={{
//           borderRadius: 1,
//           minHeight: 30,
//           maxHeight: 36,
//           px: 1.5
//         }}
//       />
//       {tags.map((item) => (
//         <Item
//           key={item.tag}
//           label={item.tag}
//           active={selectedTags.includes(item.tag)}
//           onClick={onChangeField(item.tag)}
//           count={item.count}
//         />
//       ))}
//       {totalPages && totalPages > 1 &&
//         <Stack
//           direction={'row'}
//           alignItems={'center'}
//           gap={1}
//         >
//           {page < totalPages &&
//             <Text
//               pl={1}
//               sx={{ cursor: isFetching ? 'default' : "pointer" }}
//               variant="caption"
//               fontWeight={600}
//               color={isFetching ? "grey.400" : "primary.main"}
//               onClick={() => {
//                 if (!isFetching) {
//                   handleShowMore()
//                 }
//               }}
//             >
//               Load more
//             </Text>
//           }
//           {page > 1 &&
//             <Text
//               pl={1}
//               sx={{ cursor: isFetching ? 'default' : "pointer" }}
//               variant="caption"
//               fontWeight={600}
//               color={isFetching ? "grey.400" : "primary.main"}
//               onClick={() => {
//                 if (!isFetching) {
//                   handleShowLess()
//                 }
//               }}
//             >
//               Hide
//             </Text>
//           }
//         </Stack>
//       }
//     </Stack>
//   );
// };

const TagsBlog = Object.values(TagBlog).map((tag) => ({
  label: formatText(tag),
  value: tag,
}));



const Category = () => {
  const { onGetBlogs, pageSize } = useBlogs();
  const onResetFilters = () => {
    const newQueries = cleanObject({
      pageIndex: 1,
      pageSize,
      search: undefined,
      tags: undefined,
      sortBy: undefined,
      ...initialState.blogFilters,
    });
    onGetBlogs(newQueries);
    pushState(newQueries);
  };


  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      rowGap={1}
      columnGap={3}
    >
      <IconButton
        tooltip={'Reset Filter'}
        sx={{
          opacity: 0.7,
          ml: -1,
          borderRadius: '50%',
          '&:hover': {
            opacity: 0.9
          }
        }}
        onClick={onResetFilters}
      >
        <ReloadIcon
          sx={{
            width: 16,
            height: 16
          }}
        />
      </IconButton>
    </Stack>
  );
};


const Drawer = () => {
  const [isShow, onShow, onHide] = useToggle();
  const { isMdSmaller } = useBreakpoint();

  const onSearch = (name: string, value) => { };

  if (!isMdSmaller) return null;

  return (
    <>
      <IconButton onClick={onShow} noPadding sx={{ color: "text.primary" }}>
        <FunnelIcon />
      </IconButton>
      <MuiDrawer
        anchor="left"
        open={isShow}
        onClose={onHide}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            background: "none",
            bgcolor: "background.default",
            maxWidth: 320,
            width: "100%",
            borderTop: "1px solid",
            borderRight: "1px solid",
            borderColor: "divider",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            overflow: "hidden",
            py: 2,
          },
        }}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mb={6}
          px={2}
        >
          <Text variant="h5" fontFamily={spaceGrostesk.style.fontFamily}>
            Filters
          </Text>
          <IconButton onClick={onHide} noPadding>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          width="100%"
          justifyContent="flex-start"
          px={2}
          spacing={3}
          overflow="auto"
        >
          <Search onSearch={onSearch} />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <Category />
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          {/* <Tags /> */}
          <Box minHeight="1px" width="100%" height="1px" bgcolor="divider" />
          <DateAdded />
        </Stack>
      </MuiDrawer>
    </>
  );
};


const DateAdded = () => {

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [checkDate, setCheckDate] = useState<AddedDateSort>(AddedDateSort.AllTime);

  return (
    <Stack direction={"column"} gap={2} >
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
                    ? "primary.darkChannel"
                    : undefined,
                "&:hover": {
                  backgroundColor:
                    AddedDateSort[item] === checkDate
                      ? "primary.darkChannel"
                      : "primary.darkChannel",
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
      </Stack>
    </Stack>
  );
}