import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Postcard from './Postcard';
import { Chip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import AllCategory from './AllCategory';
import { RiMenuUnfoldLine } from "react-icons/ri";
import {
    Drawer,
    Button,
    IconButton,
} from "@material-tailwind/react";

const Home = () => {
    const [Post, setPost] = useState()
    const [category, setCategory] = useState()
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/post/allpost/')
            .then(response => response.json())
            .then(data => setPost(data))

    }, [])
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(response => response.json())
            .then(data => setCategory(data))

    }, [])

    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <div className=' flex'>
            <div className='hidden md:block'>

                <AllCategory />
            </div>
            <div className='flex flex-col items-center w-full ' >
                <div className=' w-full  pl-3 '>
                    <RiMenuUnfoldLine onClick={openDrawer} className='md:hidden text-2xl' />

                </div>
                <div className='hide-scrollbar h-screen  w-fit pb-20'>

                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>


                    <Postcard post={Post} />
                </div>

            </div>
            <><Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="mb-6 flex items-center justify-between">
                    {/* <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography> */}
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <AllCategory />
            </Drawer></>

        </div>
    );
};

export default Home;