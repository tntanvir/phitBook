import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { CiBoxList } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
const Pages = [
    {
        path: '/dashboard',
        text: 'Profile',
    },
    {
        path: '/dashboard/mypost',
        text: 'My Post',
    },
    {
        path: '/dashboard/addpost',
        text: 'Add Post'
    },
    {
        path: '/dashboard/addCategory',
        text: 'Add Category'
    },



]


export function MultiLevelSidebar() {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };


    const [category, setCategory] = useState(null)
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(response => response.json())
            .then(data => setCategory(data))

    }, [])

    const [video, setvideo] = useState(null)


    useEffect(() => {
        fetch(`https://api-phitbook.onrender.com/post/allpost/?image_null=true&video_not_null=true`)
            .then(res => res.json())
            .then(data => setvideo(data))
    }, [])
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/post/allpost/')
            .then(response => response.json())
            .then(data => setPost(data))

    }, [])


    const [userid, setUserid] = useState('')
    const { state, setState } = useContext(MyContext);

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        setUserid(id)
    }, [state])


    const singout = () => {
        fetch('https://api-phitbook.onrender.com/authore/logout/')
            .then(() => {
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('token');
                window.location.href = '/singin'

            })
    }

    const [FPost, setFPost] = useState()
    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/post/posts/following/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => setFPost(data))
    }, [])

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hide-scrollbar dark:bg-black dark:text-white">

            <List className="dark:bg-black dark:text-white">
                <Link to='/'>
                    <ListItem className="dark:hover:bg-primary/90 dark:text-white">
                        <ListItemPrefix>

                        </ListItemPrefix>
                        Home
                        <ListItemSuffix>
                            <Chip value={post?.length} size="sm" variant="ghost" color="blue-gray" className="rounded-full dark:text-white" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                {userid && <Link to='/followingpost'>
                    <ListItem className="dark:hover:bg-primary/90 dark:text-white">
                        <ListItemPrefix>

                        </ListItemPrefix>
                        Following Posts
                        <ListItemSuffix>
                            <Chip value={FPost?.length} size="sm" variant="ghost" color="blue-gray" className="rounded-full dark:text-white" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>}
                <Link to='/video'>
                    <ListItem className="dark:hover:bg-primary/90 dark:text-white">
                        <ListItemPrefix>

                        </ListItemPrefix>
                        Video
                        <ListItemSuffix>
                            <Chip value={video?.length} size="sm" variant="ghost" color="blue-gray" className="rounded-full dark:text-white" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                <Accordion
                    open={open === 1}
                    icon={
                        <FaChevronDown className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 ddark:bg-black dark:hover:bg-primary/90 dark:text-white">
                            <ListItemPrefix>

                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal  dark:text-white">
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">

                            {
                                Pages && Pages.map((e, i) => (
                                    <Link key={i} to={e.path}>

                                        <ListItem className="dark:hover:bg-primary/90 dark:text-white">
                                            <ListItemPrefix>

                                            </ListItemPrefix>
                                            {e.text}
                                        </ListItem>
                                    </Link>
                                ))
                            }


                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <FaChevronDown className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 dark:bg-black dark:hover:bg-primary/90 dark:text-white ">
                            <ListItemPrefix>

                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal dark:text-white">
                                Category
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 ">
                            {category && category.map((e, i) => (


                                <Link key={i} to={`/category/${e.name}`}>

                                    {/* <Chip variant="ghost" value={e.name} /> */}
                                    <ListItem className="dark:hover:bg-primary/90 dark:text-white">
                                        <ListItemPrefix>
                                        </ListItemPrefix>
                                        {e.name}
                                    </ListItem>
                                </Link>
                            ))


                            }

                        </List>
                    </AccordionBody>
                </Accordion>



                {userid && <ListItem className="dark:hover:bg-primary/90 dark:text-white" onClick={() => singout()}>
                    <ListItemPrefix>

                    </ListItemPrefix>
                    Log Out
                </ListItem>}
            </List>
        </Card>
    );
}