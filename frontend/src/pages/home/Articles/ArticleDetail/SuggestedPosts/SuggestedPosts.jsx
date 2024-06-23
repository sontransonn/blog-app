import React from "react";
import { Link } from "react-router-dom";

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
    return (
        <div
            className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}
        >
            <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
                {header}
            </h2>

            <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
                {posts.map((item) => (
                    <div
                        key={item._id}
                        className="flex space-x-3 flex-nowrap items-center">

                    </div>
                ))}
            </div>

            <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
                Tags
            </h2>
        </div>
    )
}

export default SuggestedPosts