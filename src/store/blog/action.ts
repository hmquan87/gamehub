import { client, Endpoint } from "@/api";
import { AN_ERROR_TRY_AGAIN } from "@/constant";
import { BlogSort } from "@/constant/enum";
import { BaseQueries } from '@/constant/types';
import { cleanObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import StringFormat from 'string-format';


export interface BlogsQueries extends BaseQueries {
    tags?: string,
    sortBy?: BlogSort
}

export const getBlogs = createAsyncThunk(
    'get/blogs', async (queries: BlogsQueries) => {
        try {
            const response = await client.get(Endpoint.BLOG, cleanObject(queries))
            if (response?.status === HttpStatusCode.Ok)
                return response.data
            throw AN_ERROR_TRY_AGAIN
        } catch (error) {
            throw error
        }
    }
)

export const getBlog = createAsyncThunk(
    'get/blog', async (slug: string) => {
        try {
            const response = await client.get(StringFormat(Endpoint.BLOG_DETAIL, { slug }), {})
            if (response.status === HttpStatusCode.Ok) {
                return response.data
            }
            throw AN_ERROR_TRY_AGAIN
        } catch (error) {
            throw error
        }
    }
)


export interface ListTagsQueries {
    pageIndex: number,
    pageSize: number,
    search?: string
}

export interface AuthorBlogQueries {
    pageIndex: number,
    pageSize: number,
    search?: string
}

export const getAuthors = createAsyncThunk(
    'get/author/blog', async (queries: AuthorBlogQueries) => {
        try {
            const response = await client.get(Endpoint.BLOG_TAGS, queries)
            if (response.status === HttpStatusCode.Ok) {
                return response.data
            }
            throw AN_ERROR_TRY_AGAIN
        } catch (error) {
            throw error
        }
    }
)
