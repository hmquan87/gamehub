import { useCallback, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { BlogsQueries, getBlog, getBlogs } from "./action"
import { DataStatus } from "@/constant/enum"
import { Blog, setBlog } from "./reducer"


export const useBlogs = () => {

    const dispatch = useAppDispatch()

    const { loading, error, blogFilters, blog, blogs, blogPaging } = useAppSelector(state => state.blog)

    const onGetBlogs = useCallback((queries: BlogsQueries) => {
        dispatch(getBlogs(queries))
    }, [dispatch]);

    const onGetBlog = useCallback((slug: string) => {
        dispatch(getBlog(slug))
    }, [dispatch]);

    const onSetBlog = (item: Blog) => {
        dispatch(setBlog(item))
    }

    const isFetching = useMemo(() => loading === DataStatus.LOADING, [loading]);
    const isSucceeded = useMemo(() => loading === DataStatus.SUCCEEDED, [loading]);


    return {
        isFetching,
        isSucceeded,
        blogFilters,
        blog,
        blogs,
        loading,
        error,
        ...blogPaging,
        onGetBlog,
        onGetBlogs,
        onSetBlog
    }

}

