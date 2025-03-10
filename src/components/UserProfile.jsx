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
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import UserPost from './UserPost';
import { Input } from '@material-tailwind/react';
import LikeCount from './LikeCount';
import YouTubeVideo from './YouTubeVideo';
import Follow from './Follow';
import Dashboard from './Dashboard';
import { Menu } from '@material-tailwind/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
import MultiSelect from './MultiSelect';
import { useContext } from 'react';
import { MyContext } from '../App';
import { Textarea } from '@material-tailwind/react';

const UserProfile = () => {
    const { username } = useParams()
    const [main, setMain] = useState(null)
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(false)
    const [datareloads, setDatareloads] = useState(true)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const [open2, setOpen2] = useState(false);

    const handleOpen2 = () => setOpen2(!open2);

    useEffect(() => {


        const fetchUser = async () => {
            try {
                const res1 = await fetch(`https://api-phitbook.vercel.app/authore/user/?username=${username}`);
                const userData = await res1.json();

                const res2 = await fetch(`https://api-phitbook.vercel.app/authore/usermore/?username=${username}`);
                const userMoreData = await res2.json();
                const combinedData = { ...userData, ...userMoreData };



                setMain(combinedData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetch(`https://api-phitbook.vercel.app/post/allpost/?username=${username}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data.reverse())
            })

        fetchUser();



    }, [username, load, datareloads]);


    const [dataopen, setDataopen] = useState(null)
    const [postId, setPostId] = useState(null)
    const opendata = (id) => {
        handleOpen()
        setPostId(id)
        setDataopen(null)
        fetch(`https://api-phitbook.vercel.app/post/allpost/${id}/`)
            .then(res => res.json())
            .then(data => {
                setDataopen(data)

            })
    }

    // add comment 
    const [comtext, setComtext] = useState('')

    const SubmitBtn = (id) => {
        if (sessionStorage.getItem('token') != null) {
            fetch(`https://api-phitbook.vercel.app/post/allcomment/`, {
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
                    toast.success('Done', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    })
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
            fetch(`https://api-phitbook.vercel.app/post/likes/?post_id=${id}`, {
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

                    toast.success('Done', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    })
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
            const response = await fetch(`https://api-phitbook.vercel.app/authore/user/${username}/follow/`, {
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

            fetch(`https://api-phitbook.vercel.app/authore/user/${username}/follow-status/`, {
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
        fetch(`https://api-phitbook.vercel.app/authore/user/${username}/following/`)
            .then(res => res.json())
            .then(data => {
                setFollowing(data);

            })
    }, [username, followBool])
    useEffect(() => {
        fetch(`https://api-phitbook.vercel.app/authore/user/${username}/followers/`)
            .then(res => res.json())
            .then(data => {
                setFollowers(data);

            })
    }, [username, followBool])



    // owner 

    const [token, setToken] = useState()
    const [tokenid, setTokenid] = useState()

    useEffect(() => {
        const t = sessionStorage.getItem('username')
        const i = sessionStorage.getItem('id')

        if (t) {
            setToken(t)
        }
        if (i) {
            setTokenid(i)
        }
    }, [username])

    const [option, setOption] = useState([])
    const [gThem, setGThem] = useContext(MyContext);



    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/category/all/')
            .then(res => res.json())
            .then(data => {
                const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
                setOption(formattedOptions);
            })
            .catch(err => console.log(err));
    }, []);


    const [updateimg, setUpdateimg] = useState('');
    const [updatevideo, setUpdatevideo] = useState('');
    const [updatetitle, setUpdatetitle] = useState('');
    const [updatediscription, setUpdatediscription] = useState('');
    const [updatecategory, setUpdatecategory] = useState('');
    const [updateid, setUpdateid] = useState();
    const [done, setDone] = useState(true);


    const updateImgtoUrl = async (e) => {
        setDone(false);


        try {
            const formData = new FormData();
            formData.append('image', e);

            const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

            if (res.data.data.url) {
                setUpdateimg(res.data.data.url)
                setDone(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const editpost = (id) => {
        fetch(`https://api-phitbook.vercel.app/post/allpost/${id}/`)
            .then(res => res.json())
            .then(data => {
                setUpdateid(data.id)
                setUpdateimg(data.image)
                setUpdatevideo(data.video)
                setUpdatetitle(data.title)
                setUpdatediscription(data.discription)
                setUpdatecategory(data.category)
                handleOpen2()
                handleOpen()

            })
            .catch(err => console.log(err));


    }



    const updateDataPost = (e, id) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (updateimg) {

                formData.append('image', updateimg);
            } else {

                formData.append('video', updatevideo);
            }
            formData.append('title', updatetitle);
            formData.append('user', sessionStorage.getItem('id'));
            formData.append('discription', updatediscription);
            updatecategory.forEach(catId => formData.append('category', catId));


            fetch(`https://api-phitbook.vercel.app/post/allpost/${id}/`, {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    handleOpen2()
                    setDatareloads(!datareloads)

                })
        }
        catch (err) {
            console.log(err);
        }
    }
    const deletePost = (id) => {
        fetch(`https://api-phitbook.vercel.app/post/allpost/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
            },
        }).then(data => {
            // console.log(data)
            setDatareloads(!datareloads)
            handleOpen()
        })
    }

    return (
        <div className='min-h-screen dark:bg-black text-black dark:text-gray-300 pt-4'>
            {<div>
                <div>
                    {main ?
                        // <div className='flex md:flex-row flex-col  gap-5 justify-center min-h-72 '>
                        //     <div className='md:w-1/3 flex justify-center'>
                        //         <div className='border-4 border-primary h-52 w-52 flex justify-center items-center overflow-hidden rounded-full'>
                        //             <img src={main.image} alt="" className='h-full w-full object-cover' loading='lazy' />
                        //         </div>
                        //     </div>
                        //     <div className='md:w-2/3 flex flex-col gap-5 justify-center items-center'>

                        //         <div className='flex md:flex-row flex-col md:gap-44'>
                        //             <h1 className='text-xl'>{main.username}</h1>
                        //             <div>
                        //                 {token == main.username ?

                        //                     <Dashboard load={load} setLoad={setLoad} />

                        //                     : <div>
                        //                         {followBool ? <Button size='sm' onClick={handleFollow}>unfollow</Button> : <Button size='sm' onClick={handleFollow}>follow</Button>}
                        //                     </div>}
                        //             </div>
                        //         </div>
                        //         <div className='bg-red-600 w-full px-3'>
                        //             <h1 className='text-2xl w-full'>{main.first_name} {main.last_name}</h1>
                        //             <h1>{main.phone_number}</h1>
                        //             <h1>{main.location}</h1>
                        //             <h1>{main.email}</h1>
                        //         </div>



                        //         {
                        //             data && following && followers && <Follow data={data} followers={followers} following={following} />
                        //         }

                        //     </div>

                        // </div>
                        <div className="flex flex-col md:flex-row gap-5 justify-center min-h-72 px-4">
                            {/* Profile Image Section */}
                            <div className="flex justify-center md:w-1/3">
                                <div className="border-4 border-primary h-40 w-40 md:h-52 md:w-52 flex justify-center items-center overflow-hidden rounded-full">
                                    <img src={main.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                                </div>
                            </div>

                            {/* User Info Section */}
                            <div className="md:w-2/3 flex flex-col gap-5 justify-center items-center md:items-start">
                                {/* Username & Follow Button */}
                                <div className="flex flex-col md:flex-row md:justify-between md:w-full gap-3 items-center">
                                    <h1 className="text-xl font-semibold">@{main.username}</h1>
                                    <div className='md:pr-6'>
                                        {token === main.username ? (
                                            <Dashboard load={load} setLoad={setLoad} />
                                        ) : (
                                            <Button size="sm" onClick={handleFollow}>
                                                {followBool ? "Unfollow" : "Follow"}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* User Details Section */}
                                <div className="w-full  md:p-0 p-3 rounded-lg text-black dark:text-gray-300 text-left md:text-left">
                                    <h1 className="text-2xl font-bold">{main.first_name} {main.last_name}</h1>
                                    <h1>{main.phone_number}</h1>
                                    <h1>{main.location}</h1>
                                    <h1>{main.email}</h1>
                                </div>

                                {/* Follow Info Section */}
                                {data && following && followers && (
                                    <Follow data={data} followers={followers} following={following} />
                                )}
                            </div>
                        </div>

                        :
                        <div className="flex gap-5 justify-center min-h-72 animate-pulse">
                            <div className="w-1/3 flex justify-center">
                                <div className="border-4 border-primary h-52 w-52 flex justify-center items-center overflow-hidden rounded-full bg-gray-300"></div>
                            </div>
                            <div className="w-2/3 flex flex-col gap-5">
                                <div className="flex items-center gap-44">
                                    <div className="h-6 w-32 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-24 bg-gray-300 rounded"></div>
                                </div>
                                <div className="h-8 w-48 bg-gray-300 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-5 w-40 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-56 bg-gray-300 rounded"></div>
                                </div>
                                {/* <div className="h-16 w-full bg-gray-300 rounded"></div> */}
                            </div>
                        </div>


                    }
                </div>
                <div className="px-12">
                    <div className="h-[0.1px] w-full bg-blue-gray-50 dark:bg-blue-gray-50 dark:text-gray-300"></div>
                </div>


                <div className='p-2 pt-6 min-h-screen'>
                    {data ? (
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


                    )
                        :
                        <div className="flex flex-wrap gap-4 justify-center animate-pulse">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="w-[30%] relative flex flex-col items-center justify-center"
                                >
                                    <div className="relative w-full h-64 flex justify-center items-center overflow-hidden dark:bg-blue-gray-900/30 rounded-sm bg-gray-300"></div>
                                </div>
                            ))}
                        </div>


                    }
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
                        className='dark:bg-black dark:text-gray-300 z-30'
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
                                <div className='flex justify-between items-center'>

                                    <UserPost id={dataopen?.user} />
                                    {
                                        dataopen?.user == sessionStorage.getItem('id') ?

                                            <div className='flex gap-2 text-2xl'>
                                                <h1 className='bg-gray-200 p-1 rounded-md hover:bg-green-500 hover:text-white  duration-200 cursor-pointer dark:text-white dark:bg-gray-700 dark:hover:bg-green-500' onClick={() => editpost(postId)}><MdEdit /></h1>
                                                <h1 onClick={() => deletePost(postId)} className='bg-gray-200 p-1 rounded-md hover:bg-red-500 hover:text-white duration-200 cursor-pointer dark:text-white dark:bg-gray-700 dark:hover:bg-red-500'><MdDelete /></h1>
                                            </div>


                                            : <div></div>
                                    }
                                </div>


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
                    <>


                        <Dialog
                            open={open2}
                            handler={handleOpen2}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0.9, y: -100 },
                            }}
                            className="overflow-y-auto min-h-screen dark:text-white dark:bg-black"
                            size={"xxl"}
                        >
                            <DialogHeader className="flex justify-between">
                                <div>Update Post</div>
                                <div className="cursor-pointer" onClick={handleOpen}><IoMdCloseCircle /> </div>
                            </DialogHeader>
                            <DialogBody>


                                <form className="mt-8 mb-2 w-full p-2" >
                                    <div className="mb-1 flex flex-col gap-6">


                                        {updatevideo ?
                                            <div>
                                                <Typography variant="h6" className="mb-3">
                                                    Video URL
                                                </Typography>
                                                <Input
                                                    size="lg"
                                                    placeholder="Enter Title"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                                                    value={updatevideo}
                                                    required
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                    onChange={(e) => setUpdatevideo(e.target.value)}
                                                />
                                                <div className="pt-2">
                                                    {
                                                        updatevideo && <YouTubeVideo videoUrl={updatevideo} />
                                                    }
                                                </div>
                                            </div>



                                            : <div>
                                                <Typography variant="h6" className="-mb-3">
                                                    Image
                                                </Typography>
                                                <Input
                                                    size="lg"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                                                    type='file'

                                                    required
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                    onChange={(e) => updateImgtoUrl(e.target.files[0])}
                                                />
                                            </div>}

                                        <Typography variant="h6" className="-mb-3">
                                            Select
                                        </Typography>

                                        <MultiSelect
                                            option={option}
                                            selectedOptions={updatecategory}
                                            setSelectedOptions={setUpdatecategory}
                                            isDarkMode={gThem === "dark" ? true : false}
                                            color={"black"}
                                        />



                                        <Typography variant="h6" className="-mb-3">
                                            Title
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Enter Title"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                                            value={updatetitle}
                                            required
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            onChange={(e) => setUpdatetitle(e.target.value)}
                                        />
                                        <Typography variant="h6" className="-mb-3">
                                            Discription
                                        </Typography>
                                        <Textarea className="dark:text-white" size="lg" value={updatediscription} required label="Textarea Large" rows={10} onChange={(e) => setUpdatediscription(e.target.value)} />
                                    </div>




                                </form>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => deletePost(updateid)}
                                    className="mr-1"
                                >
                                    <span>Delete</span>
                                </Button>
                                {/* <Button  onClick={handleOpen}>
                            <span>Confirm</span>
                        </Button> */}
                                {
                                    done ? <Button variant="gradient" color="green" onClick={(e) => updateDataPost(e, updateid)} >
                                        submit
                                    </Button>
                                        : <Button variant="gradient" color="green" disabled>Wait</Button>

                                }
                            </DialogFooter>
                        </Dialog>






                    </>


                </>


            </div>




            }
        </div>
    );
};

export default UserProfile;

