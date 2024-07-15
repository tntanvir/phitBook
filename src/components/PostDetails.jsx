import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card, Typography, Chip, Input, Button,
} from '@material-tailwind/react';
import {

    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import UserPost from './UserPost';
import { FcLike } from "react-icons/fc";

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
        fetch(`https://api-phitbook.onrender.com/post/allpost/${id}/`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [id, postdatarelode]);

    const [likes, setLikes] = useState([])
    useEffect(() => {

        fetch(`https://api-phitbook.onrender.com/post/likes/?post_id=${id}`)
            .then(response => response.json())
            .then(data => setLikes(data))
    }, [id, postdatarelode]);

    const enterLike = (id) => {
        console.log(id)
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
                setPostdatarelode(!postdatarelode)
                console.log(data)
            })
    }


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    };


    const SubmitBtn = () => {



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
                setPostdatarelode(!postdatarelode)
            })

    }



    const [categoryto, setCategoryto] = useState([]);
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
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
    const [btn, setBtn] = useState(true)

    useEffect(() => {
        setBtn(sessionStorage.getItem('id') ? false : true)
    }, [])




    //edit comment
    const [editCom, setEditCom] = useState('')
    const [editComId, setEditComId] = useState('')
    const [editComdate, setEditComdate] = useState('')
    const [editCompost, setEditCompost] = useState('')
    const [edituser, setEdituser] = useState('')
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const EditComment = (id) => {
        fetch(`https://api-phitbook.onrender.com/post/allcomment/?comment_id=${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);
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


        fetch(`https://api-phitbook.onrender.com/post/allcomment/?comment_id=${id}`, {
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
        fetch(`https://api-phitbook.onrender.com/post/allcomment/?comment_id=${id}`, {
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
            <div className='flex md:flex-row flex-col md:p-2 gap-2 p-3'>
                <div className=' md:w-1/2 w-full rounded-md overflow-hidden'>
                    <div className=' rounded-lg overflow-hidden'>

                        <img src={data.image} alt="" width={700} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:w-1/2 w-full'>
                    <div>
                        {data.user && <UserPost id={data.user} />}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='bold text-3xl'>{data.title}</h1>
                        <div className="flex gap-2">

                            {data.category && (data.category).map((c, i) => (
                                <Chip key={i} size="sm" variant="outlined" value={idToCategory(c)} />

                            ))
                            }
                        </div>
                        <div className='max-h-72 hide-scrollbar cursor-pointer'>

                            <p className='text-justify'>{data.discription}</p>
                        </div>
                        <h1>Publiced on : {formatDateTime(data.publication_date)}</h1>
                        <div className='text-4xl flex gap-2'>

                            <FcLike onClick={() => enterLike(data.id)} className='hover:cursor-pointer hover:scale-110 duration-150' /> {likes && likes.length}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl text-center'>Comment</h1>
            </div>
            <div className='flex md:flex-row flex-col-reverse p-3 gap-2  min-h-screen justify-between'>
                <div className='flex gap-3 flex-col md:w-2/3 w-full'>
                    {data.comments && (data.comments).map((e, i) => (
                        <div key={i} className='bg-blue-600/10 p-2 '>
                            <UserPost id={e.user} />
                            <h1>{e.comment}</h1>
                            {
                                e.user == sessionStorage.getItem('id') ? <div className='flex gap-2'>
                                    <Button size='sm' onClick={() => EditComment(e.id)}>Edit</Button>
                                    <Button size='sm' onClick={() => deleteCmt(e.id)}>Delete</Button>
                                </div> : <div></div>
                            }
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-2 md:w-1/3 w-full' >
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="blue-gray">
                            Enter Comment
                        </Typography>
                        <form className="mt-8 mb-2 md:w-80 max-w-screen-lg w-full">
                            <div className="mb-1 flex flex-col gap-6">
                                {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Enter Comment
                                </Typography> */}
                                <Input
                                    size="lg"
                                    placeholder="Enter Text"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => setComtext(e.target.value)}
                                />

                            </div>

                            <Button disabled={btn} className="mt-6" fullWidth onClick={() => SubmitBtn()}>
                                Submit
                            </Button>
                        </form>
                    </Card>
                </div>
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
            </div>
        </>

    );
};

export default PostDetails;