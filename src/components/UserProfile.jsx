import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiShareFatFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';


import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    CardBody,
    CardHeader,
} from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import UserPost from './UserPost';
import { Input } from '@material-tailwind/react';
import LikeCount from './LikeCount';
import { Link } from 'react-router-dom';
import YouTubeVideo from './YouTubeVideo';
import Follow from './Follow';

const UserProfile = () => {
    const { username } = useParams()
    const [main, setMain] = useState(null)
    const [data, setData] = useState(null)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {


        const fetchUser = async () => {
            try {
                const res1 = await fetch(`https://api-phitbook.onrender.com/authore/user/?username=${username}`);
                const userData = await res1.json();

                const res2 = await fetch(`https://api-phitbook.onrender.com/authore/usermore/?username=${username}`);
                const userMoreData = await res2.json();
                const combinedData = { ...userData, ...userMoreData };



                setMain(combinedData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetch(`https://api-phitbook.onrender.com/post/allpost/?username=${username}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data.reverse())
            })

        fetchUser();



    }, [username]);


    const [dataopen, setDataopen] = useState(null)
    const opendata = (id) => {
        handleOpen()
        setDataopen(null)
        fetch(`https://api-phitbook.onrender.com/post/allpost/${id}/`)
            .then(res => res.json())
            .then(data => {
                setDataopen(data)

            })
    }

    // add comment 
    const [comtext, setComtext] = useState('')

    const SubmitBtn = (id) => {
        if (sessionStorage.getItem('token') != null) {
            fetch(`https://api-phitbook.onrender.com/post/allcomment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    'comment': comtext,
                    'post': id,

                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                })

        }
        else {
            toast.error('Login please', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    // add like
    const [bool, setBool] = useState(false)
    const enterLike = (id) => {
        if (sessionStorage.getItem('token') != null) {
            setBool(!bool)
            const usrid = sessionStorage.getItem('id')
            fetch(`https://api-phitbook.onrender.com/post/likes/?post_id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    'post': id,
                    'user': usrid,
                })
            })

                .then(data => {

                    console.log(data)
                })
        }
        else {
            toast.error('Login please', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }


    //follow 

    const [followBool, setFollowBool] = useState('')

    const handleFollow = async () => {
        try {
            const response = await fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setFollowBool(!followBool)
            } else {
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })

            }
        } catch (error) {
            console.error('Error following user:', error);

        }
    };



    useEffect(() => {
        const followStatus = () => {

            fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow-status/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setFollowBool(data.is_following)
                })

        }
        followStatus()
    }, [username])


    // follow list

    const [following, setFollowing] = useState(null)
    const [followers, setFollowers] = useState(null)

    useEffect(() => {
        fetch(`https://api-phitbook.onrender.com/authore/user/${username}/following/`)
            .then(res => res.json())
            .then(data => {
                setFollowing(data);

            })
    }, [username, followBool])
    useEffect(() => {
        fetch(`https://api-phitbook.onrender.com/authore/user/${username}/followers/`)
            .then(res => res.json())
            .then(data => {
                setFollowers(data);

            })
    }, [username, followBool])



    return (
        <div className='min-h-screen dark:bg-black dark:text-gray-300 pt-4'>
            {main && data ? <div>
                <div>
                    {main &&
                        <div className='flex  gap-5 justify-center min-h-72 '>
                            <div className='w-1/3 flex justify-center'>
                                <div className='border-4 border-primary h-52 w-52 flex justify-center items-center overflow-hidden rounded-full'>
                                    <img src={main.image} alt="" className='h-full w-full object-cover' loading='lazy' />
                                </div>
                            </div>
                            <div className='w-2/3 flex flex-col gap-5'>

                                <div className='flex  items-center gap-44'>
                                    <h1 className='text-xl'>{main.username}</h1>
                                    <div>
                                        {followBool ? <Button size='sm' onClick={handleFollow}>unfollow</Button> : <Button size='sm' onClick={handleFollow}>follow</Button>}
                                    </div>
                                </div>
                                <h1 className='text-2xl'>{main.first_name} {main.last_name}</h1>
                                <div>
                                    <h1>{main.phone_number}</h1>
                                    <h1>{main.location}</h1>
                                    <h1>{main.email}</h1>
                                </div>



                                {
                                    data && following && followers && <Follow data={data} followers={followers} following={following} />
                                }

                            </div>

                        </div>}
                </div>
                <div className="px-12">
                    <div className="h-[0.1px] w-full bg-blue-gray-50 dark:bg-blue-gray-50 dark:text-gray-300"></div>
                </div>


                <div className='p-2 pt-6 min-h-screen'>
                    {data && (
                        <div className='flex  flex-wrap gap-4 justify-center'>
                            {data.map((item, index) => (
                                <div
                                    onClick={() => opendata(item.id)}
                                    key={index}
                                    className='w-[30%] relative flex flex-col items-center justify-center hover:cursor-pointer'
                                >
                                    <div className='relative w-full h-64 flex justify-center items-center overflow-hidden dark:bg-blue-gray-900/30 rounded-sm bg-gray-100'>
                                        {item.image ?
                                            (
                                                <>
                                                    <img src={item.image} alt="" className='object-cover w-full h-full' loading='lazy' />

                                                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                                        <div className='text-white text-2xl font-semibold flex gap-2'>
                                                            <span className='flex'>
                                                                <LikeCount id={item.id} /> <FcLike />
                                                            </span>
                                                            <span className='flex'>
                                                                {item.comments.length} <FaComment />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>



                                            )
                                            :
                                            (
                                                <>

                                                    <YouTubeVideo videoUrl={item.video} />

                                                </>
                                            )
                                        }




                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>




                <>

                    {dataopen && <Dialog
                        open={open}
                        handler={handleOpen}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                        size='xl'
                        className='dark:bg-black dark:text-gray-300'
                    >
                        <Card className="w-full max-w-[96rem] flex-row  h-[35rem] dark:bg-black dark:text-gray-300  overflow-hidden">
                            <CardHeader
                                shadow={false}
                                floated={false}
                                className="m-0 w-2/5 shrink-0 rounded-r-none "
                            >
                                {dataopen.image && <img
                                    src={dataopen?.image}
                                    className="h-full w-full object-cover " loading='lazy'
                                />}
                                <div className='bg-black h-full '>

                                    {
                                        dataopen.video && <YouTubeVideo videoUrl={dataopen.video} />
                                    }
                                </div>
                            </CardHeader>
                            <CardBody className=' w-full'>

                                <UserPost id={dataopen?.user} />


                                <Typography variant="h4" color="blue-gray" className="mb-2 dark:bg-black dark:text-gray-300">
                                    {dataopen?.title}
                                </Typography>
                                <Typography color="gray" className="mb-1 font-normal h-40 hide-scrollbar dark:bg-black dark:text-gray-300">
                                    {dataopen?.discription}
                                </Typography>
                                <div className="mb-3 font-normal h-52 hide-scrollbar ">
                                    {
                                        dataopen && (dataopen.comments).map((e, i) =>
                                        (<div key={i} className='py-2 border-b'>
                                            <UserPost id={e.user} />
                                            <h1 className=''>{e.comment}</h1>
                                        </div>)


                                        )

                                    }

                                </div>
                                <div >
                                    <div className='flex gap-2 items-center pb-3 '>
                                        <span className='flex gap-1'>

                                            <LikeCount id={dataopen.id} bool={bool} /> <FcLike className='text-2xl cursor-pointer' onClick={() => enterLike(dataopen.id)} />
                                        </span>
                                        <span><PiShareFatFill className='text-2xl cursor-pointer' /> </span>
                                        <div className='flex items-center w-full'>

                                            <Input value={comtext} onChange={(e) => setComtext(e.target.value)} variant="static" placeholder="Enter comment" />
                                            <IoSend className='text-2xl  cursor-pointer' onClick={() => SubmitBtn(dataopen.id)} />
                                        </div>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </Dialog>}
                </>


            </div>
                :
                <div className='flex justify-center items-center h-screen flex-col dark:bg-black dark:text-gray-300'>
                    <FaUserLock className='text-9xl' />
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-3xl'>This content isn't available right now</h1>
                        <p className='text-sm w-1/2'>When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.
                        </p>
                    </div>
                    <Link to='/'><Button className='mt-2'>go to home</Button></Link>
                </div>



            }
        </div>
    );
};

export default UserProfile;

