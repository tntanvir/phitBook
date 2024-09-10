import { useState } from "react";
import UserPost from "./UserPost";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    MenuHandler,
    MenuList,
    MenuItem,
    input,
} from "@material-tailwind/react";
import { IoMdCloseCircle } from "react-icons/io";
import { toast, Bounce } from 'react-toastify';

import {

    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { Chip } from "@material-tailwind/react";
import { useEffect } from "react";
import { Textarea } from "@material-tailwind/react";
import MultiSelect from "./MultiSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LikeCount from "./LikeCount";
import { FcLike } from "react-icons/fc";
import { PiShareFatFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { Menu } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import YouTubeVideo from "./YouTubeVideo";
import { useContext } from "react";
import { MyContext } from "../App";





const Postcard = ({ post, type, datareload, setDatareload }) => {



    const [open, setOpen] = useState(false);
    const [gThem, setGThem] = useContext(MyContext);

    const handleOpen = () => setOpen(!open);

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    };
    // console.log(type);
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(response => response.json())
            .then(data => setCategorys(data))


    }, [])

    const idToCategory = (id) => {
        if (categorys.length > 0) {
            const cat = categorys.find(c => c.id === id)
            if (cat) {
                return cat.name
            }
        }

    }



    const [option, setOption] = useState([])


    const navigate = useNavigate()


    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(res => res.json())
            .then(data => {
                const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
                setOption(formattedOptions);
            })
            .catch(err => console.log(err));
    }, []);





    //update post
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



    const updatePost = (id) => {
        fetch(`https://api-phitbook.onrender.com/post/allpost/${id}/`)
            .then(res => res.json())
            .then(data => {
                setUpdateid(data.id)
                setUpdateimg(data.image)
                setUpdatevideo(data.video)
                setUpdatetitle(data.title)
                setUpdatediscription(data.discription)
                setUpdatecategory(data.category)
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


            fetch(`https://api-phitbook.onrender.com/post/allpost/${id}/`, {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    handleOpen()
                    setDatareload(!datareload)

                })
        }
        catch (err) {
            console.log(err);
        }
    }


    const deletePost = (id) => {
        fetch(`https://api-phitbook.onrender.com/post/allpost/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
            },
        }).then(data => {
            // console.log(data)
            setDatareload(!datareload)
            handleOpen()
        })
    }

    //add comment 
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
                    // console.log(data)
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



    // add like
    const [bool, setBool] = useState(false)
    const enterLike = (id) => {
        if (sessionStorage.getItem('id') != null) {
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

    return (
        <div className="flex flex-col-reverse items-center md:p-0 p-4">


            {post && post.map((e, i) => (
                <Card key={i} className="mt-6 md:w-[40rem] w-full shadow-lg bg-gray-200/50 dark:bg-transparent dark:border-x dark:border-b dark:border-gray-50/50 dark:text-gray-300">


                    {/* <UserPost id={e.user} /> */}
                    <div className='flex justify-between'>

                        <UserPost id={e.user} />
                        {
                            e.user == sessionStorage.getItem('id') ?

                                <Menu>
                                    <MenuHandler >
                                        <button><BsThreeDotsVertical className='cursor-pointer' /></button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem onClick={() => updatePost(e.id)}>Edit</MenuItem>


                                    </MenuList>
                                </Menu>


                                : <div></div>
                        }
                    </div>


                    <CardBody color="blue-gray" className="px-0 pb-0">
                        {e.image ? <img
                            src={e.image}
                            alt="card-image"
                            loading="lazy"
                        /> :
                            <YouTubeVideo videoUrl={e.video} />}

                    </CardBody>
                    <CardFooter>
                        <Typography variant="h5" className="mb-2 text-gray-800 dark:text-gray-50 ">
                            {e.title}
                        </Typography>

                        <div className="flex gap-2">

                            {e.category && (e.category).map((c, i) => (
                                // <span ></span>
                                <Link key={i} to={`/category/${idToCategory(c)}`}>

                                    <Chip size="sm" variant="outlined" value={idToCategory(c)} />
                                </Link>

                            ))
                            }
                        </div>
                        <Typography>


                            {truncateText(`${e.discription}`, 25)}
                            <Link to={`/post/${e.id}`}>
                                <span className="text-blue-300 font-bold hover:underline">see more</span>
                            </Link>
                        </Typography>
                        <Typography>
                            {formatDateTime(e.publication_date)}
                        </Typography>


                        {/* {type == 'user' &&
                            <Button onClick={() => updatePost(e.id)}>Edit</Button>
                        } */}

                        <div>
                            <div className='flex gap-2 items-center pb-3 '>
                                <span className='flex gap-1'>

                                    <LikeCount id={e.id} bool={bool} /> <FcLike className='text-2xl cursor-pointer' onClick={() => enterLike(e.id)} />
                                </span>
                                <span><PiShareFatFill className='text-2xl cursor-pointer' /> </span>
                                <div className='flex items-center w-full '>

                                    <Input value={comtext} onChange={(e) => setComtext(e.target.value)} variant="static" placeholder="Enter comment" className="dark:text-white" />
                                    <IoSend className='text-2xl  cursor-pointer' onClick={() => SubmitBtn(e.id)} />
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
            <>


                <Dialog
                    open={open}
                    handler={handleOpen}
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

        </div>
    );
};

export default Postcard;