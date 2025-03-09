import React from 'react';
import Layout from './Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Postcard from './Postcard';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { Drawer } from '@material-tailwind/react';
import { IconButton } from '@material-tailwind/react';
import { RiMenuUnfoldLine } from 'react-icons/ri';
const Mypost = () => {
    const [postdata, setPostdata] = useState('')
    const [datareload, setDatareload] = useState(false)
    useEffect(() => {
        fetch(`https://api-phitbook.vercel.app/post/allpost/?user_id=${sessionStorage.getItem('id')}`)
            .then(res => res.json())
            .then(data => setPostdata(data))
    }, [datareload])

    const [opendawer, setOpendower] = useState(false);

    const openDrawer = () => setOpendower(true);
    const closeDrawer = () => setOpendower(false);

    return (
        <div className='flex min-h-screen dark:bg-black dark:text-white'>

            {/* <div className='hidden md:block w-1/5 border-r'>

                <Layout />
            </div> */}
            <div className='w-full'>
                <div className=' w-full  pl-3 '>
                    <RiMenuUnfoldLine onClick={openDrawer} className='md:hidden text-2xl' />

                </div>
                <div className="flex justify-center items-center">

                    {
                        postdata.length > 0 && <Postcard post={postdata} type={'user'} datareload={datareload} setDatareload={setDatareload} />
                    }
                </div>
            </div>
            <Drawer open={opendawer} onClose={closeDrawer} className="p-4">
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
                <Layout />
            </Drawer>
        </div>
    );
};

export default Mypost;