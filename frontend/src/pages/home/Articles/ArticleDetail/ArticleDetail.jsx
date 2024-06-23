import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from '../../../../layouts/MainLayout'
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs'
import SuggestedPosts from "./SuggestedPosts/SuggestedPosts";

import { images } from "../../../../constants"
import CommmentsContainer from "../../../../components/comments/CommmentsContainer";

const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article title", link: `/blog/1` },
]

const ArticleDetail = () => {
    return (
        <MainLayout>
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1">
                    <BreadCrumbs data={breadCrumbsData} />

                    <img
                        className="rounded-xl w-full"
                        src={images.Post1Image}
                    />

                    <div className="mt-4 flex gap-2">
                        <Link
                            to={`/blog?category=selectedCategory`}
                            className="text-primary text-sm font-roboto inline-block md:text-base"
                        >
                            EDUCATION
                        </Link>
                    </div>

                    <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                        gsdgshfdh
                    </h1>

                    <div className="w-full">
                        <CommmentsContainer />

                    </div>
                </article>

                <div>
                    <SuggestedPosts
                        header="Latest Article"
                        className="mt-8 lg:mt-0 lg:max-w-xs"
                    />
                </div>
            </section>
        </MainLayout>
    )
}

export default ArticleDetail