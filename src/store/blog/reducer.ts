import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "@/constant"
import { DataStatus, GameGenre, Status, SupportChain, TagBlog } from "@/constant/enum"
import { ItemListResponse, Paging } from "@/constant/types"
import { getFiltersFromQueries } from "@/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BlogsQueries, getAuthors, getBlog, getBlogs, ListTagsQueries } from "./action"


interface Author {
    id: string,
    avatar: string,
    name: string,
    shortDescription: string
}


export interface Blog {
    id: string,
    title: string,
    content?: string,
    status?: Status,
    slug: string,
    type?: string,
    thumbnailUrl: string,
    publicDate: string,
    author?: Author,
    metaTitle?: string | null,
    metaDescription?: string | null,
    tags: string[],
    authorUrl?: string,
    authorShortDescription?: string
}

export interface TagItem {
    tag: string,
    count: number
}

export interface BlogState {
    loading: DataStatus,
    error: string | null,
    blogs: Blog[],
    blog: Blog,
    blogFilters: Omit<BlogsQueries, "pageIndex" | "pageSize">,
    blogPaging: Paging,
    tags: TagItem[],
    tagFilters: Omit<ListTagsQueries, 'pageIndex' | "pageSize">,
    tagPaging: Paging,
    loadingTags: DataStatus,
}

export const initialState: BlogState = {
    loading: DataStatus.IDLE,
    error: null,
    blogs: [],
    blog: {} as Blog,
    blogFilters: {
        search: undefined,
        tags: undefined
    },
    blogPaging: DEFAULT_PAGING,
    tags: [],
    tagFilters: {
        search: undefined
    },
    tagPaging: {
        pageIndex: 1,
        pageSize: 4
    },
    loadingTags: DataStatus.IDLE
}

const blogReducer = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlog: (state, action: PayloadAction<Blog>) => {
            state.blog = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(getBlogs.pending, (state, action) => {
        //     state.loading = DataStatus.LOADING
        //     state.blogFilters = getFiltersFromQueries(action.meta.arg)
        //     state.blogPaging.pageIndex = action.meta.arg.pageIndex;
        //     state.error = null
        // })
        // .addCase(getBlogs.fulfilled, (state, action: PayloadAction<ItemListResponse<Blog>>) => {
        //     const { items, ...paging } = action.payload;
        //     state.loading = DataStatus.SUCCEEDED
        //     state.blogs = items
        //     state.blogPaging = paging
        //     state.error = null
        // })
        // .addCase(getBlogs.rejected, (state, action) => {
        //     state.loading = DataStatus.FAILED
        //     state.blogPaging.totalItems = undefined
        //     state.blogPaging.totalItems = undefined
        //     state.error = action?.error?.message || AN_ERROR_TRY_AGAIN;
        // })
        // .addCase(getBlog.pending, state => {
        //     state.loading = DataStatus.LOADING
        //     state.error = null
        // })
        // .addCase(getBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        //     state.loading = DataStatus.SUCCEEDED
        //     state.blog = action.payload
        // })
        // .addCase(getBlog.rejected, (state, action) => {
        //     state.loading = DataStatus.FAILED
        //     state.error = action?.error?.message || AN_ERROR_TRY_AGAIN;
        // })
    }
})


export const { setBlog } = blogReducer.actions
export default blogReducer.reducer