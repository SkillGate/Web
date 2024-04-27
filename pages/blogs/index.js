import React from 'react';
import Back from "../../components/common/Back";
import { blogdata } from "../../data/blogData";

const BlogPostCard = ({ post, blogType }) => {
    let dateInfo;

    if (blogType === "Medium") {
        dateInfo = (
            <p className="text-gray-700 text-base">
                Published: {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
        );
    } else if (blogType === "Blogger") {
        dateInfo = (
            <div>
                <p className="text-gray-700 text-base">
                    Published: {new Date(post.published_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
                </p>
                <p className="text-gray-700 text-base">
                    Updated: {new Date(post.updated_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-lg w-full rounded overflow-hidden shadow-md m-2">
            <div className="px-6 py-4">
                <div className="font-bold text-md mb-2">{post.title}</div>
                {dateInfo}
            </div>
            <div className="px-6 py-4">
                <a href={post.url} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Read More
                </a>
            </div>
        </div>
    );
};

const BlogInfo = () => {

    return (

        <div className="container mx-auto">
            <div className="container mx-auto flex flex-wrap justify-around items-center text-center my-4 mb-10">
                <div className="padding-container mb-5">
                    <Back url={"/shortlist/1"} />
                </div>
                <div><h1 className="text-md">Blog Type : {blogdata["blog type"]}</h1></div>
                <div><h1 className="text-md">Total Posts : {blogdata.posts.length}</h1></div>
            </div>
            <div className="flex flex-wrap justify-start lg:justify-between">
                {blogdata.posts.map((post, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <BlogPostCard post={post} blogType={blogdata["blog type"]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogInfo;
