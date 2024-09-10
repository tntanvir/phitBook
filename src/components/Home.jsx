import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Postcard from './Postcard';
import { Chip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



import { MdPhotoLibrary } from "react-icons/md";

import { Avatar } from '@material-tailwind/react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import { Textarea } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import MultiSelect from './MultiSelect';
import { Card } from '@material-tailwind/react';
import { useContext } from 'react';
import { MyContext } from '../App';
import { Checkbox } from '@material-tailwind/react';
import YouTubeVideo from './YouTubeVideo';
import { MultiLevelSidebar } from './MultiLevelSidebar';
import HomeProfile from './HomeProfile';
import UserSuggest from './UserSuggest';
import FollowingPost from './FollowingPost';




const Home = () => {
    const [gThem, setGThem] = useContext(MyContext);

    const [videobool, setVideobool] = useState(true)
    const [videourl, setVideourl] = useState(null)



    const [Post, setPost] = useState()
    const [category, setCategory] = useState()
    const [datareload, setDatareload] = useState(false)
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/post/allpost/')
            .then(response => response.json())
            .then(data => setPost(data))

    }, [datareload])
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(response => response.json())
            .then(data => setCategory(data))

    }, [])

    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(!open);


    const [user, setUser] = useState(null);
    useEffect(() => {
        const id = sessionStorage.getItem('id')

        fetch(`https://api-phitbook.onrender.com/authore/usermore/?user_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                // console.log(data);

            })

    }, [])

    const [id, setid] = useState(null);
    useEffect(() => {
        setid(sessionStorage.getItem('id'));
    }, [])


    // add post 


    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [discription, setDiscription] = useState('')
    const [categorys, setCategorys] = useState('')
    const [option, setOption] = useState([])
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(res => res.json())
            .then(data => {
                const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
                setOption(formattedOptions);
            })
            .catch(err => console.log(err));
    }, []);



    const navigate = useNavigate()
    const imgtoUrl = async (e) => {
        e.preventDefault();

        if (videobool) {

            try {
                const formData = new FormData();
                formData.append('image', image);

                const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

                if (res.data.data.url) {


                    if (res.data.data.url) {
                        const formData = new FormData();
                        formData.append('image', res.data.data.url);
                        formData.append('title', title);
                        formData.append('user', sessionStorage.getItem('id'));
                        formData.append('discription', discription);
                        category.forEach(catId => formData.append('category', catId));

                        formData.forEach((value, key) => {
                            console.log(`${key}: ${value}`);
                        });

                        const response = await fetch('https://api-phitbook.onrender.com/post/allpost/', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Token ${sessionStorage.getItem('token')}`,
                            },
                            body: formData,
                        });

                        const data = await response.json();

                        if (data.errors) {
                            console.log('error', data.errors);
                        } else {
                            console.log(data);
                            navigate('/dashboard/mypost')
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            const formData = new FormData();
            formData.append('video', videourl);
            formData.append('title', title);
            formData.append('user', sessionStorage.getItem('id'));
            formData.append('discription', discription);
            category.forEach(catId => formData.append('category', catId));

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const response = await fetch('https://api-phitbook.onrender.com/post/allpost/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.errors) {
                console.log('error', data.errors);
            } else {
                console.log(data);
                navigate('/dashboard/mypost')
            }
        }
    };



    return (
        <div className=' flex dark:bg-black bg-white pt-3'>
            {/* <FollowingPost /> */}
            <div>
                <MultiLevelSidebar />
            </div>
            <div className='flex flex-col items-center w-full ' >
                <div className='hide-scrollbar h-screen  w-fit pb-20'>

                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                    {sessionStorage.getItem('id') && <div className='bg-gray-200/50 rounded-md p-4 dark:bg-transparent dark:border dark:border-gray-500/50 ' onClick={handleOpen}>


                        <div className='flex gap-3  items-center '>
                            <div className='w-1/12' >
                                <Link to='/dashboard'>
                                    <Avatar src={user?.image} alt="avatar" size="sm" className="border border-primary" />
                                </Link>
                            </div>


                            <input type="text" placeholder={`what's on your mind!`} className='w-full rounded-full placeholder:pl-5 outline-none p-2 dark:bg-[#3a3b3c]' />
                            <MdPhotoLibrary className='text-4xl text-primary' />
                        </div>
                    </div>}

                    <Postcard post={Post} datareload={datareload} setDatareload={setDatareload} />

                </div>

            </div>
            <div className='w-full p-1'>
                <HomeProfile />

                {id && <UserSuggest />}
            </div>
            <>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    className="overflow-y-auto flex justify-center items-center max-h-screen dark:bg-[#3a3b3c]  dark:text-white"
                >
                    <div className="w-full max-h-screen dark:bg-[#3a3b3c]  dark:text-white">
                        <DialogHeader className='dark:bg-[#3a3b3c]  dark:text-white'>Add Post</DialogHeader>
                        <DialogBody className="hide-scrollbar max-h-[80vh]">
                            <div className="">
                                <Card className='w-full shadow-none dark:bg-[#3a3b3c] dark:text-white'>


                                    <form className="mt-8 mb-2 w-full p-2 " onSubmit={imgtoUrl}>
                                        <div className="mb-1 flex flex-col gap-6">
                                            <Checkbox label="Add youtube url" onClick={() => setVideobool(!videobool)} />
                                            {videobool ?

                                                <div>
                                                    <Typography variant="h6" className="mb-3">
                                                        Image
                                                    </Typography>

                                                    {image ? (<div>
                                                        {
                                                            <img src={URL.createObjectURL(image)} alt="post img" className="w-full h-64 object-cover" />
                                                        }

                                                    </div>) :
                                                        (<Input
                                                            size="lg"
                                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                            type='file'
                                                            required
                                                            labelProps={{
                                                                className: "before:content-none after:content-none",
                                                            }}
                                                            onChange={(e) => setImage(e.target.files[0])}
                                                        />)

                                                    }
                                                </div>
                                                :
                                                <div>
                                                    <Typography variant="h6" className="mb-3">
                                                        Video URL
                                                    </Typography>
                                                    <Input
                                                        size="lg"
                                                        placeholder="Enter Video URL"
                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                        required
                                                        labelProps={{
                                                            className: "before:content-none after:content-none",
                                                        }}
                                                        onChange={(e) => setVideourl(e.target.value)}
                                                    />
                                                    <div className="pt-2">
                                                        {
                                                            videourl && <YouTubeVideo videoUrl={videourl} />
                                                        }
                                                    </div>
                                                </div>
                                            }

                                            <Typography variant="h6" className="-mb-3">
                                                Select
                                            </Typography>

                                            <MultiSelect
                                                option={option}
                                                selectedOptions={categorys}
                                                setSelectedOptions={setCategorys}
                                                isDarkMode={gThem === "dark" ? true : false}
                                                color={'#3a3b3c'}
                                            />


                                            <Typography variant="h6" className="-mb-3">
                                                Title
                                            </Typography>
                                            <Input
                                                size="lg"
                                                placeholder="Enter Title"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:bg-[#3a3b3c]  dark:text-white dark:focus:!border-gray-100"
                                                required
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <Typography variant="h6" className="-mb-3">
                                                Discription
                                            </Typography>
                                            <Textarea size="lg" required className=' dark:text-white dark:placeholder:text-white ' label="Textarea Large" rows={10} onChange={(e) => setDiscription(e.target.value)} />
                                        </div>
                                        <Button className="mt-6 bg-primary" fullWidth type="submit">
                                            submit
                                        </Button>


                                    </form>
                                </Card>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            {/* Footer content */}
                        </DialogFooter>
                    </div>
                </Dialog>





            </>

        </div>
    );
};

export default Home;