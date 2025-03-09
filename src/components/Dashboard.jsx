import { useState } from 'react';
import { useEffect } from 'react';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6"
import { MdEdit } from "react-icons/md";;
import Layout from './Layout';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import {
    Drawer,

    IconButton,
} from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { IoArrowForwardOutline } from 'react-icons/io5';
import Follow from './Follow';
import { Link } from 'react-router-dom';

const Dashboard = ({ load, setLoad }) => {
    const [main, setMain] = useState([])
    const [datareload, setDatareload] = useState(false)

    useEffect(() => {
        const id = sessionStorage.getItem('id');
        // console.log(id);
        const fetchUser = async () => {
            try {
                const res1 = await fetch(`https://api-phitbook.vercel.app/authore/user/${id}/`);
                const userData = await res1.json();

                const res2 = await fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`);
                const userMoreData = await res2.json();
                const combinedData = { ...userData, ...userMoreData };

                // console.log(userMoreData);

                setMain(combinedData);
                // console.log(userData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUser();
    }, [datareload]);


    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const [oldImg, setOldimg] = useState('');
    const [oldPhone, setOldPhone] = useState('');
    const [oldLocation, setOldLocation] = useState('');
    const [oldid, setOldid] = useState('');
    const [done, setDone] = useState(true);
    const oldData = (id) => {
        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setOldPhone(data.phone_number)
                setOldLocation(data.location)
                setOldimg(data.image)
                setOldid(data.user)
                handleOpen()
            })
    }

    const updateImgtoUrl = async (e) => {
        setDone(false)

        try {
            const formData = new FormData();
            formData.append('image', e);

            const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

            if (res.data.data.url) {
                // console.log(res.data.data.url);
                setOldimg(res.data.data.url);
                setDone(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    const UpdateProfiledata = (e, id) => {
        e.preventDefault();
        // console.log(id);
        const formData = new FormData();
        formData.append('image', oldImg);
        formData.append('phone_number', oldPhone);
        formData.append('location', oldLocation);

        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`, {
            method: 'PUT',

            body: formData
        }).then(res => res.json())
            .then(data => {
                handleOpen()
                setDatareload(!datareload)
                setLoad(!load)
            })

    }
    const [opendawer, setOpendower] = useState(false);

    const openDrawer = () => setOpendower(true);
    const closeDrawer = () => setOpendower(false);

    const singout = () => {
        fetch('https://api-phitbook.vercel.app/authore/logout/')
            .then(() => {
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('token');
                window.location.href = '/singin'

            })
    }

    //follow 

    const [following, setFollowing] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        fetch(`https://api-phitbook.vercel.app/post/allpost/?username=${username}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data.reverse())
            })
    }, [])

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        fetch(`https://api-phitbook.vercel.app/authore/user/${username}/following/`)
            .then(res => res.json())
            .then(data => {
                setFollowing(data);
                // console.log('following', data);

            })
    }, [datareload])
    useEffect(() => {
        const username = sessionStorage.getItem('username');

        fetch(`https://api-phitbook.vercel.app/authore/user/${username}/followers/`)
            .then(res => res.json())
            .then(data => {
                setFollowers(data);
                // console.log('followers', data);

            })
    }, [datareload])

    return (
        <div className=' dark:bg-black dark:text-white'>



            <div className=''>

                {
                    main &&
                    <div className='  '>


                        <div className='  '>

                            <div className='flex gap-2'>
                                <Button className='flex justify-center items-center gap-1' color='blue' onClick={() => oldData(main.user)}><MdEdit className='text-xl' /> Edit profile</Button>
                                <Button className='flex justify-center items-center gap-1' color='blue' onClick={singout}>singout <IoArrowForwardOutline className='text-xl' /></Button>
                                <Link to='/dashboard/addpost'><Button className='flex justify-center items-center gap-1' color='blue' >Add Post <IoArrowForwardOutline className='text-xl' /></Button></Link>


                            </div>
                        </div>
                    </div>

                }
            </div>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                            Edit Profile
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>
                    <Typography className="mb-10 -mt-7 " color="gray" variant="lead">

                    </Typography>
                    <div className="grid gap-6" >
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Image
                        </Typography>
                        <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            type='file'
                            required
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => updateImgtoUrl(e.target.files[0])}

                        />
                        <Input value={oldPhone} placeholder='+880 1*********' label='Enter Phone Number' onChange={(e) => setOldPhone(e.target.value)} />
                        <Input value={oldLocation} onChange={(e) => setOldLocation(e.target.value)} placeholder='' label='Location' />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    {done ? <Button variant="gradient" color="green" onClick={(e) => UpdateProfiledata(e, oldid)}>
                        Update
                    </Button> :
                        <Button variant="gradient" color="green" disabled>Wait</Button>
                    }
                </DialogFooter>
            </Dialog>


        </div>
    );
};

export default Dashboard;