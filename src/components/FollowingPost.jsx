import React, { useEffect, useState } from 'react';
import HomeProfile from './HomeProfile';
import UserSuggest from './UserSuggest';
import { MultiLevelSidebar } from './MultiLevelSidebar';
import Postcard from './Postcard';

const FollowingPost = () => {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [datareload, setDatareload] = useState(false);

    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/post/posts/following/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(() => setLoading(false)); // Stop loading even if there’s an error
    }, []); // Runs only once when component mounts



    return (
        <div className='flex dark:bg-black bg-white pt-3'>
            <div>
                <MultiLevelSidebar />
            </div>
            <div className='flex flex-col items-center w-full'>
                <div className='hide-scrollbar h-screen w-full pb-20'>

                    {/* Background Grid */}
                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

                    {/* Show Skeleton Loader while fetching */}
                    {loading ?
                        <div className="mt-6 md:w-[40rem] w-full shadow-lg bg-gray-200/50 dark:bg-gray-800 dark:border dark:border-gray-700 animate-pulse p-4 rounded-lg">
                            {/* User Info Skeleton */}
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    <div>
                                        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                        <div className="w-16 h-3 mt-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    </div>
                                </div>
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>

                            {/* Image / Video Skeleton */}
                            <div className="w-full h-60 bg-gray-300 dark:bg-gray-600 rounded"></div>

                            {/* Title Skeleton */}
                            <div className="w-40 h-5 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>

                            {/* Categories Skeleton */}
                            <div className="flex gap-2 mt-2">
                                <div className="w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="w-12 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>
                            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>

                            {/* Like, Share, and Comment Section Skeleton */}
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                <div className="flex items-center w-full">
                                    <div className="w-full h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded ml-2"></div>
                                </div>
                            </div>
                        </div>
                        : (
                            <Postcard post={Post} datareload={datareload} setDatareload={setDatareload} />
                        )}
                </div>
            </div>
            <div className='w-full p-1'>
                <HomeProfile />
                <UserSuggest />
            </div>
        </div>
    );
};

export default FollowingPost;
