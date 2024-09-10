import React from 'react';
import { useEffect } from 'react';
import HomeProfile from './HomeProfile';
import UserSuggest from './UserSuggest';
import { MultiLevelSidebar } from './MultiLevelSidebar';
import { useState } from 'react';
import Postcard from './Postcard';

const FollowingPost = () => {

    const [Post, setPost] = useState()
    const [datareload, setDatareload] = useState(false)
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/post/posts/following/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => setPost(data))
    })
    return (
        <div className=' flex dark:bg-black bg-white pt-3'>
            <div>
                <MultiLevelSidebar />
            </div>
            <div className='flex flex-col items-center w-full ' >
                <div className='hide-scrollbar h-screen  w-fit pb-20'>

                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>


                    <Postcard post={Post} datareload={datareload} setDatareload={setDatareload} />

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
