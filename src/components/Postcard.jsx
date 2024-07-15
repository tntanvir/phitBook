import { useState } from "react";
import UserPost from "./UserPost";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import { IoMdCloseCircle } from "react-icons/io";

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

const Postcard = ({ post, type, datareload, setDatareload }) => {
    const [open, setOpen] = useState(false);

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
    const [updatetitle, setUpdatetitle] = useState('');
    const [updatediscription, setUpdatediscription] = useState('');
    const [updatecategory, setUpdatecategory] = useState('');
    const [updateid, setUpdateid] = useState();
    const [done, setDone] = useState(true);


    const updateImgtoUrl = async (e) => {
        setDone(false);
        // e.preventDefault();
        // console.log(image);
        console.log(e);

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
                // console.log(data)
                // console.log(data.id)
                setUpdateid(data.id)
                setUpdateimg(data.image)
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
            formData.append('image', updateimg);
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
                    console.log(data)
                    setDatareload(!datareload)
                    handleOpen()

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
            console.log(data)
            setDatareload(!datareload)
            handleOpen()
        })
    }

    return (
        <div className="flex flex-col items-center md:p-0 p-4">


            {post && post.map((e, i) => (
                <Card key={i} className="mt-6 md:w-[35rem] w-full shadow-lg">


                    <UserPost id={e.user} />

                    <CardBody color="blue-gray" className="px-0 pb-0">
                        <img
                            src={e.image}
                            alt="card-image"
                        />
                    </CardBody>
                    <CardFooter>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {e.title}
                        </Typography>

                        <div className="flex gap-2">

                            {e.category && (e.category).map((c, i) => (
                                // <span ></span>
                                <Chip key={i} size="sm" variant="outlined" value={idToCategory(c)} />

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

                        {/* </CardFooter>
                        <CardFooter className="flex pt-0 gap-2"> */}
                        {/* <Link to={`/post/${e.id}`}>
                            <Button>Read More</Button>
                        </Link> */}
                        {type == 'user' &&
                            <Button onClick={() => updatePost(e.id)}>Edit</Button>
                        }
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
                    className="overflow-y-auto min-h-screen"
                    size={"xxl"}
                >
                    <DialogHeader className="flex justify-between">
                        <div>Update Post</div>
                        <div className="cursor-pointer" onClick={handleOpen}><IoMdCloseCircle /> </div>
                    </DialogHeader>
                    <DialogBody>


                        <form className="mt-8 mb-2 w-full p-2" >
                            <div className="mb-1 flex flex-col gap-6">


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

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Select
                                </Typography>

                                <MultiSelect
                                    option={option}
                                    selectedOptions={updatecategory}
                                    setSelectedOptions={setUpdatecategory}
                                />



                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Title
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Enter Title"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    value={updatetitle}
                                    required
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => setUpdatetitle(e.target.value)}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Discription
                                </Typography>
                                <Textarea size="lg" value={updatediscription} required label="Textarea Large" rows={10} onChange={(e) => setUpdatediscription(e.target.value)} />
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