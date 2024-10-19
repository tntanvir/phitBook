import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card, Typography, Chip, Input, Button,
    MenuHandler,
    MenuList,
    MenuItem,
} from '@material-tailwind/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import {

    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import UserPost from './UserPost';
import { FcLike } from "react-icons/fc";

import { toast, Bounce } from 'react-toastify';
import { Menu } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import YouTubeVideo from './YouTubeVideo';

const PostDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState('')
    const [usrid, setUsrid] = useState('')
    const [comtext, setComtext] = useState('')
    const [postdatarelode, setPostdatarelode] = useState(false)


    useEffect(() => {
        const userid = sessionStorage.getItem('id')
        setUsrid(userid)
        // console.log('userid', userid);
        fetch(`https://api-phitbook.vercel.app/post/allpost/${id}/`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [id, postdatarelode]);

    const [likes, setLikes] = useState([])
    useEffect(() => {

        fetch(`https://api-phitbook.vercel.app/post/likes/?post_id=${id}`)
            .then(response => response.json())
            .then(data => setLikes(data))
    }, [id, postdatarelode]);

    const enterLike = (id) => {
        if (sessionStorage.getItem('token') != null) {
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
                    setPostdatarelode(!postdatarelode)
                    // console.log(data)
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


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    };


    const SubmitBtn = () => {


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
                    setPostdatarelode(!postdatarelode)
                    setComtext('')
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



    const [categoryto, setCategoryto] = useState([]);
    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/category/all/')
            .then(response => response.json())
            .then(data => setCategoryto(data))


    }, [])
    const idToCategory = (id) => {
        if (categoryto.length > 0) {
            const cat = categoryto.find(c => c.id === id)
            if (cat) {
                return cat.name
            }
        }

    }





    //edit comment
    const [editCom, setEditCom] = useState('')
    const [editComId, setEditComId] = useState('')
    const [editComdate, setEditComdate] = useState('')
    const [editCompost, setEditCompost] = useState('')
    const [edituser, setEdituser] = useState('')
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const EditComment = (id) => {
        fetch(`https://api-phitbook.vercel.app/post/allcomment/?comment_id=${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data[0]);
                setEditCom(data[0].comment)
                setEditComId(data[0].id)
                setEditComdate(data[0].comment_date)
                setEditCompost(data[0].post)
                setEdituser(data[0].user)
                handleOpen()

            })
    }
    const EditConfirm = (id) => {

        const formData = new FormData();
        formData.append('id', editComId)
        formData.append('comment', editCom)
        formData.append('comment_date', editComdate)
        formData.append('post', editCompost)
        formData.append('user', edituser)


        fetch(`https://api-phitbook.vercel.app/post/allcomment/?comment_id=${id}`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Token ${sessionStorage.getItem('token')}`,
            // },
            body: formData
        }).then(response => response.json())
            .then(data => {
                handleOpen()
                // window.location.reload()
                setPostdatarelode(!postdatarelode)
            })

    }


    const deleteCmt = (id) => {
        fetch(`https://api-phitbook.vercel.app/post/allcomment/?comment_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
            },
        }).then(res => {
            setPostdatarelode(!postdatarelode)
        })
    }








    return (
        <>
            <div className='flex md:flex-row flex-col md:p-2 gap-2 p-3 min-h-screen dark:bg-black dark:text-gray-300'>
                <div className='  w-full  '>
                    <div className='h-full'>
                        <>
                            {data.image && <img src={data?.image} alt="" className='rounded-lg' />



                            }
                        </>
                        {data.video && <YouTubeVideo videoUrl={data?.video} />}


                    </div>
                </div>
                <div className='flex flex-col gap-2 md:w-1/3 w-full max-h-screen overflow-y-scroll hide-scrollbar  p-2'>
                    <div className=''>
                        <div>
                            {data.user && <UserPost id={data.user} />}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Publiced on : {formatDateTime(data.publication_date)}</h1>
                            <h1 className='bold text-3xl'>{data.title}</h1>
                            <div className="flex gap-2">

                                {data.category && (data.category).map((c, i) => (
                                    <Link key={i} to={`/category/${idToCategory(c)}`}>

                                        <Chip size="sm" variant="outlined" value={idToCategory(c)} />
                                    </Link>

                                ))
                                }
                            </div>


                            <p className='text-justify'>{data.discription}</p>
                            <div className='flex justify-start items-start flex-col'>

                                <div className='text-4xl flex gap-2'>

                                    <FcLike onClick={() => enterLike(data.id)} className='hover:cursor-pointer hover:scale-110 duration-150' /> {likes && likes.length}
                                </div>
                                <form className="max-w-screen-lg w-full flex justify-center items-center ">
                                    <div className=" flex flex-col justify-center items-center">

                                        <Input
                                            size="lg"
                                            placeholder="Enter Text"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:bg-black dark:text-gray-300"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            onChange={(e) => setComtext(e.target.value)}
                                        />

                                    </div>

                                    <Button className="" fullWidth onClick={() => SubmitBtn()}>
                                        Submit
                                    </Button>
                                </form>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                {data.comments && (data.comments).map((e, i) => (
                                    <div key={i} className='bg-blue-600/10 p-2 w-full'>
                                        <div className='flex justify-between'>

                                            <UserPost id={e.user} />
                                            {
                                                e.user == sessionStorage.getItem('id') ?

                                                    <Menu>
                                                        <MenuHandler >
                                                            <button><BsThreeDotsVertical className='cursor-pointer' /></button>
                                                        </MenuHandler>
                                                        <MenuList>
                                                            <MenuItem onClick={() => EditComment(e.id)}>Edit</MenuItem>
                                                            <MenuItem onClick={() => deleteCmt(e.id)}>Delete</MenuItem>

                                                        </MenuList>
                                                    </Menu>


                                                    : <div></div>
                                            }
                                        </div>
                                        <h1>{e.comment}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <>
                <Dialog open={open} handler={handleOpen} size='xs'>
                    <DialogHeader>Edit Comment</DialogHeader>
                    <DialogBody>
                        <Input type="text" value={editCom} label='Enter Comment' onChange={(e) => setEditCom(e.target.value)} />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={() => EditConfirm(editComId)}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        </>

    );
};

export default PostDetails;