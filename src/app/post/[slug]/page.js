"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BreadCrumbs from "../../components/BreadCrumbs";
import Navbar from "../../components/Navbar";
import SuggestedPosts from "./container/SuggestedPosts";
import Footer from "../../components/Footer";
import CommentSection from "./container/CommentSection";
import { useRouter, useParams } from "next/navigation";
import { getCookie } from "cookies-next";

const breadCrumbsData = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Post",
        link: "/articles",
    },
    {
        name: "Article Detail",
        link: "/articles/1",
    },
];

const ArticleDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getArticle = async () => {
            await fetch(`http://localhost:8000/article/slug/${params.slug}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setArticle(data);
                    setComments(data.comments);
                })
                .catch((error) => console.error("Error fetching article:", error));
        }
        getArticle();
    }, [params.slug])

    const handleComment = async () => {
        await fetch(`http://localhost:8000/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({
                content: comment,
                article_id: article.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setComment("");
            })
            .catch((error) => console.error("Error adding comment:", error));
    }

    

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <section className="container mx-auto max-w-5xl flex flex-col px-5 sm:px-6 lg:px-8 py-8">
                <BreadCrumbs data={breadCrumbsData} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {
                        article != null ? (
                            <article className="md:col-span-2">
                                <img
                                    src={`http://localhost:8000/uploads/article/${article.cover}`}
                                    alt="Article image"
                                    width={800}
                                    height={450}
                                    className="w-full rounded-lg"
                                />
                                <div className="mt-6 font-poppins">
                                    <h2 className="text-xl text-blue-800 font-semibold">{article.category.name}</h2>
                                    <h1 className="text-3xl font-bold text-gray-800 mt-2">
                                        {article.title}
                                    </h1>
                                    <div className="text-gray-600 mt-6" dangerouslySetInnerHTML={
                                        {
                                            __html: article.content
                                        }
                                    }></div>
                                </div>

                                <div className="mt-12 font-poppins">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Leave a comment
                                    </h3>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-lg mt-4"
                                        rows="4"
                                        placeholder="Leave your comment here..."
                                    ></textarea>
                                    <button
                                        onClick={handleComment}
                                        className="bg-blue-800 text-white px-6 py-2 rounded-lg mt-4">
                                        Send
                                    </button>
                                </div>

                                {
                                    comments.length > 0 && comments !== null ? (
                                        <CommentSection comments={comments} />
                                    ) : (
                                        <div className="mt-8">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                No comments yet
                                            </h3>
                                        </div>
                                    )
                                }
                            </article>
                        ) : (
                            <div className="md:col-span-2">
                                <h1 className="text-3xl font-bold text-gray-800 mt-2">
                                    Loading Article
                                </h1>
                            </div>
                        )
                    }
                    <SuggestedPosts />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ArticleDetailPage;
