import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import MainLayout from '../../layouts/MainLayout'
import BreadCrumbs from './components/BreadCrumbs'
import SuggestedList from "./components/SuggestedList";
import CommentArea from "./components/CommentArea";
import Editor from "./components/Editor";
import BlogDetailSkeleton from "./components/BlogDetailSkeleton";
import SocialShareButtons from "./components/SocialShareButtons";

import { getAllPosts, getSinglePost } from "../../apis/postApi";

import { images, stables } from "../../constants"

const BlogDetail = () => {
    const { slug } = useParams();

    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    const [body, setBody] = useState(null);

    const userState = useSelector((state) => state.user);

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

                        <CommentArea
                            comments={data?.comments}
                            postSlug={slug}
                        />
                    </article>

                    <div>
                        <SuggestedList
                            header="Latest Article"
                            posts={postsData?.data}
                            tags={data?.tags}
                            className="mt-8 lg:mt-0 lg:max-w-xs"
                        />

                        <div className="mt-7">
                            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                                Share on:
                            </h2>
                            <SocialShareButtons
                                url={encodeURI(window.location.href)}
                                title={encodeURIComponent(data?.title)}
                            />
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    )
}

export default BlogDetail