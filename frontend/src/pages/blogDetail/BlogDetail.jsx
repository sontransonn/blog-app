import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import MainLayout from '../../layouts/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import SuggestedList from "./components/SuggestedList";
import CommmentsContainer from "../../components/comments/CommmentsContainer";
import Editor from "./components/Editor";
import BlogDetailSkeleton from "./components/BlogDetailSkeleton";

import { getAllPosts, getSinglePost } from "../../apis/postApi";

import { images, stables } from "../../constants"

const BlogDetail = () => {
    const { slug } = useParams();
    const userState = useSelector((state) => state.user);
    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    const [body, setBody] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            setbreadCrumbsData([
                { name: "Home", link: "/" },
                { name: "Blog", link: "/blog" },
                { name: "Article title", link: `/blog/${data.slug}` },
            ]);
            setBody(parseJsonToHtml(data?.body));
        },
    })

    console.log(data);

    const { data: postsData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"]
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <MainLayout>
            {isLoading ? (
                <BlogDetailSkeleton />
            ) : isError ? (
                <div className="w-full rounded-lg text-gray-900 bg-red-400 mx-auto px-4 py-2 max-w-md">
                    <p>{"Couldn't fetch the posts data"}</p>
                </div>
            ) : (
                <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                    <article className="flex-1">
                        <BreadCrumbs data={breadCrumbsData} />

                        <img
                            className="rounded-xl w-full"
                            src={
                                data?.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                                    : images.Post1Image
                            }
                            alt={data?.title}
                        />

                        <div className="mt-4 flex gap-2">
                            {data?.categories.map((category) => (
                                <Link
                                    to={`/blog?category=${category.name}`}
                                    className="text-primary text-sm font-roboto inline-block md:text-base"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                            {data?.title}
                        </h1>

                        <div className="w-full">
                            {!isLoading && !isError && (
                                <Editor content={data?.body} editable={false} />
                            )}
                        </div>

                        <CommmentsContainer />
                    </article>

                    <div>
                        <SuggestedList
                            header="Latest Article"
                            className="mt-8 lg:mt-0 lg:max-w-xs"
                        />
                    </div>
                </section>
            )}
        </MainLayout>
    )
}

export default BlogDetail