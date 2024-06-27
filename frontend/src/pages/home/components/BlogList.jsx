import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { FaArrowRight } from "react-icons/fa";

import BlogListSkeleton from './BlogListSkeleton';
import ArticleCard from '../../../components/ArticleCard/ArticleCard';

import { getAllPosts } from '../../../apis/postApi';

const BlogList = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return (
        <section className="flex flex-col container mx-auto px-5 py-10">
            <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                {isLoading ? (
                    [...Array(3)].map((item, index) => (
                        <BlogListSkeleton
                            key={index}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                        />
                    ))
                ) : isError ? (
                    <div className="w-full rounded-lg text-gray-900 bg-red-400 mx-auto px-4 py-2 max-w-md">
                        <p>{"Couldn't fetch the posts data"}</p>
                    </div>
                ) : (
                    data?.data.map((post) => (
                        <ArticleCard
                            key={post._id}
                            post={post}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                        />
                    ))
                )}
            </div>

            <Link
                to="/blog"
                className="mx-auto flex items-center gap-x-2 
                font-bold text-primary hover:text-white border-2 border-primary hover:bg-blue-400 px-6 py-3 rounded-lg"
            >
                <span>Xem thêm</span>
                <FaArrowRight className="w-3 h-3" />
            </Link>
        </section>
    )
}

export default BlogList